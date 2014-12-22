(function () {

  'use strict';

  module.exports = function () {

    var helper = this;
    var assert = require('assert');

    helper.Given(/^the "([^"]*)" method returns "([^"]*)"$/, function (methodName, expectedResult, callback) {
      // Write code here that turns the phrase above into concrete actions
      var output = Meteor.call(methodName)
      assert.equal(output, expectedResult)
      callback();
    });

    helper.When(/^I http get request to "([^"]*)"$/, function (route, callback) {
      // Write code here that turns the phrase above into concrete actions
      var resterRoute = helper.world.cucumber.mirror.rootUrl + route;
      helper.output = HTTP.get(resterRoute);
      helper.world.browser.
        url(resterRoute).
        call(callback);
    });

    helper.Then(/^I should get back "([^"]*)"$/, function (expectedResult, callback) {
      var parsedResult = JSON.parse(helper.output.content)
      assert.equal(parsedResult.return, expectedResult);
      callback();
      // Write code here that turns the phrase above into concrete actions
      // helper.world.browser.
      //   source(function (error, source) {
      //     assert.equal(source, expectedResult);
      //     callback();
      //   });
    });

  };

})();
