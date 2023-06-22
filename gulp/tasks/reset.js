const del = require('del');
exports.reset = () => {
  return del(app.pathes.clean)
}