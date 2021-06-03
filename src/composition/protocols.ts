export interface FormHandler {
  getItems: (args?: any) => any[];
  getSelectedItem: () => any;
  selectItem: (item: any) => void;
}
