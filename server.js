(function () {
  'use strict';

  var methods = Meteor.default_server.method_handlers;

  //Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({
  //  extended: false
  //}));

  Meteor.startup(function () {

    _.each(methods, function (meteorMethodCode, meteorMethodName) {

      var routePrefix = meteorMethodName.charAt(0) === '/' ? '' : '/',
          argumentsAffix = '';

      var meteorMethodParameters = _getParamNames(meteorMethodCode);
      if (meteorMethodParameters.length !== 0) {
        argumentsAffix = '/:_args';
      }

      Router.route(routePrefix + meteorMethodName + argumentsAffix, {where: 'server'})
        .get(function () {
          var incomingJson = !!argumentsAffix ? JSON.parse(this.params._args) : [];
          var codeReturn = meteorMethodCode.apply(this, incomingJson);
          var response = {};
          this.response.writeHead(200, {'Content-Type': 'application/json'});
          response.return = codeReturn;
          response.status = 'OK';
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