var fs = require('fs');

module.exports = function(app) {

  app.route('/v1/folders/:name').get(function(req, res){
        var param = req.params.name;
        var dir = './static/reports/' + param;
        fs.readdir(dir, function(err, items){
          var response = items.sort(function(a,b){ return b-a});
          res.status(200).send(response);
        });

        //res.status(200).send(['Build-4', 'Build-3', 'Build-2', 'Build-1']);

  });

};
