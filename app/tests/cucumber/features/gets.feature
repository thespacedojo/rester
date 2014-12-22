Feature: Expose meteor methods as a rest interface

  As a meteor develop
  I want my meteor methods exposed as a rest interface
  So that others can consume my app via a non-ddp API


  Scenario: Simple http.get should pass through output of meteor method
    Given the "resterRunner" method returns "Pass"
    When I http get request to "resterRunner"
    Then I should get back "Pass"
