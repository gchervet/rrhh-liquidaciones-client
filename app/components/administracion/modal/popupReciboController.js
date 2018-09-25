angular.module('app')
    .controller('popupReciboController', function ($scope, $routeParams, $rootScope, $location, Auth, $uibModal, utilityService, data, $uibModalInstance, workflowService) {

        var popupReciboController = this;

        popupReciboController.legajo = undefined;

        $scope.data = {
            NumeroOrden: 12345,
            Nombre: 'MARTINEZ, JUAN GREGORIO',
            Cargo: '',
            Costo: 'EDEN',
            CantDias: 30.0,
            Legajo: 1,
            CUILCUIT: '20-22984716-4',
            FechaIngreso: '04/05/2017',
            NumeroDia: 30,
            MesAbreviado: 'JUN',
            Ano: 2018,
            DetalleList: [
                {
                    Description: 'Sueldo básico',
                    VO: '',
                    Form: '',
                    Haberes: 23130.00,
                    Descuentos: ''
                },
                {
                    Description: 'Ad Personal FC',
                    VO: '',
                    Form: '',
                    Haberes: 2577.30,
                    Descuentos: ''
                },
                {
                    Description: 'Adicional viático',
                    VO: '',
                    Form: '',
                    Haberes: 220.00,
                    Descuentos: ''
                },
                {
                    Description: 'Adic. Art 3 ley 26341',
                    VO: '',
                    Form: '',
                    Haberes: 240.96,
                    Descuentos: ''
                },
                {
                    Description: 'Aporte jubilación (SIJP)',
                    VO: 11.00,
                    Form: '',
                    Haberes: '',
                    Descuentos: 2878.51
                },
                {
                    Description: 'Aporte Ley 19.032 (INSSJP)',
                    VO: 3.00,
                    Form: '',
                    Haberes: '',
                    Descuentos: 785.05
                },
                {
                    Description: 'Aporte Obra Social',
                    VO: 3.00,
                    Form: '',
                    Haberes: '',
                    Descuentos: 785.05
                }
            ],
            NetoSinDescuento: 26168.26,
            NetoAPagar: 21719.65,
            TotalesHaberes: 26168.26,
            TotalesDescuentos: 4448.61
        };
        popupReciboController.ReciboPorEmpleadoList = [];
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


        popupReciboController.init = function () {
            Auth.tokenCookieExists();
        };

        $scope.$watch('Filters.monthFilter', function (v) {
            $scope.SearchCode = $scope.Filters.yearFilter + $scope.Filters.monthFilter.value;
        });

        $scope.$watch('Filters.yearFilter', function (v) {
            $scope.SearchCode = $scope.Filters.yearFilter + $scope.Filters.monthFilter.value;
        });

        popupReciboController.cancel = function () {
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

        popupReciboController.getReciboList = function () {

            var process_getReciboList_request = function () {
                utilityService.callSecureHttp({
                    method: "GET",
                    url: "secure-api/Recibo/GetReciboList/" + popupReciboController.Empleado.Legajo.trim() + "/" + $scope.SearchCode,
                    callbackSuccess: success_getReciboList_Request,
                    callbackError: success_getReciboList_Request
                });
            };

            var success_getReciboList_Request = function (response) {
                if (response.data) {
                    popupReciboController.ReciboPorEmpleadoList = response.data;
                }

            };
            process_getReciboList_request();
        }

        popupReciboController.SavePDF = function (reciboEl) {
            if (reciboEl) {

            }
        }
    })