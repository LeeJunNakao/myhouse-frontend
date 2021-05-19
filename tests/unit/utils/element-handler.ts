class ElementHandler {
  private wrapper: any;

  constructor(wrapper: any) {
    this.wrapper = wrapper;
  }

  clickButton({ inSelf } = { inSelf: false }) {
    if (inSelf) this.wrapper.trigger('button');
    else this.wrapper.get('[data-test="button"]').trigger('click');
  }
}

export { ElementHandler };
