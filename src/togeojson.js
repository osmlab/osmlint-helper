var fs = require('fs')
var readline = require('readline')
var geojson = {
  'type': 'FeatureCollection',
  'features': []
}
module.exports = {
  convert: function (file) {
    var rd = readline.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false
    })
    rd.on('line', function (line) {
      var obj = JSON.parse(line)
      if (obj.type === 'FeatureCollection') {
        geojson.features = geojson.features.concat(obj.features)
      } else {
        geojson.features = geojson.features.concat(obj)
      }
    }).on('close', function () {
      process.stdout.write(JSON.stringify(geojson))
    })
  }
}
