interface ConstructorArgs {
  wrapper: any;
  elements: string[];
  children?: { parentName: string; type: string }[];
}

enum fromTypes {
  elements = 'elements',
  children = 'children',
}

interface Elements {
  [name: string]: any;
}

interface Children {
  [parentName: string]: any;
}

interface Element {
  name: string;
  content: string;
}

interface Child {
  parentName: string;
  content: string;
}

class ElementVerifier {
  private wrapper: any;

  private elements: Elements = {};

  private children: Children = {};

  constructor({ wrapper, elements, children }: ConstructorArgs) {
    this.wrapper = wrapper;
    this.getElements(elements);
    this.getChildren(children);
  }

  private getElements(elements: ConstructorArgs['elements']): void {
    elements.forEach((name) => {
      this.elements[name] = this.wrapper.get(`[data-test="${name}"]`);
    });
  }

  private getChildren(children: ConstructorArgs['children'] = []) {
    children.forEach(({ parentName, type }) => {
      this.children[parentName] = this.elements[parentName].get(`[data-test="${type}"]`);
    });
  }

  verifyElements(elements: Element[]) {
    elements.forEach(({ name, content }) => {
      expect(this.elements[name].text()).toBe(content);
    });
  }

  verifyChildrenOf(children: Child[]) {
    children.forEach(({ parentName, content }) => {
      expect(this.children[parentName].text()).toBe(content);
    });
  }
}

export { ElementVerifier };
