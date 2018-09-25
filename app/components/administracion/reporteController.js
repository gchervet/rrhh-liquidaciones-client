angular.module('app')
    .controller('reporteController', function ($rootScope, Auth, utilityService) {

        var reporteController = this;

        // Setting socket
        var socket = io($rootScope.WEB_SOCKET_URL);

        // Setting selected items
        reporteController.selectedLegajo = null;
        reporteController.legajo = '';
        reporteController.tramiteAGenerar = {};

        // Setting text items    
        reporteController.legajoSearchText = null;
        
        $('#ausentismoList_ResultTable').bootstrapTable();
        $('#vacacionesList_ResultTable').bootstrapTable();
        $('#bajasList_ResultTable').bootstrapTable();

        reporteController.init = function () {

            Auth.tokenCookieExists();
            reporteController.loadLists();

        };

        reporteController.loadLists = function () {
            reporteController.loadAusentismoList();
            reporteController.loadVacacionesList();
            //reporteController.loadBajasList();
        }

        reporteController.loadAusentismoList = function () {

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

        reporteController.loadVacacionesList = function () {

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
        
    });