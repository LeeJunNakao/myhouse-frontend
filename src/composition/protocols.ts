export interface FormHandler {
  getItems: (args?: any) => any[];
  getSelectedItem: () => any;
  selectItem: (item: any) => void;
  getFormData: () => any;
  callAction: (action: string, value: any) => void;
}
