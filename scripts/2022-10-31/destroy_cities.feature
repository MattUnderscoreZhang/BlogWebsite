Feature: Destroy Cities
    Annihilates a list of cities.
    This is a destructive feature, and requires sign off by a senior developer when used in deployment.

    Scenario: Destroy next city
        Given I have a list of cities
        When I destroy the next city
        Then I should see in the logs that a city has been destroyed

    Scenario: Destroy next city when there are no targets
        Given I have a list of 3 cities
        When I destroy 3 cities
        And I try to destroy the next city
        Then I should see in the logs "There are no cities left to destroy"

    Scenario: Destroy non-existent city
        Given I have a list of 5 cities
        And The next city in my list does not exist
        When I try to destroy the next city
        Then I should see in the logs "City does not exist"
        And I should have a list of 4 cities

    Scenario: Add cities to destroy
        Given I have a list of 5 cities
        When I add 3 new cities to the list
        Then I should have a list of 8 cities
