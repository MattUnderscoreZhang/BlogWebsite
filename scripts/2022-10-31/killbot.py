class Killbot:
    def __init__(self):
        self._cities = []
        self._log = []

    def set_cities(self, cities: list[str]) -> None:
        self._cities = cities

    def get_cities(self) -> list[str]:
        return self._cities

    def set_city(self, index: int, name: str) -> None:
        if len(self.get_cities()) > 0:
            self._cities[index] = name
        else:
            raise ValueError('No cities in list')

    def destroy_next_cities(self, n_cities: int) -> None:
        for _ in range(n_cities):
            self.destroy_next_city()

    def destroy_next_city(self) -> None:
        def _check_is_real_city(city: str) -> bool:
            return city is not 'Detroit'

        if len(self.get_cities()) > 0:
            city = self._cities.pop(0)
            if _check_is_real_city(city):
                self._log.append('City destroyed')
            else:
                self._log.append('City does not exist')
        else:
            self._log.append('There are no cities left to destroy')

    def add_cities(self, cities: list[str]) -> None:
        self._cities.extend(cities)

    def get_log(self) -> list[str]:
        return self._log
