(function () {

    function datePickerController() {

        /* jshint validthis:true */

        var vm = this;

        vm.isDatePickerOpen = false;

        vm.togglePopup = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.isDatePickerOpen = !vm.isDatePickerOpen;
        };
    }

    function datePicker($compile) {
        return {
            restrict: 'A',
            require: '?ngModel',
            scope: true,
            terminal: true,
            priority: -1,
            compile: function (element) {
                var wrapper = angular.element(
                    '<div class="input-group">' +
                        '<span class="input-group-btn">' +
                            '<button type="button" class="btn btn-default" ng-click="vm.togglePopup($event)"><i class="icon icon-calendar"></i></button>' +
                        '</span>' +
                    '</div>');

                function setAttributeIfNotExists(name, value) {
                    var oldValue = element.attr(name);
                    if (!angular.isDefined(oldValue) || oldValue === false) {
                        element.attr(name, value);
                    }
                }

                setAttributeIfNotExists('type', 'text');
                setAttributeIfNotExists('is-open', 'vm.isDatePickerOpen');
                setAttributeIfNotExists('datepicker-popup', 'MM/dd/yyyy');
                setAttributeIfNotExists('close-text', 'Close');
                setAttributeIfNotExists('clear-text', 'Clear');
                setAttributeIfNotExists('current-text', 'Today');

                element.addClass('form-control');
                element.removeAttr('date-picker');
                element.before(wrapper);
                wrapper.append(element);

                return function (scope, element) {
                    $compile(element)(scope);
                };
            },
            controller: datePickerController,
            controllerAs: 'vm',
        };
    }

    angular.module("picker")
        .directive('datePicker', ['$compile', datePicker]);
})();
