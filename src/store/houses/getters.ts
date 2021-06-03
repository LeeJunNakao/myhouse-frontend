import { State } from './protocols';

const getters = {
  getHouses: (state: State): State['houses'] => state.houses,
  getSelectedHouse: (state: State): State['selectedHouse'] => state.selectedHouse,
  formData: (state: State): State['formData'] => state.formData,
};

export default getters;
