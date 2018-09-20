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
            novedadesController.loadAusentismoList();
        }

        novedadesController.loadAusentismoList = function () {

            var process_getAusentismoList_request = function () {
                utilityService.callSecureHttp({
                    method: "GET",
                    url: "secure-api/Ausentismo/GetAll/",
                    callbackSuccess: success_getAusentismoList_Request,
                    callbackError: success_getAusentismoList_Request
                });
            };

            var success_getAusentismoList_Request = function (response) {

                if (response.data) {

                    if (Array.isArray(response.data)) {
                        $('#ausentismoList_ResultTable').bootstrapTable();
                        $('#ausentismoList_ResultTable').bootstrapTable('load', {
                            data: response.data
                        });
                    }
                }

            };
            process_getAusentismoList_request();
        }
        
    });