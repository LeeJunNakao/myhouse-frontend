// eslint-disable-next-line max-classes-per-file

interface ConstructorArgs {
  wrapper: any;
  formErrorsTitle?: string;
}

interface Errors {
  [key: string]: string;
}

class ValuesValidator {
  private fieldValue: string;

  constructor(fieldValue: string) {
    this.fieldValue = fieldValue;
  }

  toBe(value: string) {
    expect(this.fieldValue).toBe(value);
  }
}

class FormErrorVerifier {
  private wrapper: any;

  private formErrors: Errors;

  constructor({ wrapper, formErrorsTitle }: ConstructorArgs) {
    this.wrapper = wrapper;
    this.formErrors = formErrorsTitle ? wrapper.vm[formErrorsTitle] : wrapper.vm.formErrors;
  }

  expect(field: string): ValuesValidator {
    const validator = new ValuesValidator(this.formErrors[field]);
    return validator;
  }
}

export { FormErrorVerifier };
