'use strict';

angular.module('palindromer.services', ['ngResource'])

    .factory('Constants', function(){
        var url = 'http://localhost:8080/api';
    
        return{
            getUrl: function() { return url; }
        };
    })

    .factory('Messages', function ($q, $http, $rootScope, Constants, Time) {
        var messages = [];

        return {
            getMessages: function(){
                var q = $q.defer();
				$http.get(Constants.getUrl() + '/messages')
                    .success(function (data) {
                        console.log("Got "+data.length+ " messages");
                        messages = data;
                        messages.forEach(function (message) {
                            message.humanTime = Time.timeSince(new Date(message.time));
                        });
                        q.resolve(messages);

                    }).error(function (data, status, headers, config) {
                        console.log(status);
                        q.reject(data);
                    });
                return q.promise;
            },
            addMessage: function(text){
                var q = $q.defer();
                $http.post(Constants.getUrl() + '/messages', {'text': text})
                    .success(function (data) {
                        data.humanTime = Time.timeSince(new Date(data.time));
                        messages.push(data);
                        q.resolve(data);
                    }).error(function (data, status, headers, config) {
                        q.reject(status);
                    });
                return q.promise;
            },
            deleteMessage: function(message){
                var q = $q.defer();
                if(!message){
                    q.reject();
                }
                else{
				    $http.delete(Constants.getUrl() + '/messages/'+message._id)
                    .success(function (data) {
                        var index = messages.indexOf(message);
                        if(index !== -1)
                            messages.splice(index, 1);
                        q.resolve(data);

                    }).error(function (data, status, headers, config) {
                        console.log(status);
                        q.reject(data);
                    });
                }
                return q.promise;
            },
        }
    })
    
    .factory('Time', function () {
        return {
            timeSince: function(date){
                var seconds = Math.floor((new Date() - date) / 1000);

                var interval = Math.floor(seconds / 31536000);

                if (interval > 1) {
                    return interval + " years ago";
                }
                interval = Math.floor(seconds / 2592000);
                if (interval > 1) {
                    return interval + " months ago";
                }
                interval = Math.floor(seconds / 86400);
                if (interval > 1) {
                    return interval + " days ago";
                }
                interval = Math.floor(seconds / 3600);
                if (interval > 1) {
                    return interval + " hours ago";
                }
                interval = Math.floor(seconds / 60);
                if (interval > 1) {
                    return interval + " minutes ago";
                }
                return Math.floor(seconds) + " seconds ago";
            }
        }
    })