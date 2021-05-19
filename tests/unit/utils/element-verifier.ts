interface ConstructorArgs {
  wrapper: any;
  elements: string[];
  children: string[];
}

enum fromTypes {
  elements = 'elements',
  children = 'children',
}
interface FromArgs {
  type: fromTypes;
  expectAttribute: string;
  toBeValues: String[];
}

class ElementVerifier {
  private wrapper: any;
  private elements: any[] = [];
  private children: any[] = [];

  constructor({ wrapper, elements, children }: ConstructorArgs) {
    this.wrapper = wrapper;
    this.getElements(elements);
    this.getChildren(children);
  }

  private getElements(elements: ConstructorArgs['elements']): void {
    elements.forEach((e) => {
      this.elements.push(this.wrapper.get(`[data-test="${e}"]`));
    });
  }

  private getChildren(children: ConstructorArgs['children']) {
    children.forEach((c, index) => {
      this.children[index] = this.elements[index].get(`[data-test="${c}"]`);
    });
  }

  private verifyFrom(
    type: FromArgs['type'],
    expectAttribute: FromArgs['expectAttribute'],
    toBeValues: FromArgs['toBeValues'],
  ): void {
    toBeValues.forEach((value, index) => {
      expect(this[type][index][expectAttribute]()).toBe(value);
    });
  }

  fromElements(expectAttribute: FromArgs['expectAttribute'], toBeValues: FromArgs['toBeValues']) {
    this.verifyFrom(fromTypes.elements, expectAttribute, toBeValues);
  }

  fromChildren(
    expectAttribute: FromArgs['expectAttribute'],
    toBeValues: FromArgs['toBeValues'],
  ): void {
    this.verifyFrom(fromTypes.children, expectAttribute, toBeValues);
  }
}

export { ElementVerifier };
