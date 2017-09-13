var fs = require('fs');

module.exports = function(app) {

var BASE_REPORT_DIR = process.env.BASE_REPORT_DIR || './static/reports/';

  app.route('/v1/folders/:name').get(function(req, res){
        var param = req.params.name;
        var dir = BASE_REPORT_DIR + param;
        fs.readdir(dir, function(err, items){
			var tempItems = items;

			var isnum = /^\d+$/.test(tempItems[0]);
			if(isnum) {
				var response = items.sort(function(a,b){ return b-a});
				res.status(200).send(response);
			} else {
				res.status(200).send(items);
			}

        });
        //res.status(200).send(['Build-4', 'Build-3', 'Build-2', 'Build-1']);
  });

    app.route('/v1/folders/:name/:subname').get(function(req, res){
        var name = req.params.name;
		var subName = req.params.subname;
        var dir = BASE_REPORT_DIR + name + '/' + subName;
        fs.readdir(dir, function(err, items){

			if(items != undefined && items.length > 0) {
				var tempItems = items;
				var isnum = /^\d+$/.test(tempItems[0]);
				if(isnum) {
					var response = items.sort(function(a,b){ return b-a});
					res.status(200).send(response);
				} else {
					res.status(200).send(items);
				}
			} else {
				res.status(200).send([]);
			}

        });

        //res.status(200).send(['Build-4', 'Build-3', 'Build-2', 'Build-1']);

  });

    app.route('/v1/reports').get(function(req, res){
          var param = req.params.name;
          var dir = './static/reports';
          fs.readdir(dir, function(err, items){
            var response = items.sort(function(a,b){ return b-a});
            res.status(200).send(response);
          });

          //res.status(200).send(['Build-4', 'Build-3', 'Build-2', 'Build-1']);

    });

	    app.route('/v1/reports/subtabs').get(function(req, res){
          var reportName = req.params.reportName;
          var dir = BASE_REPORT_DIR + reportName;
          fs.readdir(dir, function(err, items){
            var response = items.sort(function(a,b){ return b-a});
            res.status(200).send(response);
          });

          //res.status(200).send(['Build-4', 'Build-3', 'Build-2', 'Build-1']);

    });

};
