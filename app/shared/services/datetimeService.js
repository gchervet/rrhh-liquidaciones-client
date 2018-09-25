angular.module('app')
    .factory('datetimeService', ['$http', '$rootScope', '$uibModal', '$q', '$filter', '$interval', 'myUrl', '$cookies',
        function utilityService($http, $rootScope, $uibModal, $q, $filter, $interval, myUrl, $cookies) {
            var service = {
                getMonthList: getMonthList,
                getYearList: getYearList,
                getDayOnMonthList: getDayOnMonthList,
                getStringDate: getStringDate,
                getStringDay: getStringDay,
                getStringMonth: getStringMonth
            };

            return service;

            function getMonthList() {
                return [
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
                ];
            };

            function getYearList() {
                var yearList = [];
                var minYear = 1930;
                var currentYear = (new Date()).getFullYear()
                while (minYear != currentYear) {
                    yearList.push(minYear);
                    minYear++;
                }
                yearList.push(minYear);
                return yearList;
            };

            function getStringDate(dateParam) {
                var rtn = '';
                if (dateParam) {
                    var date = new Date(dateParam);

                    var monthStr = getStringMonth(date.getMonth() + 1);
                    var dayStr = getStringDay(date.getDate());
                    var yearStr = date.getFullYear().toString();

                    rtn = dayStr + "/" + monthStr + "/" + yearStr;
                }
                return rtn;
            }

            function getDayOnMonthList(month, year) {
                if (!year) {
                    year = (new Date()).getFullYear();
                }
                var maxDay = new Date(year, month, 0).getDate();
                var minDay = 1;
                var dayList = [];
                while (minDay != maxDay) {
                    dayList.push(minDay);
                    minDay++;
                }
                dayList.push(minDay);
                return dayList;
            };

            function getStringDay(day) {
                if (Number(day) < 10) {
                    return '0' + day;
                }
                else {
                    return day.toString();
                }
            }

            function getStringMonth(month) {
                if (Number(month) < 10) {
                    return '0' + month;
                }
                else {
                    return month.toString();
                }
            }

        }]);