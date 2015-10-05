(function () {
    'use strict';

    var controllerId = 'sessions';

    angular.module('app')
        .controller(controllerId, sessions);

    sessions.$inject = ['common', 'datacontext']; 

    function sessions(common, datacontext) {
        /* jshint validthis:true */
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        // Bindable properties and functions are placed on vm.        
        vm.sessions = [];
        vm.refresh = refresh;
        vm.title = 'Sessions';

        activate();

        function activate() {
           
            common.activateController([getSessions()], controllerId)
                .then(function () { log('Activated Sessions View'); });
        }

        function getSessions(forceRefresh) {
            return datacontext.getSessionPartials(forceRefresh).then(function (data) {
                return vm.sessions = data;
            });
        }

        function refresh() {
            getSessions(true);
        }
    }
})();
