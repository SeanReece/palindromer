angular.module('palindromer', ['palindromer.services'])

    .controller('MessagesCtrl', function ($scope, Messages) {
        $scope.inProgress = true;
        Messages.getMessages().then(function(data){
                $scope.messages = data;
                $scope.inProgress = false;
            }, function(err){
                $scope.inProgress = false;
            });

        $scope.addMessage = function(){
            $scope.inProgress = true;
           
            Messages.addMessage($scope.newMsgText).then(function(data){
                $scope.inProgress = false;
            }, function(err){
                $scope.inProgress = false;
            });
        }
        
        $scope.addDemo = function(){
            $scope.newMsgText = "A man, a plan, a canal, Panama";
        }
    })