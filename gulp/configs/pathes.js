
const buildFolder = './dist'; //путь к папке с рез
const srcFolder = './src';// путь к папке с исходниками

exports.pathes = {
  build: {
    html:`${buildFolder}`,
    css: `${buildFolder}/css/`,
    images: `${buildFolder}/img/`,
    js: `${buildFolder}/js/`,
    resources: `${buildFolder}/resources/`, //папка с локальными версиями библиотек, шрифты
  },
  src: {
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/*.scss`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    ico: `${srcFolder}/fav/*.ico`,
    favicons: `${srcFolder}/fav/**/*.{jpg,jpeg,png,gif,webp,svg}`,
    svg: `${srcFolder}/img/**/*.svg`,
    spriteicons: `${srcFolder}/spriteicons/*.svg`,
    spriteColor: `${srcFolder}/sprite-color/*.svg`,
    // js: `${srcFolder}/js/**/*.js`,
    js: `${srcFolder}/js/*.js`,
    resources: `${srcFolder}/resources/**/*`
  },
  watch: {
    html: `${srcFolder}/**/*.html`,//все html в src и подкаталогах
    scss: `${srcFolder}/scss/**/*.scss`,//все файлы css в css и подкаталогах
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,webp}`,//все изображения в папке img и подкаталогах
    favicons: `${srcFolder}/fav/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    js: `${srcFolder}/js/**/*.js`,//все файлы js в папке js  и подкаталогах
    spriteicons: `${srcFolder}/spriteicons/*.svg`,//все файлы svg в spriteicons
    spriteColor: `${srcFolder}/sprite-color/*.svg`,
    resources: `${srcFolder}/resources/**/*.*`,// все файлы в resources и подкаталогах
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
}
