app.controller("loginController", [
    "$scope",
    '$cookies',
    "$rootScope",
    "$location",
    "$state",
    "$uibModal",
    "myUrl",
    "$window",
    "utilityService",
    "$sessionStorage",
    "Auth",
    "workflowService",
    function ($scope, $cookies, $rootScope, $location, $state, $uibModal, myUrl, $window, utilityService, $sessionStorage, Auth, workflowService) {

        /* PARA USAR VALIDACION DE AUTH SERVICE */
        $scope.email = "";
        $scope.password = "";
        $scope.failed = false;
        $scope.username = '';
        $rootScope.token = undefined;

        $scope.login = function () {

        };

        var socket = io($rootScope.WEB_SOCKET_URL);

        var loginController = this;
        $scope.loginUser = {};

        var idLang = $location.search().idLanguage;
        if (idLang) {
            route.idLanguage = idLang;
            StorageCacheService.removeAll();
            $translate.refresh();
        }

        loginController.init = function () {

            generalConfigurationCallback = function (response) {
                loginController.enableRegister = response;
            }

        };

        loginController.KeepLoggedIn = false;

        loginController.resetUserPassword = function () {
            $scope.loginUser.Password = "";
            $scope.form.$setPristine();
        };

        loginController.handleLoginResponse = function (response) {


            //if (Auth.userHasPermission(["administration"])) {
            //    // some evil logic here
            //    var userName = Auth.currentUser().name;
            //    // ...
            //}

            loginController.redirectAfterLogin();
        };

        loginController.redirectAfterLogin = function () {

        };

        loginController.getUserInfo = function () {
            getTramiteUsuarioTipo();
        };

        getTramiteUsuarioTipo = function () {

            var username = $rootScope.user.username;
            if ($rootScope.user.username.indexOf('@') != -1) {
                username = $rootScope.user.username.split('@')[0];
            }
            workflowService.getTipoUsuarioByUsername(username).then(function (response) {
                if (response) {
                    $rootScope.user.grupoAsignadoList = [];

                    for (i in response) {
                        var actualUsuarioInfo = response[i];

                        $rootScope.user.Email = actualUsuarioInfo.Email;
                        $rootScope.user.tipoUsuario = actualUsuarioInfo.IdTipoUsuario;
                        $rootScope.user.TipoUsuarioDescripcion = actualUsuarioInfo.TipoUsuarioDescripcion;
                        $rootScope.user.IdUsuario = actualUsuarioInfo.IdUsuario;

                        $rootScope.user.grupoAsignadoList.push({
                            IdGrupo: actualUsuarioInfo.IdGrupo,
                            NombreGrupo: actualUsuarioInfo.NombreGrupo
                        })
                    }
                    if (response[0]) {
                        $rootScope.user.tipoUsuario = response[0].IdTipoUsuario;
                    }
                }
            })
        };

        $scope.authorizeAction = function () {

            var loginCallback = function (response) {
                if (response) {

                    loginController.failedLoginCode = response.data.FailedLoginCode;

                    if (response.data.FailedLoginCode == 1) {

                        /* Seteo de fecha de expiración del token */
                        var now = new Date(),
                            expirationMinutes = 100000;

                        if (response.data.expirationMinutes) expirationMinutes = response.data.ExpirationMinutes;

                        now.setMinutes(now.getMinutes() + expirationMinutes);

                        $sessionStorage.user = response.data;
                        $rootScope.user = $sessionStorage.user;
                        $rootScope.user.username = $rootScope.user.name.split('@kennedy.edu.ar')[0] || $rootScope.user.name;
                        $rootScope.token = response.data.Token;

                        if (response.data.permissions.length == 0) {
                            // INVALID COLUMN NAME 'TRUE'
                            //loginController.loadPermissionByUsername($scope.username);
                        }

                        /* Búsqueda de datos del usuario */
                        loginController.getUserInfo();

                        /* Seteo de valores en los cookies */
                        $cookies.put('token', $rootScope.token, { expires: now });
                        $cookies.put('user', $sessionStorage.user.name, { expires: now });

                        $location.path("/home");
                    }
                    else {
                        $sessionStorage.user = null;
                    }
                }
            };

            var errorCallback = function (response) {

                loginController.resetUserPassword();
                loginController.failedLoginCode = response.code;

            }

            if ($scope.loginUser.UserName.indexOf('@kennedy.edu.ar') == -1) {

                $scope.username = $scope.loginUser.UserName;
                $scope.loginUser.UserName = $scope.loginUser.UserName; // + '@kennedy.edu.ar';
            }

            utilityService.callHttp({ method: "POST", url: "api/Authenticate", data: $scope.loginUser, callbackSuccess: loginCallback, callbackError: errorCallback });

            return false;
        };

        loginController.loadPermissionByUsername = function () {

            loginController.loadPermissionByUsernameCallback = function (response) {
                if (response) {
                    $sessionStorage.user.permissions = response.data;
                }
            }

            loginController.loadPermissionByUsernameErrorCallback = function (response) {

            }

            utilityService.callSecureHttp({
                method: "GET",
                url: "secure-api/Role/GetRolePermissionByUsername?username=" + $scope.username,
                data: $scope.loginUser,
                callbackSuccess: loginController.loadPermissionByUsernameCallback,
                callbackError: loginController.loadPermissionByUsernameErrorCallback,
                token: $cookies.get('token')
            });


        };

        socket.on('401_invalid_token_error', function (message) {
            Auth.invalidTokenAlert();
        });

    }]);