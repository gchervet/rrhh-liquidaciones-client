angular.module('app')
    .controller('ausentismoListController', function ($rootScope, Auth, utilityService) {

        var ausentismoListController = this;

        // Setting socket
        var socket = io($rootScope.WEB_SOCKET_URL);

        // Setting selected items
        ausentismoListController.selectedLegajo = null;
        ausentismoListController.legajo = '';
        ausentismoListController.tramiteAGenerar = {};

        // Setting text items    
        ausentismoListController.legajoSearchText = null;

        ausentismoListController.init = function () {

            Auth.tokenCookieExists();
            ausentismoListController.loadLists();

        };

        ausentismoListController.loadLists = function () {
            ausentismoListController.loadAusentismoList();
        }

        ausentismoListController.loadAusentismoList = function () {

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