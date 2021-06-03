import { State, House } from './protocols';

const mutations = {
  setHouses(state: State, houses: State['houses']): void {
    state.houses = houses;
  },
  insertHouse(state: State, house: House) {
    state.houses.push(house);
  },
  updateHouse(state: State, house: House) {
    const index = state.houses.findIndex((h) => Number(h.id) === Number(house.id));
    if (index > -1) state.houses.splice(index, 1, house);
    console.log('update House', index);
  },
  deleteHouse(state: State, houseId: number) {
    const index = state.houses.findIndex((h) => Number(h.id) === Number(houseId));
    if (index > -1) state.houses.splice(index, 1);
  },
  selectHouse(state: State, selectedHouse: State['selectedHouse']): void {
    state.selectedHouse = selectedHouse;
  },
  setFormDataName(state: State, name: State['formData']['name']): void {
    state.formData.name = name;
  },
  setFormDataResponseMessage(
    state: State,
    responseMessage: State['formData']['responseMessage'],
  ): void {
    state.formData.responseMessage = responseMessage;
  },
};

export default mutations;
