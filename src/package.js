(function () {
  'use strict';

  Package.describe({
    name: 'meteorclub:rester',
    summary: 'Exposes your apps meteor methods via a REST api',
    version: '0.0.2',
    git: 'git@github.com/meteorclub/rester.git',
    debugOnly: false
  });

  Npm.depends({

  });

  Package.onUse(function (api) {
    api.use([
      'iron:router@1.0.1',
      'underscore@1.0.1'
    ], 'server');
    api.addFiles(['server.js'], 'server');
  });

  Package.onTest(function(api) {
    api.use(['tinytest', 'test-helpers', 'underscore', 'http', 'iron:router'], ['client', 'server']);
    api.use('meteorclub:rester');

    api.addFiles(['tests/method_tests.js'], ['server']);
  });

})();
