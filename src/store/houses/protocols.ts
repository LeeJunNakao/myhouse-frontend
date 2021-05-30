interface House {
  id: number;
  name: string;
}

interface StateType {
  houses: House[];
  selectedHouse: House | null;
  formData: {
    name: string;
  };
}

export default StateType;
