angular.module('app')
    .controller('gananciasController', function ($rootScope, Auth, utilityService) {

        var gananciasController = this;

        // Setting socket
        var socket = io($rootScope.WEB_SOCKET_URL);

        // Setting selected items
        gananciasController.selectedLegajo = null;
        gananciasController.legajo = '';
        gananciasController.tramiteAGenerar = {};

        // Setting text items    
        gananciasController.legajoSearchText = null;

        gananciasController.init = function () {

            Auth.tokenCookieExists();
            gananciasController.loadLists();

        };

        gananciasController.loadLists = function () {
            gananciasController.loadAusentismoList();
        }

        gananciasController.loadAusentismoList = function () {

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