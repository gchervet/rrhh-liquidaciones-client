angular.module('app')
    .controller('legajosController', function ($rootScope, Auth, utilityService, $uibModal, $scope, datetimeService) {

        var legajosController = this;

        // Setting socket
        var socket = io($rootScope.WEB_SOCKET_URL);

        // Setting selected items
        legajosController.searchText = '';

        // Setting text items    
        legajosController.legajoSearchText = null;
        legajosController.legajoSearchList = [];
        legajosController.empleadoSelected = undefined;

        legajosController.init = function () {
            Auth.tokenCookieExists();
            legajosController.searchEmpleadoLegajoAndNombre();
        };

        $('#legajo-input').keyup(function (e) {
            if (e.keyCode == 13) {
                legajosController.searchEmpleado();
            }
        });

        legajosController.searchEmpleado = function () {

            var selected = $("#autocomplete_legajo").typeahead("getActive");

            if(!selected || !selected.id){
                utilityService.showMessage({
                    messageType: 1,
                    messageTitle: "Selección inválida",
                    message: "Debe seleccionar al menos un empleado de la lista."
                })
            }
            var process_searchEmpleado_request = function () {
                utilityService.callSecureHttp({
                    method: "GET",
                    url: "secure-api/Empleado/GetByLegajoOrApellido/" + selected.id,
                    callbackSuccess: success_searchEmpleado_Request,
                    callbackError: success_searchEmpleado_Request
                });
            };

            var success_searchEmpleado_Request = function (response) {

                if (response.data) {

                    if (Array.isArray(response.data)) {
                        if (response.data.length > 0) {
                            legajosController.legajoNotFound = false;
                            if (response.data.length > 1) {
                                // TODO:
                                // Que hacer en caso de mas de un legajo? abrir popup de resultados o mostrar un combo con resultados
                                legajosController.data = response.data[0];
                            }
                            else {
                                legajosController.data = response.data[0];
                                legajosController.empleadoSelected = response.data[0];
                                legajosController.empleadoSelected.FechaNacimientoStr = datetimeService.getStringDate(legajosController.empleadoSelected.FechaNacimiento);
                            }

                        }
                        else {
                            legajosController.legajoNotFound = true;
                        }
                    }
                }

            };
            process_searchEmpleado_request();
        }

        legajosController.searchEmpleadoLegajoAndNombre = function () {

            var process_searchEmpleadoLegajoAndNombre_request = function () {
                utilityService.callSecureHttp({
                    method: "GET",
                    url: "secure-api/Empleado/GetNombreAndLegajo/",
                    callbackSuccess: success_searchEmpleadoLegajoAndNombre_Request,
                    callbackError: success_searchEmpleadoLegajoAndNombre_Request
                });
            };

            var success_searchEmpleadoLegajoAndNombre_Request = function (response) {

                if (response.data) {
                    response.data.forEach(function (element) {
                        legajosController.legajoSearchList.push({
                            id: element.Legajo,
                            name: element.LegajoAndNombre
                        })
                        legajosController.loadAutoComplete();
                    });
                }

            };
            process_searchEmpleadoLegajoAndNombre_request();
        }

        legajosController.addEmpleado = function () {

            var modalInstance = $uibModal.open({
                templateUrl: 'app/components/administracion/modal/popupEmpleado.html',
                controller: 'popupEmpleadoController as vm',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    data: undefined
                }
            });

            $("#assign_modal").on("hidden", function () {
                legajosController.searchEmpleadoLegajoAndNombre()
            });

            modalInstance.result.then(function () { 
                legajosController.searchEmpleadoLegajoAndNombre();
                legajosController.searchEmpleado();

            });
        }

        legajosController.editEmpleado = function () {

            legajosController.empleadoSelected.action = "Editar ";
            var modalInstance = $uibModal.open({
                templateUrl: 'app/components/administracion/modal/popupEmpleado.html',
                controller: 'popupEmpleadoController as vm',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    data: legajosController.empleadoSelected
                }
            });

            $("#assign_modal").on("hidden", function () {
                legajosController.searchEmpleadoLegajoAndNombre()
            });

            modalInstance.result.then(function () { 
                legajosController.searchEmpleadoLegajoAndNombre();
                legajosController.searchEmpleado();
            });

        }

        legajosController.deleteEmpleado = function () {

        }

        /* COMPONENTS */

        legajosController.loadAutoComplete = function () {
            /* Autocomplete */
            var autocomplete_legajo = $("#autocomplete_legajo");
            autocomplete_legajo.typeahead({
                source: legajosController.legajoSearchList,
                autoSelect: true
            });
            autocomplete_legajo.change(function () {
                var current = autocomplete_legajo.typeahead("getActive");
                if (current) {
                    // Some item from your model is active!
                    if (current.name == autocomplete_legajo.val()) {
                        // This means the exact match is found. Use toLowerCase() if you want case insensitive match.
                    } else {
                        // This means it is only a partial match, you can either add a new item
                        // or take the active if you don't want new items
                    }
                } else {
                    // Nothing is active so it is a new value (or maybe empty value)
                }
            });
        }

    });