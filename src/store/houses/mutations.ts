import StateType from './protocols';

const mutations = {
  setHouses(state: StateType, houses: StateType['houses']): void {
    state.houses = houses;
  },
  selectHouse(state: StateType, selectedHouse: StateType['selectedHouse']): void {
    state.selectedHouse = selectedHouse;
  },
  setFormDataName(state: StateType, name: StateType['formData']['name']): void {
    state.formData.name = name;
  },
};

export default mutations;
