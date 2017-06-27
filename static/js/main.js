var appModule = angular.module('app', []);

appModule.controller('PageController', ['$scope', '$http', function($scope, $http) {

$scope.builds = [];
$scope.pageTitle = "Junit Report";

var buildConfig = {
  junitPage : {
    url : "reports/junit/BUILD/index.html",
    title : "Junit Report",
    pageCode : 'junit'
  },
  staticAnalysisPage : {
    url : "reports/static-analysis/BUILD/report.html",
    title : "Static Analysis Report",
    pageCode : 'static-analysis'
  },
  webPage : {
    url : "reports/web/BUILD/report.html",
    title : "Web Report",
    pageCode : 'web'
  },
  apiPage : {
    url : "reports/api/BUILD/index.html",
    title : "API Report",
    pageCode : 'api'
  },
  appPage : {
    url : "reports/app/BUILD/index.html",
    title : "App Report",
    pageCode : 'app'
  }
};

$scope.tabs = [buildConfig.junitPage, buildConfig.staticAnalysisPage, buildConfig.webPage, buildConfig.apiPage, buildConfig.appPage];


function getfolders(pageCode, cb) {
  var path = '/v1/folders/' + pageCode;
  $http.get(path).then(function(response) {
      console.log('response - ' + response.data);
      $scope.builds = response.data;
      cb(pageCode);
  });
}

    $scope.setPage = function(pageCode) {
      getfolders(pageCode, setPageCallback);
    }

    function setPageCallback(pageCode) {
      var pageUrl = "";

      for(var i in $scope.tabs) {
        var tab = $scope.tabs[i];
        if(tab.pageCode == pageCode) {
          pageUrl = tab.url;
          $scope.pageTitle = tab.title;
        }
      }
      $scope.pageUrl = pageUrl;
      pageUrl = pageUrl.replace('BUILD', $scope.builds[0]);
      $('#content-frame').attr('src', pageUrl);
    }

    $scope.changeBuildReport= function(buildNumber) {
      var pageUrl = $scope.pageUrl;
      pageUrl = pageUrl.replace('BUILD', buildNumber);
      $('#content-frame').attr('src', pageUrl);
    }

}]);

function setPage(pageName) {
  $('#content-frame').attr('src', pageName);
}
