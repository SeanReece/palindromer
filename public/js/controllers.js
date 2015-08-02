angular.module('palindromer', ['palindromer.services'])

    .controller('MessagesCtrl', function ($scope, Messages) {
        $scope.messageDownloadInProgress = true;
        $scope.sendMessageInProgress = true;
    
        $scope.doRefresh = function(){
            Messages.getMessages().then(function(data){
                $scope.messages = data;
                $scope.messageDownloadInProgress = false;
            }, function(err){
                $scope.err = err;
                $scope.errorMessageDownload = true;
                $scope.messageDownloadInProgress = false;
            });
        }

        $scope.addMessage = function(){
            $scope.sendMessageInProgress = true;
           
            Messages.addMessage($scope.newMsgText).then(function(data){
                $scope.newMsgText = '';
                $scope.sendMessageInProgress = false;
            }, function(err){
                $scope.sendMessageInProgress = false;
            });
        }
        
        $scope.addDemo = function(){
            $scope.newMsgText = "A man, a plan, a canal, Panama!";
        }
        
        $scope.setModalContext = function(message){
            $scope.selectedMessage = message;
        }
        
        $scope.deleteSelected = function(){
            Messages.deleteMessage($scope.selectedMessage).then(function(data){
            }, function(err){
                
            });
        }
        
        //Get the messages on load
        $scope.doRefresh();
    })