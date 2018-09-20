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
        /* ESTADISTICAS GENERALES */
        .when('/EstadisticasGenerales', {
            templateUrl: server_prefix + 'app/components/administracion/estadisticasGenerales.html',
            controller: 'estadisticasGeneralesController as vm',
            requiresAuthentication: true
        })       
        /* RECIBOS */
        .when('/Recibos', {
            templateUrl: server_prefix + 'app/components/administracion/reciboList.html',
            controller: 'reciboListController as vm',
            requiresAuthentication: true
        })        
        /* AUSENTISMO */
        .when('/Ausentismo', {
            templateUrl: server_prefix + 'app/components/administracion/ausentismo.html',
            controller: 'ausentismoController as vm',
            requiresAuthentication: true
        })          
        /* AUSENTISMO */
        .when('/Bajas', {
            templateUrl: server_prefix + 'app/components/administracion/bajas.html',
            controller: 'bajasController as vm',
            requiresAuthentication: true
        })          
        /* AUSENTISMO */
        .when('/Novedades', {
            templateUrl: server_prefix + 'app/components/administracion/novedades.html',
            controller: 'novedadesController as vm',
            requiresAuthentication: true
        })          
        /* AUSENTISMO */
        .when('/Ganancias', {
            templateUrl: server_prefix + 'app/components/administracion/ganancias.html',
            controller: 'gananciasController as vm',
            requiresAuthentication: true
        })          
        /* AUSENTISMO */
        .when('/Vacaciones', {
            templateUrl: server_prefix + 'app/components/administracion/vacaciones.html',
            controller: 'vacacionesController as vm',
            requiresAuthentication: true
        })           
        .when('/Legajos', {
            templateUrl: server_prefix + 'app/components/administracion/legajos.html',
            controller: 'legajosController as vm',
            requiresAuthentication: true
        })     
        .when('/Reporte', {
            templateUrl: server_prefix + 'app/components/administracion/reporte.html',
            controller: 'reporteController as vm',
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

        $rootScope.WEB_SOCKET_URL = "http://localhost:9009";
        
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