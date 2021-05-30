import StateType from './protocols';

const getters = {
  getHouses: (state: StateType): StateType['houses'] => state.houses,
  getSelectedHouse: (state: StateType): StateType['selectedHouse'] => state.selectedHouse,
  formData: (state: StateType): StateType['formData'] => state.formData,
};

export default getters;
