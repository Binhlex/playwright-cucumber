@JREQ-LP-1
Feature: Implement login feature
    Background: Go to login page
        Given User navigates to the application
        And User click on the login link

    @LP-TC-3
    Scenario: Login should be success with valid username and password
        When User enter the username as "binhle"
        And User enter the password as "Pass@123"
        And User click on the login button
        Then The Username should be displayed in homepage

    Scenario: Login error if user inputs invalid password
        When User enter the username as "binhle"
        And User enter the password as "binhle"
        And User click on the login button
        Then Error message should be displayed