(function () {
  'use strict';

  Package.describe({
    name: 'meteorclub:rester',
    summary: 'Exposes your apps meteor methods via a REST api',
    version: '0.0.1',
    git: 'git@github.com/meteorclub/rester.git',
    debugOnly: false
  });

  Npm.depends({});

  Package.onUse(function (api) {
    api.use([
      'iron:router',
      'underscore'
    ], 'server');
    api.addFiles(['server.js'], 'server');
  });

})();