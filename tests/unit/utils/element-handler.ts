class DomHandler {
  private wrapper: any;

  constructor(wrapper: any) {
    this.wrapper = wrapper;
  }

  clickButton({ inSelf } = { inSelf: false }) {
    if (inSelf) this.wrapper.trigger('button');
    else this.wrapper.get('[data-test="button"]').trigger('click');
  }

  setValueInto(element: string, value: string) {
    this.wrapper.get(`[data-test="${element}"]`).get('[data-test="input"]').setValue(value);
  }
}

export { DomHandler };
