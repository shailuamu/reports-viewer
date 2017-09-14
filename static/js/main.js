var appModule = angular.module('app', []);

appModule.controller('PageController', ['$scope', '$http', function($scope, $http) {
    var defaultPageUrl = "reports/REPORT-NAME/BUILD/index.html";
    $scope.builds = [];
    $scope.tabs = [];
	$scope.subtabs = [];
	$scope.currentTab = "";
	$scope.currentSubtab = "";
	$scope.pageTitle = "";
	$scope.currentBuildNumber = "";

    $scope.getReports = function() {
      var path = '/v1/reports';
      $http.get(path).then(function(response) {
          console.log('response - ' + response.data);
          $scope.tabs = response.data;

          $scope.setPage($scope.tabs[0]);
		  //getSubtabs($scope.tabs[0]);
      });
    }

    $scope.setPage = function(pageCode) {
      var path = '/v1/folders/' + pageCode;
      $scope.pageTitle = pageCode + " REPORT";
	  $scope.currentTab = pageCode;
	  $scope.subtabs = [];
      $http.get(path).then(function(response) {
          console.log('Sub page code response - ' + response.data);
          var subtabs = response.data;

		  var buildHistoryPath = pageCode;
		  if(subtabs != undefined && subtabs.length > 0) {
			  var isnum = /^\d+$/.test(subtabs[0]);
			  if(!isnum) {
				console.log('***********');
				$scope.subtabs = subtabs;
				$scope.currentSubtab = $scope.subtabs[0];
				$scope.pageTitle = $scope.currentTab + ' >> ' + $scope.currentSubtab + " REPORT";
				buildHistoryPath = pageCode + '/' + $scope.subtabs[0];
			  }
		  }
		  console.log('Build History Path ' + buildHistoryPath);

		  getBuildHistory(buildHistoryPath, setPageCallback);
      });
    }

	$scope.setSubPage = function(subTab) {
      $scope.pageTitle = $scope.currentTab + ' >> ' + subTab + " REPORT";
      $scope.currentSubtab = subTab;
	  var buildHistoryPath = $scope.currentTab + '/' + subTab;
	  var path = '/v1/folders/' + buildHistoryPath;
	  getBuildHistory(buildHistoryPath, setPageCallback);

    }

    function getBuildHistory(pageCode, cb) {
      var path = '/v1/folders/' + pageCode;
      $http.get(path).then(function(response) {
          console.log('response - ' + response.data);
          $scope.builds = response.data;
          cb(pageCode);
      });
    }

    function setPageCallback(pageCode) {
      var pageUrl = defaultPageUrl;
      $scope.currentBuildNumber = $scope.builds[0];
      pageUrl = pageUrl.replace('REPORT-NAME', pageCode);
      pageUrl = pageUrl.replace('BUILD', $scope.builds[0]);
      $('#content-frame').attr('src', pageUrl);
    }

    $scope.changeBuildReport= function(buildNumber) {
      $scope.currentBuildNumber = buildNumber;
      var reportName = $scope.currentTab;
      if($scope.currentSubtab != undefined && $scope.currentSubtab != "") {
              reportName = reportName + '/' + $scope.currentSubtab;
      }
      var pageUrl = defaultPageUrl;
      pageUrl = pageUrl.replace('REPORT-NAME', reportName);
      pageUrl = pageUrl.replace('BUILD', buildNumber);
      $('#content-frame').attr('src', pageUrl);

    }

}]);

function setPage(pageName) {
  $('#content-frame').attr('src', pageName);
}