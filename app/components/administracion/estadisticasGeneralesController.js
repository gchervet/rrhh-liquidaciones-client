angular.module('app')
    .controller('estadisticasGeneralesController', function ($rootScope, Auth, utilityService) {

        var estadisticasGeneralesController = this;

        // Setting socket
        var socket = io($rootScope.WEB_SOCKET_URL);

        // Setting selected items
        estadisticasGeneralesController.selectedLegajo = null;
        estadisticasGeneralesController.legajo = '';
        estadisticasGeneralesController.tramiteAGenerar = {};
        estadisticasGeneralesController.empleadoNumber = 0;
        estadisticasGeneralesController.ausentismoNumber = 0;

        // Setting text items    
        estadisticasGeneralesController.legajoSearchText = null;

        estadisticasGeneralesController.init = function () {

            Auth.tokenCookieExists();
            estadisticasGeneralesController.loadData();

        };

        estadisticasGeneralesController.loadData = function () {
            estadisticasGeneralesController.loadAusentismoData();
            estadisticasGeneralesController.loadEmpleadoData();
        }

        estadisticasGeneralesController.loadAusentismoData = function () {

            var process_getAusenciasByYear_request = function () {
                utilityService.callSecureHttp({
                    method: "GET",
                    url: "secure-api/Ausentismo/GetAusenciasByYear/" + (new Date()).getFullYear(),
                    callbackSuccess: success_getAusenciasByYear_request,
                    callbackError: success_getAusenciasByYear_request
                });
            };

            var success_getAusenciasByYear_request = function (response) {

                if (response.data) {
                    estadisticasGeneralesController.ausentismoNumber = response.data.length;
                }
            };
            process_getAusenciasByYear_request();
        }

        estadisticasGeneralesController.loadEmpleadoData = function () {

            var process_getEmpleadoActivoList_request = function () {
                utilityService.callSecureHttp({
                    method: "GET",
                    url: "secure-api/Empleado/GetEmpleadoNumber/",
                    callbackSuccess: success_getEmpleadoActivoList_request,
                    callbackError: success_getEmpleadoActivoList_request
                });
            };

            var success_getEmpleadoActivoList_request = function (response) {

                if (response.data) {
                    estadisticasGeneralesController.empleadoNumber = response.data
                }
            };
            process_getEmpleadoActivoList_request();
        }
        
    });
