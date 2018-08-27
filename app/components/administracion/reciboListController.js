angular.module('app')
    .controller('reciboListController', function ($scope, $rootScope, $location, Auth, $uibModal, utilityService, $cookies, workflowService) {

        var reciboListController = this;

        // Setting socket
        var socket = io($rootScope.WEB_SOCKET_URL);

        // Setting selected items
        reciboListController.selectedLegajo = null;
        reciboListController.legajo = '';
        reciboListController.tramiteAGenerar = {};

        // Setting various
        reciboListController.usuarioAsignadoUsername = $rootScope.user.username.split('@')[0] || $rootScope.user.username;
        reciboListController.grupoAsignadoListString = '';
        reciboListController.usuarioAsignadoIdUsuario = 0;

        // Setting list values
        reciboListController.tramiteListData = [];
        reciboListController.tramiteInstanciaList = [];
        reciboListController.prioridadList = [];
        reciboListController.edificioConstanciaList = [];
        reciboListController.edificioList = [];

        // Setting text items    
        reciboListController.legajoSearchText = null;

        reciboListController.init = function () {

            Auth.tokenCookieExists();
            reciboListController.loadLists();

        };

        $("#reciboList_ResultTable").on("click-cell.bs.table", function (field, value, row, $el) {
            if ($el) {
                openReciboDetailPopup($el);
            }
        });

        reciboListController.loadLists = function () {
            reciboListController.loadEmpleadoList();
        }

        reciboListController.loadEmpleadoList = function () {

            var process_getEmpleadoList_request = function () {
                utilityService.callSecureHttp({
                    method: "GET",
                    url: "secure-api/Empleado/GetAll/",
                    callbackSuccess: success_getEmpleadoList_Request,
                    callbackError: success_getEmpleadoList_Request
                });
            };

            var success_getEmpleadoList_Request = function (response) {

                if (response.data) {

                    if (Array.isArray(response.data)) {
                        $('#reciboList_ResultTable').bootstrapTable();
                        $('#reciboList_ResultTable').bootstrapTable('load', {
                            data: response.data
                        });
                    }
                }

            };
            process_getEmpleadoList_request();
        }
        
        openReciboDetailPopup = function (element) {
            if (Auth.tokenCookieExists) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'app/components/administracion/modal/popupDetalleRecibos.html',
                    controller: 'popupDetalleRecibosController as vm',
                    backdrop: 'static',
                    id: 'assign_modal',
                    size: 'lg',
                    keyboard: false,
                    resolve: {
                        data: element
                    }
                });

                $("#assign_modal").on("hidden", function () {
                    reciboListController.loadTareaList()
                });

                modalInstance.result.then(function () { });
            }
            else {
                utilityService.showMessage({
                    messageType: 1,
                    messageTitle: "Sesión caducada",
                    message: "Se ha finalizado la sesión. Vuelva a ingresar al sistema."
                })
            }
        }

        resumeInstanciaEstado = function (idInstanciaEstado) {
            workflowService.getEstadoInstanciaById(idInstanciaEstado).then(function (response) {
                if (response) {
                }
            });
        }
    });