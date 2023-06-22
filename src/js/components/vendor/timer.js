import { Tag, CheckCallback } from "../_helpers.js";


/*options = {
  container,
  min: str,
  onTimeOut: ()=>{},
  isRunning: true(def);
} */

export class Timer {
  constructor(options) {
    const { container, min, onTimeOut, isRunning = true } = options;
    this.container = container;
    this.createTimerWrapper();
    this.onTimeOut = CheckCallback.check(onTimeOut);
    this.startTime = min || '1';
    this.isRunning = isRunning;
    this.lastTime = null;
    this.accumulatedTime = 0;
    this.animationId = null;
  }

  createTimerWrapper() {
    this.timerWrapper = Tag.build({
      tagName: 'span',
      classes: ['control-bar__timer'],
    });
    this.container.prepend(this.timerWrapper);
  }

  set startTime(value) {
    this._startTime = parseFloat(value) * 60;
    this.currentTime = this._startTime;
  }

  get startTime() {
    return this._startTime;
  }

  set currentTime(value) {
    this._currentTime = value;
    this.timerWrapper.textContent = this.getTimerStr();
  }

  get currentTime() {
    return this._currentTime;
  }

  set isRunning(value) {
    this._isRunning = value;
    value ? this.start() : this.pause();
  }

  get isRunning() {
    return this._isRunning;
  }

  getTimerStr() {
    let min = Math.trunc(this.currentTime / 60);
    let sec = Math.trunc(this.currentTime % 60);
    if (min < 10) min = `0${min}`;
    if (sec < 10) sec = `0${sec}`;
    return `${min}:${sec}`;
  }

  start() {
    this.lastTime = performance.now();
    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }

  pause() {
    cancelAnimationFrame(this.animationId);
    this.accumulatedTime = this.currentTime;
  }

  reset() {
    this.isRunning = false;
    this.currentTime = this.startTime;
    this.isRunning = true;
  }

  animate(timestamp) {
    if (this.isRunning) {
      if (this.lastTime) {
        const deltaTime = timestamp - this.lastTime;
        this.accumulatedTime += deltaTime / 1000;
        while (this.accumulatedTime >= 1) {
          --this.currentTime;
          this.accumulatedTime -= 1;
        }
        if (this.currentTime <= 0) {
          this.currentTime = 0;
          this.pause();
          if (this.onTimeOut) this.onTimeOut();
        }
      }
      this.lastTime = timestamp;
      this.timerWrapper.textContent = this.getTimerStr();
      this.animationId = requestAnimationFrame(this.animate.bind(this));
    }
  }
}


/*******TIMER WITH SETINTERVAL*******/

// export class Timer {

//   constructor(options) {
//     const { container, min, onTimeOut, isRunning = true } = options
//     this.container = container;
//     this.createTimerWrapper();
//     this.onTimeOut = CheckCallback.check(onTimeOut);
//     this.startTime = min || '1';
//     this.isRunning = isRunning;
//   }

//   createTimerWrapper() {
//     this.timerWrapper = Tag.build({
//       tagName: 'span',
//       classes: ['control-bar__timer'],
//     })
//     this.container.prepend(this.timerWrapper)
//   }

//   set startTime(value) {
//     this._startTime = parseFloat(value) * 60;
//     this.currentTime = this._startTime;
//   }

//   get startTime() {
//     return this._startTime;
//   }

//   set currentTime(value) {
//     this._currentTime = value;
//     this.timerWrapper.textContent = this.getTimerStr()

//   }

//   get currentTime() {
//     return this._currentTime
//   }

//   set isRunning(value) {
//     this._isRunning = value;
//     value? this.start() : this.pause();
//   }

//   get isRunning() {
//     return this._isRunning;
//   }

//   getTimerStr() {
//     let min = Math.trunc(this.currentTime / 60);
//     let sec = Math.trunc(this.currentTime % 60);
//     if (min < 10) min = `0${min}`;
//     if (sec < 10) sec = `0${sec}`;
//     return `${min}:${sec}`
//   }
//   start() {
//     this.interval = setInterval(() => this.tick(), 1000);
//   }

//   pause() {
//     clearInterval(this.interval)
//   }

//   reset() {
//     this.isRunning = false;
//     this.currentTime = this.startTime;
//     this.isRunning = true;
//   }


//   tick() {
//     if (this.currentTime <= 1) {
//       this.currentTime = 0;
//       this.pause();
//       if(this.onTimeOut) this.onTimeOut()
//       return;
//     }
//     --this.currentTime
//   }
// }