angular.module('app')
    .controller('popupEmpleadoController', function ($scope, $routeParams, $rootScope, $location, Auth, $uibModal, utilityService, data, $uibModalInstance, datetimeService) {

        var popupEmpleadoController = this;

        popupEmpleadoController.legajo = undefined;

        if (!data) {
            popupEmpleadoController.action = 'Agregar ';
            popupEmpleadoController.actionId = 'A';
        }
        else {
            popupEmpleadoController.action = data.action;
            popupEmpleadoController.actionId = 'B';
        }
        popupEmpleadoController.Data = data;

        popupEmpleadoController.ReciboPorEmpleadoList = [];
        popupEmpleadoController.MonthList = datetimeService.getMonthList();
        popupEmpleadoController.MesNacimiento = popupEmpleadoController.MonthList[0];
        popupEmpleadoController.DaysOnMonth = datetimeService.getDayOnMonthList(popupEmpleadoController.MesNacimiento.value);
        popupEmpleadoController.YearList = datetimeService.getYearList();

        if (popupEmpleadoController.actionId == 'A') {
            popupEmpleadoController.MonthSelected = '01';
            popupEmpleadoController.DaySelected = '1';
            popupEmpleadoController.YearSelected = '2018';
        }
        if (popupEmpleadoController.actionId == 'B' && popupEmpleadoController.Data) {

            var fechaNacimiento = new Date(popupEmpleadoController.Data.FechaNacimiento);
            if(fechaNacimiento){
                popupEmpleadoController.MonthSelected = datetimeService.getStringMonth(fechaNacimiento.getMonth()+1);
                popupEmpleadoController.DaySelected = fechaNacimiento.getDate().toString();
                popupEmpleadoController.YearSelected = fechaNacimiento.getFullYear().toString();
            }
        }

        $scope.Filters =
            {
                yearFilter: '2018',
                monthFilter: { name: 'Enero', value: '01' }
            }


        popupEmpleadoController.init = function () {
            Auth.tokenCookieExists();
        };

        popupEmpleadoController.saveChanges = function () {

            popupEmpleadoController.Data.FechaNacimiento = new Date(Number(popupEmpleadoController.YearSelected), Number(popupEmpleadoController.MonthSelected) - 1, Number(popupEmpleadoController.DaySelected));
            var method = '';
            if (popupEmpleadoController.actionId == 'A') {
                method = 'Create';
            }
            else if (popupEmpleadoController.actionId == 'B') {
                method = 'Update';
            }
            else {
                return;
            }
            var process_saveChanges_request = function () {
                utilityService.callSecureHttp({
                    method: "POST",
                    url: "secure-api/Empleado/" + method,
                    callbackSuccess: success_saveChanges_Request,
                    callbackError: success_saveChanges_Request,
                    data: popupEmpleadoController
                });
            };
            var success_saveChanges_Request = function (response) {

                if (response.data) {
                    var data = {
                        messageTitle: 'Cambios guardadps',
                        message: 'Se guardaron los cambios realizados.',
                        messageType: 1
                    };

                    var modal = utilityService.showMessage(data);
                    modal.result.then(
                        function (result) { },
                        function (result) {
                            $uibModalInstance.close('finish');
                            return false;
                        });

                }
                else {
                    alert('Error.');
                }

            };
            process_saveChanges_request();
        }

        popupEmpleadoController.getDayOnMonthList = function () {
            popupEmpleadoController.DaysOnMonth = datetimeService.getDayOnMonthList(Number(popupEmpleadoController.MonthSelected));
        };

        popupEmpleadoController.cancel = function () {
            var data = {
                messageTitle: '¿Desea salir?',
                message: 'Se perderán los cambios realizados.',
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