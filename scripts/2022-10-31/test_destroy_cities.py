import pytest
from pytest_bdd import scenario, given, when, then, parsers

from killbot import Killbot


@pytest.fixture
def killbot():
    return Killbot()


@scenario('destroy_cities.feature', 'Destroy next city')
def test_destroy_cities():
    # Then conditions cover all effects, so we need no other tests
    pass


@scenario('destroy_cities.feature', 'Destroy next city when there are no targets')
def test_destroy_cities_no_targets():
    # Then conditions cover all effects, so we need no other tests
    pass


@scenario('destroy_cities.feature', 'Destroy non-existent city')
def test_destroy_cities_non_existent_city():
    # Then conditions cover all effects, so we need no other tests
    pass


@scenario('destroy_cities.feature', 'Add cities to destroy')
def test_add_cities():
    # Then conditions cover all effects, so we need no other tests
    pass


@given(
    'I have a list of cities',
    target_fixture='killbot',
)
def set_cities() -> Killbot:
    default_n_cities = 3
    return set_n_cities(default_n_cities)


@given(
    # regex with number followed by optional space
    parsers.re('I have a list of (?P<n_cities>\\d+) cities'),
    converters={'n_cities': int},
    target_fixture='killbot',
)
def set_n_cities(n_cities: int) -> Killbot:
    killbot = Killbot()
    cities = ['London', 'Paris', 'Berlin', 'Rome', 'Madrid', 'Moscow', 'Tokyo', 'Beijing', 'New York', 'Los Angeles']
    killbot.set_cities(cities[:n_cities])
    return killbot


@given('The next city in my list does not exist')
def set_nonexistent_next_city(killbot: Killbot) -> None:
    # replacing target with the imaginary city of Detroit
    killbot.set_city(0, 'Detroit')


@when(parsers.parse('I destroy {n_cities:d} cities'))
def destroy_n_cities(killbot: Killbot, n_cities: int) -> None:
    killbot.destroy_next_cities(n_cities)


@when('I destroy the next city')
@when('I try to destroy the next city')
def destroy_next_city(killbot: Killbot) -> None:
    killbot.destroy_next_city()


@when(parsers.parse('I add {n_cities:d} new cities to the list'))
def add_cities(killbot: Killbot, n_cities: int) -> None:
    cities = ['Shenzhen', 'Lagos', 'Warsaw', 'Buenos Aires', 'Cairo', 'Bogota', 'Lima', 'Belo Horizonte', 'Tehran', 'Kinshasa']
    killbot.add_cities(cities[:n_cities])


@then('I should see in the logs that a city has been destroyed')
def check_log_for_destruction(killbot: Killbot) -> None:
    assert killbot.get_log()[-1] == 'City destroyed'


@then(parsers.parse('I should see in the logs "{log_message}"'))
def check_log_for_string(killbot: Killbot, log_message: str) -> None:
    assert killbot.get_log()[-1] == log_message


@then(parsers.parse('I should have a list of {n_cities:d} cities'))
def check_n_cities(killbot: Killbot, n_cities: int) -> None:
    assert len(killbot.get_cities()) == n_cities
