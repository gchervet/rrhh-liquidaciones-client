angular.module('app')
    .controller('popupDetalleRecibosController', function ($scope, $routeParams, $rootScope, $location, Auth, $uibModal, utilityService, data, $uibModalInstance, workflowService) {

        var popupDetalleRecibosController = this;

        popupDetalleRecibosController.legajo = undefined;

        popupDetalleRecibosController.Empleado = data;
        popupDetalleRecibosController.ReciboPorEmpleadoList = [];
        $scope.SearchCode = '2018';
        $scope.MonthList =
            [
                { name: 'Enero', value: '01' },
                { name: 'Febrero', value: '02' },
                { name: 'Marzo', value: '03' },
                { name: 'Abril', value: '04' },
                { name: 'Mayo', value: '05' },
                { name: 'Junio', value: '06' },
                { name: 'Julio', value: '07' },
                { name: 'Agosto', value: '08' },
                { name: 'Septiembre', value: '09' },
                { name: 'Octubre', value: '10' },
                { name: 'Noviembre', value: '11' },
                { name: 'Diciembre', value: '12' }
            ]
        $scope.Filters =
            {
                yearFilter: '2018',
                monthFilter: { name: 'Enero', value: '01' }
            }

        popupDetalleRecibosController.init = function () {
            Auth.tokenCookieExists();
        };

        $scope.$watch('Filters.monthFilter', function (v) {
            $scope.SearchCode = $scope.Filters.yearFilter + $scope.Filters.monthFilter.value;
        });

        $scope.$watch('Filters.yearFilter', function (v) {
            $scope.SearchCode = $scope.Filters.yearFilter + $scope.Filters.monthFilter.value;
        });

        popupDetalleRecibosController.cancel = function () {
            var data = {
                messageTitle: '¿Desea salir?',
                message: '¿Estás seguro que deseas cerrar los detalles de recibos?',
                messageType: 3
            };

            var modal = utilityService.showMessage(data);

            modal.result.then(
                function (result) { },
                function (result) {
                    if (result == 'ok') {
                        $uibModalInstance.dismiss('finish');
                        return false;
                    }
                    if (result == 'cancel') {
                        console.log("CANCEL!")
                    }
                });
        }

        popupDetalleRecibosController.getReciboList = function () {

            var process_getReciboList_request = function () {
                utilityService.callSecureHttp({
                    method: "GET",
                    url: "secure-api/Recibo/GetReciboList/" + popupDetalleRecibosController.Empleado.Legajo.trim() + "/" + $scope.SearchCode,
                    callbackSuccess: success_getReciboList_Request,
                    callbackError: success_getReciboList_Request
                });
            };

            var success_getReciboList_Request = function (response) {
                if (response.data) {
                    popupDetalleRecibosController.ReciboPorEmpleadoList = response.data;
                }

            };
            process_getReciboList_request();
        }

        popupDetalleRecibosController.OpenReciboModal = function (reciboEl) {
            if(reciboEl){
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/components/administracion/modal/popupRecibo.html',
                    controller: 'popupReciboController as vm',
                    windowClass: 'app-modal-window',
                    resolve: {
                        data: reciboEl
                    }
                });
            }
        }
    })