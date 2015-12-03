// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('dilmais', ['ionic', 'ngRoute']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if( ionic.Platform.isAndroid() )  {
       admobid = { // for Android
          banner: 'ca-app-pub-8150226707004967/1322407931' // Change this to your Ad Unit Id for banner...
       };

       if(AdMob)
          AdMob.createBanner( {
             adId:admobid.banner,
             position:AdMob.AD_POSITION.BOTTOM_CENTER,
             autoShow:true
          }, function() {
          }, function (){
          } );
    }
  });
});


app.controller('GameController',
function ($rootScope, $scope, $http, $location) {
  var cookieToken = $rootScope.token;


  $scope.attack = function (boss) {
    console.log(boss);
  };



});


app.controller('LoginController', function ($rootScope, $scope, $http, $location) {

	$scope.signup = function (user) {
    console.log(user);
		$http.post('https://infinityrpg.herokuapp.com/api/signup', user)
			.then( function (res) {
        console.log(res.data);
				if (res.data.token) {

					$rootScope.token = res.data.token;

					$location.path('/play');
				} else {
					delete $scope.user.username;
					delete $scope.user.password;
					$scope.error = 'Error on login';
				}

			}, function (res) {
				console.log('Error on signup');
			});
	};

	$scope.auth = function (user) {
		$http.post('https://infinityrpg.herokuapp.com/api/auth', user)
			.then ( function (res) {
				if (res.data.token){
					$rootScope.token = res.data.token;
					$location.path('/play');
				}

			}, function (res) {
				$scope.error = 'Error on login.';
			});
	};
});



app.config( function($routeProvider, $locationProvider) {


  $routeProvider
		.when('/',
		{
			controller: 'LoginController',
			templateUrl: 'partials/login.html'
		})

		.when('/play',
		{
			controller: 'GameController',
			templateUrl: 'partials/game.html'
	})
    .otherwise(
		{
			redirectTo: '/'
		});

});
