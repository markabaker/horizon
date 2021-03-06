(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name horizon.framework.widgets.modal
   *
   * # horizon.framework.widgets.modal
   *
   * The `horizon.framework.widgets.modal` provides modal services.
   *
   * Requires {@link http://angular-ui.github.io/bootstrap/ `Angular-bootstrap`}
   *
   * | Components                                                               |
   * |--------------------------------------------------------------------------|
   * | {@link horizon.framework.widgets.modal.controller:simpleModalCtrl `simpleModalCtrl`}     |
   * | {@link horizon.framework.widgets.modal.factory:simpleModalService `simpleModalService`}  |
   *
   */
  angular.module('horizon.framework.widgets.modal', ['ui.bootstrap', 'horizon.framework.util.i18n'])

    /**
     * @ngdoc controller
     * @name simpleModalCtrl
     *
     * @param(object) scope of the controller
     * @param(object) modal instance from angular-bootstrap
     * @param(object) context object provided by the user
     *
     * @description
     * Horizon's controller for confirmation dialog.
     * Passes context along to the template.
     * If user presses cancel button or closes dialog, modal gets dismissed.
     * If user presses submit button, modal gets closed.
     * This controller is automatically included in modalService.
     */
    .controller('simpleModalCtrl', [ '$scope', '$modalInstance', 'context',
      function($scope, $modalInstance, context) {
        $scope.context = context;
        $scope.submit = function(){ $modalInstance.close(); };
        $scope.cancel = function(){ $modalInstance.dismiss('cancel'); };
      } // end of function
    ]) // end of controller

    /**
     * @ngdoc service
     * @name simpleModalService
     *
     * @description
     * Horizon's wrapper for angular-bootstrap modal service.
     * It should only be use for small confirmation dialogs.
     * @param {object} the object containing title, body, submit, and cancel labels
     * @param {object} the object returned from angular-bootstrap $modal
     *
     * @example:
     *  angular.controller('modalExampleCtrl', [ '$scope', 'horizon.framework.widgets.modal.service',
     *    function($scope, simpleModalService){
     *      var options = {
     *        title: 'Confirm Delete',
     *        body: 'Are you sure you want to delete this item?',
     *        submit: 'Yes',
     *        cancel: 'No',
     *      };
     *      simpleModalService(options).result.then(function(){
     *        // user clicked on submit button
     *        // do something useful here
     *      });
     *    }
     *  ]);
     */
    .factory('horizon.framework.widgets.modal.service', [
      '$modal',
      'horizon.framework.widgets.basePath',
      'horizon.framework.util.i18n.gettext',
      function($modal, path, gettext) {
        return function(params) {
          if (params && params.title && params.body){
            var options = {
              controller: 'simpleModalCtrl',
              templateUrl: path + 'modal/simple-modal.html',
              resolve: {
                context: function() {
                  return {
                    title: params.title,
                    body: params.body,
                    submit: params.submit || gettext('Submit'),
                    cancel: params.cancel || gettext('Cancel')
                  };
                }
              }
            };
            return $modal.open(options);
          }
        }; // end of return
      } // end of function
    ]); // end of factory

})();
