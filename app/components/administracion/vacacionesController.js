angular.module('app')
    .controller('vacacionesController', function ($rootScope, Auth, utilityService) {

        var vacacionesController = this;

        // Setting socket
        var socket = io($rootScope.WEB_SOCKET_URL);

        // Setting selected items
        vacacionesController.selectedLegajo = null;
        vacacionesController.legajo = '';
        vacacionesController.tramiteAGenerar = {};

        // Setting text items    
        vacacionesController.legajoSearchText = null;

        vacacionesController.init = function () {

            Auth.tokenCookieExists();
            vacacionesController.loadLists();

        };

        vacacionesController.loadLists = function () {
            vacacionesController.loadAusentismoList();
        }

        vacacionesController.loadAusentismoList = function () {

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