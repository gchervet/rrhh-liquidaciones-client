angular.module('app')
    .controller('changePasswordController', function ($scope, $rootScope, $location, Auth) {

        var changePasswordController = this;

        changePasswordController.init = function () {
            Auth.tokenCookieExists();
        };

    });