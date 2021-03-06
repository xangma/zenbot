var colors = require('colors')
  , n = require('numbro')
  , o = require('object-get')

module.exports = function container (get, set, clear) {
  var c = get('config')
  var apply_funcs = get('utils.apply_funcs')
  var reporter_cols = c.reporter_cols.map(function (i) {
    return get('reporter_cols.' + i)
  })
  return function reporter (tick, rs, cb) {
    if (c.reporter_sizes.indexOf(tick.size) === -1 || !tick.data.trades) return cb()
    var g = {
      tick: tick,
      cols: [],
      rs: rs
    }
    apply_funcs(g, reporter_cols, function (err, g) {
      if (err) return cb(err)
      get('logger').info('reporter', g.cols.join(' '))
      cb()
    })
  }
}