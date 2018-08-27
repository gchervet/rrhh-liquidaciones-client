app.config(['$qProvider', '$routeProvider', '$stateProvider', '$urlRouterProvider',
    function ($qProvider, $routeProvider, $stateProvider, $urlRouterProvider) {

        $qProvider.errorOnUnhandledRejections(false);

        var server_prefix = '';

        $routeProvider
        .when('/login', {
            templateUrl: server_prefix + 'app/components/login/login.html',
            controller: 'loginController as vm'
        })
        .when('/home', {
            templateUrl: server_prefix + 'app/components/home/home.html',
            controller: 'homeController as home',
            requiresAuthentication: true
        })
        .when('/main', {
            templateUrl: server_prefix + 'app/components/main/main.html',
            controller: 'mainController as main',
            requiresAuthentication: true
        })
        .when('/user', {
            templateUrl: server_prefix + 'app/components/user/userProfile.html',
            controller: 'userProfileController as vm',
            requiresAuthentication: true
        })
        /* RECIBOS */
        .when('/Recibos', {
            templateUrl: server_prefix + 'app/components/administracion/reciboList.html',
            controller: 'reciboListController as vm',
            requiresAuthentication: true
        })        
        /* AUSENTISMO */
        .when('/Ausencias', {
            templateUrl: server_prefix + 'app/components/administracion/ausentismoList.html',
            controller: 'ausentismoListController as vm',
            requiresAuthentication: true
        })       
        /* DEFAULT */
        .otherwise({ redirectTo: "home" });

    }
]);
app.run(['myUrl', '$rootScope', '$location', 'Auth', 'blockUIConfig',
    function (myUrl, $rootScope, $location, Auth, blockUIConfig) {

        // Setting the authorization Instance
        Auth.init();

        // Setting the authentication validation on every route change
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (!Auth.checkPermissionForView(next)) {
                event.preventDefault();
                $location.path("/login");
            }
        });
        // Setting service url
        $rootScope.myUrl = myUrl;

        $rootScope.WEB_SOCKET_URL = "http://10.9.0.112:9009";
        
        /* Setting global variables */
        // 4.Client\app\components\indicadoresDePermanencia\indicadoresDePermanencia.html
        $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MAYOR = 80;
        $rootScope.KPI_INASISTENCIAS_PORCENTAJE_LIMITE_MENOR = 30;
        $rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR = 80;
        $rootScope.KPI_EXAMENES_REPROBADOS_PORCENTAJE_LIMITE_MENOR = 30;
        $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MAYOR = 80;
        $rootScope.KPI_FINALES_REPROBADOS_PORCENTAJE_LIMITE_MENOR = 30;
        $rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MAYOR = 10000;
        $rootScope.KPI_MONTO_DE_DEUDA_LIMITE_MENOR = 1000;

        blockUIConfig.message = "Cargando ...";
        blockUIConfig.requestFilter = function (request) { return (request.noBlock) ? false : blockUIConfig.message; };

    }
]);