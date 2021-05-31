import { StateType, House } from './protocols';

const mutations = {
  setHouses(state: StateType, houses: StateType['houses']): void {
    state.houses = houses;
  },
  insertHouse(state: StateType, house: House) {
    state.houses.push(house);
  },
  updateHouse(state: StateType, house: House) {
    const index = state.houses.findIndex((h) => Number(h.id) === Number(house.id));
    if (index) state.houses.splice(index, 1, house);
  },
  selectHouse(state: StateType, selectedHouse: StateType['selectedHouse']): void {
    state.selectedHouse = selectedHouse;
  },
  setFormDataName(state: StateType, name: StateType['formData']['name']): void {
    state.formData.name = name;
  },
};

export default mutations;
