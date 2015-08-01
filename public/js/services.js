'use strict';

angular.module('palindromer.services', ['ngResource'])

    .factory('Constants', function(){
        var url = 'http://localhost:8080/api';
    
        return{
            getUrl: function() { return url; }
        };
    })

    .factory('Messages', function ($q, $http, $rootScope, Constants) {
        var messages = [];

        return {
            getMessages: function(){
                var q = $q.defer();
				$http.get(Constants.getUrl() + '/messages')
                    .success(function (data) {
                        console.log("Got "+data.length+ " messages");
                        messages = data;
                        q.resolve(messages);

                    }).error(function (data, status, headers, config) {
                        console.log(status);
                        q.reject(status);
                    });
                return q.promise;
            },
            addMessage: function(text){
                var q = $q.defer();
                $http.post(Constants.getUrl() + '/messages', {'text': text})
                    .success(function (data) {
                        messages.push(data);
                        q.resolve(data);
                    }).error(function (data, status, headers, config) {
                        q.reject(status);
                    });
                return q.promise;
            }
        }
    })