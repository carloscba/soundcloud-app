angular.module('starter.controllers', [])

.controller('TracksCtrl', function($rootScope, $scope, Chats, $http, $location) {
  
  $http({
    method: 'GET',
    url: 'https://api.soundcloud.com/users/5092013/tracks?client_id=a3c640eb93a579e2fb97438a287aff52'
  }).then(function successCallback(response) {
    
    $scope.tracks = response.data;
  
  }, function errorCallback(response) {

  });

  $scope.getTrack = function(index){
    $rootScope.track = $scope.tracks[index];
    $location.path('/tab/track/'+$scope.tracks[index].id)
  }

})

.controller('TrackDetailCtrl', function($rootScope, $scope, $stateParams) {

  $scope.track = $rootScope.track;
  console.log('$scope.track');
  console.log($scope.track);

  SC.initialize({
    client_id: 'a3c640eb93a579e2fb97438a287aff52',
  });
  
  SC.stream('/tracks/'+$stateParams.trackId).then(function(player){
    
    $scope.playing = false;

    $scope.trackPlay = function(){
      if($scope.playing){
        $scope.playing = false;
        player.pause();
      }else{
        $scope.playing = true;
        player.play();
      }

      
    }

    $scope.stopPlay = function(){
      $scope.playing = false;
      player.pause();
      player.seek(0);
    }        

  });  

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
