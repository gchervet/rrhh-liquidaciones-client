angular.module('app')
    .controller('ausentismoController', function ($rootScope, Auth, utilityService) {

        var ausentismoController = this;

        // Setting socket
        var socket = io($rootScope.WEB_SOCKET_URL);

        // Setting selected items
        ausentismoController.selectedLegajo = null;
        ausentismoController.legajo = '';
        ausentismoController.tramiteAGenerar = {};

        // Setting text items    
        ausentismoController.legajoSearchText = null;

        ausentismoController.init = function () {

            Auth.tokenCookieExists();
            ausentismoController.loadLists();

        };

        ausentismoController.loadLists = function () {
            ausentismoController.loadAusentismoList();
        }

        ausentismoController.loadAusentismoList = function () {

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