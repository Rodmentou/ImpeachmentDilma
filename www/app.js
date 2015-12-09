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

    setTimeout( function () {
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
    }, 55000);
  });
});

app.controller('ProfileController',
function ($rootScope, $scope, $http, $location) {
  var token = $rootScope.token;

  $scope.colors = ['Preto', 'Verde', 'Vermelho', 'Amarelo', 'Azul', 'Ouro',
    'Rosa'];

  $scope.getCoins = function (me, id) {
    if (me) {
      return Math.round(me.totalClicks[id]/500 - me.coinsUsed[id]);
    }
  };

  $scope.buyColor = function (color) {
    $http.post('https://impeachmentdilmabattle.herokuapp.com/api/me/buyColor',
    {color: color}, { headers: {'x-access-token' : token } })
    .then( function (res) {
      if (res.data.success) {
        var index = $scope.colors.indexOf(color);
        $scope.me.coinsUsed[0]++;
        $scope.me.coinsUsed[1]++;
        $scope.colors.splice(index, 1);
        $scope.myColors.push(color);
      }

    }, function (res) {
      console.log('Error on colors');
    });
  };

  $scope.addAuto = function (me, bossId) {
    console.log('Entrou no add auto');
    console.log(me.coinsUsed + 10 <= Math.round(me.totalClicks[bossId]/500));
    console.log(Math.round(me.totalClicks[bossId]/500));
    console.log(me.coinsUsed + 10);
    if (me.coinsUsed[bossId] + 10 <= Math.round(me.totalClicks[bossId]/500) ) {
      $http.post('https://impeachmentdilmabattle.herokuapp.com/api/me/addAuto',
      {bossId: bossId}, { headers: {'x-access-token' : token } })
      .then( function (res) {
        if (res.data.success) {
          $scope.me.coinsUsed[bossId] += 10;
          $scope.me.autoClick[bossId] += 1;
        }
      });
    }
  };

  $scope.addMulti = function (me, bossId) {
    if (me.coinsUsed + 50 <= Math.round(me.totalClicks[bossId]/500)) {
      $http.post('https://impeachmentdilmabattle.herokuapp.com/api/me/addMulti',
      {bossId: bossId}, { headers: {'x-access-token' : token } })
      .then( function (res) {
        $scope.me.coinsUsed += 50;
        $scope.me.dmgMulti[bossId] += 1;
      });
    }
  };

  $scope.addMax = function (me, bossId) {
    if (me.coinsUsed < Math.round(me.totalClicks[bossId]/500)) {
      $http.post('https://impeachmentdilmabattle.herokuapp.com/api/me/addMax',
      {bossId: bossId}, { headers: {'x-access-token' : token } })
      .then( function (res) {
        $scope.me.coinsUsed++;
        $scope.me.maxClicks[bossId] += 100;
      });
    }
  };

  $scope.activateColor = function (color) {
    $http.post('https://impeachmentdilmabattle.herokuapp.com/api/me/activateColor',
    {bossId: 0, color: color}, { headers: {'x-access-token' : token } })
    .then( function (res) {
      $scope.me.colorActive[0] = color;
      $scope.me.colorActive[1] = color;
    });
  };

  $scope.getMe = function(cookieToken) {
    $http.get('https://impeachmentdilmabattle.herokuapp.com/api/me',
      { headers: {'x-access-token' : token } })
      .then ( function (res) {
        $scope.me = res.data;
        var myColors = res.data.colorNames;
        var colors = $scope.colors;
        $scope.myColors = [];
        for (var i = 0; i < colors.length; i++) {
          if (myColors.indexOf(colors[i]) != -1 ) {
            console.log('Tem essa:' + colors[i]);
            $scope.myColors.push(colors[i]);
            $scope.colors.splice(i, 1);
          }
        };
        console.log($scope.me.colorNames);
        if (!$scope.me) $location.path('/');
      }, function (res) {
        console.log('Error fetching data.');
      });
  };

  $scope.getMe(token);

});

app.controller('RankingController',
function( $rootScope, $scope, $http, $location) {
  var token = $rootScope.token;

  $scope.formatDmg = function (dmg) {
    if (dmg > 1000000) {
      return Math.round(dmg/10000, -1)/100 + ' milhões';
    } else if (dmg > 1000) {
      return Math.round(dmg/10)/100 + ' mil';
    } else {
      return dmg;
    }
  };

  $scope.getMe = function(cookieToken) {
    $http.get('https://impeachmentdilmabattle.herokuapp.com/api/me',
      { headers: {'x-access-token' : token } })
      .then ( function (res) {
        $scope.me = res.data;

        var me = $scope.me;
        me.level = [];
        me.level[0] = Math.round(me.maxClicks[0]/100);
        me.level[1] = Math.round(me.maxClicks[1]/100);


        if (!$scope.me) $location.path('/');
      }, function (res) {
        console.log('Error fetching data.');
      });
  };

  $scope.getRankers = function (rankName) {

  };

  $scope.setRank = function (type, id) {
    if (type == 'boss') {
      $http.get('https://impeachmentdilmabattle.herokuapp.com/api/ranking/top10/' + id,
        { headers: {'x-access-token' : token } })
        .then( function (res) {
          console.log(res.data);
          $scope.bossId = id;
          $scope.rankers = res.data;
        });
    } else if (type == 'top'){

    }
  };

  $scope.getMe(token);

});

app.controller('GameController',
function ($rootScope, $scope, $http, $location) {
  var token = $rootScope.token;

  $scope.formatDmg = function (dmg) {
    if (dmg > 1000000) {
      return Math.round(dmg/1000000) + 'M';
    } else if (dmg > 1000) {
      return Math.round(dmg/1000) + 'k';
    } else {
      return dmg;
    }
  };

  $scope.getLevelPercentage = function(dmg) {
    return Math.round( ((dmg % 500)/500)*100 ) + '%';
  };

  $scope.getLevelNumber = function(totalDmg) {
    return Math.round(totalDmg/500);
  };

  $scope.getBarClass = function (boss) {
    if (boss) {
      if (boss.hp/boss.maxHp > 0.6) {
        return 'progress-bar-info';
      } else if (boss.hp/boss.maxHp > 0.3) {
        return 'progress-bar-warning';
      } else {
        return 'progress-bar-danger';
      }
    }
  };

  $scope.getHpBar = function (boss) {
    if (boss) {
      var percentage = (boss.hp/boss.maxHp)*100 + '%';
      return percentage;
    }
  };

  $scope.addAttack = function (boss, me, amount) {
    if (amount == undefined || amount == null) amount = 1;
    if (boss.accumulated > me.maxClicks[boss.id]) {
      boss.accumulated -= 2;
    } else {
      var realDamage = me.dmgMulti[boss.id] * amount;
      boss.accumulated += realDamage;
      me.totalClicks[boss.id] += realDamage;
    }

  };

  $scope.getAttack = function(id) {
    if ($scope.bosses) {
      var accumulated = $scope.bosses[id].accumulated;
      if (accumulated) {
        return accumulated;
      } else {
        return 0;
      }
    }

  };

  $scope.sendAttack = function (id, clicks) {
    if (clicks > 0) {
      $http.post('https://impeachmentdilmabattle.herokuapp.com/api/attack', {bossId: id, clicks:clicks},
      { headers: {'x-access-token' : token } })
      .then( function (res) {
        console.log('Attack ok');
      }, function (res) {
        console.log('Attack error' + res.data);
      });
    }
  };

  $scope.getMe = function(cookieToken) {
  	$http.get('https://impeachmentdilmabattle.herokuapp.com/api/me',
  		{ headers: {'x-access-token' : token } })
  		.then ( function (res) {
  			$scope.me = res.data;

        var me = $scope.me;
        me.level = [];
        me.level[0] = Math.round(me.maxClicks[0]/100);
        me.level[1] = Math.round(me.maxClicks[1]/100);


        if (!$scope.me) $location.path('/');
  		}, function (res) {
  			console.log('Error fetching data.');
  		});
  };

  $scope.getBosses = function () {
    $http.get('https://impeachmentdilmabattle.herokuapp.com/api/bosses',
    { headers: {'x-access-token' : token } })
    .then( function (res) {
      $scope.bosses = res.data;
      var bosses = $scope.bosses;
      for (var i = 0; i < bosses.length; i++) {
        bosses[i].relativeHp = Math.round((bosses[i].hp / bosses[i].maxHp)*100) + '%';
        bosses[i].hpClass = $scope.getBarClass(bosses[i]);
        bosses[i].accumulated = 0;
        ((bosses[i].hp/bosses[i].maxHp) > 0.3 ) ?
          bosses[i].lowHp = false : bosses[i].lowHp = true;
      }
      console.log(res.data);
    }, function (err) {
      $scope.error = 'Algo deu errado';
    });
  };

  $scope.getMe(token);
  $scope.getBosses();

  setInterval ( function () {
    var bosses = $scope.bosses;
    var id = 0;
    for (var i = 0; i < bosses.length; i ++) {
      if (bosses[i].accumulated > bosses[id].accumulated) {
        id = i;
      }
    }
    var clicks = bosses[id].accumulated;
    $scope.sendAttack(id, clicks);

    for (var i = 0; i < bosses.length; i ++) {
      bosses[i].accumulated = 0;
    }

  }, 60000);

  setInterval ( function () {
    var bosses = $scope.bosses;
    var me = $scope.me;
    for (var i = 0; i < bosses.length; i++ ){
      $scope.addAttack(bosses[i], me, me.autoClick[i]);
    }
  }, 1000);


});


app.controller('LoginController',
function ($rootScope, $scope, $http, $location) {

	$scope.signup = function (user) {
		$http.post('https://impeachmentdilmabattle.herokuapp.com/api/signup', user)
			.then( function (res) {
				if (res.data.token) {

					$rootScope.token = res.data.token;

					$location.path('/play');
				} else {
					delete $scope.user.username;
					delete $scope.user.password;
					$scope.error = res.data.message;
				}

			}, function (res) {
				$scope.error = 'Algo deu errado';
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
    .when('/ranking',
    {
      controller: 'RankingController',
      templateUrl: 'partials/ranking.html'
    })
    .when('/profile',
    {
      controller: 'ProfileController',
      templateUrl: 'partials/profile.html'
    })
    .otherwise(
		{
			redirectTo: '/'
		});

});
