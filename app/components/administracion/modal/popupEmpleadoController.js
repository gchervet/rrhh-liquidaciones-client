angular.module('app')
    .controller('popupEmpleadoController', function ($scope, $routeParams, $rootScope, $location, Auth, $uibModal, utilityService, data, $uibModalInstance, workflowService) {

        var popupEmpleadoController = this;

        popupEmpleadoController.legajo = undefined;

        if(!data){
            popupEmpleadoController.action = 'Agregar ';
        }
        popupEmpleadoController.Data = data;

        popupEmpleadoController.ReciboPorEmpleadoList = [];
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


        popupEmpleadoController.init = function () {
            Auth.tokenCookieExists();
        };

        popupEmpleadoController.cancel = function () {
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

    })