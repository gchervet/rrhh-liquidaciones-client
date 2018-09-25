angular.module('app')
    .controller('novedadesController', function ($rootScope, Auth, utilityService) {

        var novedadesController = this;

        // Setting socket
        var socket = io($rootScope.WEB_SOCKET_URL);

        // Setting selected items
        novedadesController.selectedLegajo = null;
        novedadesController.legajo = '';
        novedadesController.tramiteAGenerar = {};

        // Setting text items    
        novedadesController.legajoSearchText = null;
        
        $('#sueldoList_ResultTable').bootstrapTable();
        $('#vacacionesList_ResultTable').bootstrapTable();
        $('#licenciaList_ResultTable').bootstrapTable();

        novedadesController.init = function () {

            Auth.tokenCookieExists();
            novedadesController.loadLists();

        };

        novedadesController.loadLists = function () {
            novedadesController.loadSueldoList();
            novedadesController.loadVacacionesList();
            novedadesController.loadLicenciaList();
        }

        novedadesController.loadSueldoList = function () {

            var process_getSueldoList_request = function () {
                utilityService.callSecureHttp({
                    method: "GET",
                    url: "secure-api/Sueldo/GetAll/",
                    callbackSuccess: success_getSueldoList_Request,
                    callbackError: success_getSueldoList_Request
                });
            };

            var success_getSueldoList_Request = function (response) {

                if (response.data) {

                    if (Array.isArray(response.data)) {
                        $('#sueldoList_ResultTable').bootstrapTable();
                        $('#sueldoList_ResultTable').bootstrapTable('load', {
                            data: response.data
                        });
                    }
                }

            };
            process_getSueldoList_request();
        }

        novedadesController.loadVacacionesList = function () {

            var process_getVacacionesList_request = function () {
                utilityService.callSecureHttp({
                    method: "GET",
                    url: "secure-api/Vacaciones/GetAll/",
                    callbackSuccess: success_getVacacionesList_Request,
                    callbackError: success_getVacacionesList_Request
                });
            };

            var success_getVacacionesList_Request = function (response) {

                if (response.data) {

                    if (Array.isArray(response.data)) {
                        $('#vacacionesList_ResultTable').bootstrapTable();
                        $('#vacacionesList_ResultTable').bootstrapTable('load', {
                            data: response.data
                        });
                    }
                }

            };
            process_getVacacionesList_request();
        }

        novedadesController.loadLicenciaList = function () {

            var process_getLicenciaList_request = function () {
                utilityService.callSecureHttp({
                    method: "GET",
                    url: "secure-api/Licencias/GetAll/",
                    callbackSuccess: success_getLicenciaList_Request,
                    callbackError: success_getLicenciaList_Request
                });
            };

            var success_getLicenciaList_Request = function (response) {

                if (response.data) {

                    if (Array.isArray(response.data)) {
                        $('#licenciaList_ResultTable').bootstrapTable();
                        $('#licenciaList_ResultTable').bootstrapTable('load', {
                            data: response.data
                        });
                    }
                }

            };
            process_getLicenciaList_request();
        }
        
    });