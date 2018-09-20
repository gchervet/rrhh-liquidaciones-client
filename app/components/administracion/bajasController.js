angular.module('app')
    .controller('bajasController', function ($rootScope, Auth, utilityService) {

        var bajasController = this;

        // Setting socket
        var socket = io($rootScope.WEB_SOCKET_URL);

        // Setting selected items
        bajasController.selectedLegajo = null;
        bajasController.legajo = '';
        bajasController.tramiteAGenerar = {};

        // Setting text items    
        bajasController.legajoSearchText = null;

        bajasController.init = function () {

            Auth.tokenCookieExists();
            bajasController.loadLists();

        };

        bajasController.loadLists = function () {
            bajasController.loadAusentismoList();
        }

        bajasController.loadAusentismoList = function () {

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