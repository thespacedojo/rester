(function () {
  'use strict';

  Meteor.startup(function () {

    var methods = Meteor.default_server.method_handlers;

    _.each(methods, function (meteorMethodCode, meteorMethodName) {

      var routePrefix = meteorMethodName.charAt(0) === '/' ? '' : '/',
          argumentsAffix = '';

      var meteorMethodParameters = _getParamNames(meteorMethodCode);
      if (meteorMethodParameters.length !== 0) {
        argumentsAffix = '/:_args';
      }

      Router.route(routePrefix + meteorMethodName + argumentsAffix, {where: 'server'})
        .get(function () {
          var incomingJson = !!argumentsAffix ? JSON.parse(this.params._args) : [],
              response = {};

          try {
            response.return = meteorMethodCode.apply(this, incomingJson);
            response.status = 'OK';
          } catch (e) {
            response.status = 'FAIL';
            response.reason = e.message;
          }

          this.response.writeHead(200, {'Content-Type': 'application/json'});
          this.response.end(JSON.stringify(response));
        });
    });
  });

  function _getParamNames (func) {
    var fnStr = func.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(/([^\s,]+)/g);
    return result === null ? [] : result;
  }

})();