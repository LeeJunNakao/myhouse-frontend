import { Attribute } from '@/protocols/composition';

interface Data {
    [key: string]: Attribute | null
}

interface Config {
  required?: boolean,
  type?: string,
  callback?: () => string,
}

interface AttributesConfig {
  [key: string]: Config
}

interface FieldsTypes {
  email: string[],
  password: string[],
}

class FormValidator {
    private fields: Data;

    private config: AttributesConfig | null = null;

    private requiredFields: string[] = [];

    private fieldsTypes: FieldsTypes = { email: [], password: [] }

    public errors: Attribute;

    public fieldsKeys: string[];

    constructor(fields: Data, errors: Attribute, config: AttributesConfig | null = null) {
      this.fields = fields;
      this.fieldsKeys = Object.keys(this.fields);
      this.errors = errors;
      this.applyConfig(config);
    }

    private applyConfig(config: AttributesConfig | null): void {
      this.config = config;
      this.setRequiredFields();
    }

    private setRequiredFields(): void {
      const notRequiredFileds = this.fieldsKeys.filter((field) => {
        if (this.config && this.config[field]) return this.config[field].required === false;
        return false;
      });
      this.requiredFields = this.fieldsKeys.filter((field) => !notRequiredFileds.includes(field));
      this.groupFieldsByType();
    }

    private groupFieldsByType(): void {
      if (this.config) {
        const fields = Object.keys(this.config);
        this.fieldsTypes.email = this.filterByType(fields, 'email');
        this.fieldsTypes.password = this.filterByType(fields, 'password');
      }
    }

    private filterByType(source: string[], type: string): string[] {
      return source.filter((field) => this.config && this.config[field].type === type);
    }

    private validateRequiredFields(): void {
      this.requiredFields.forEach((key) => {
        const field = this.fields[key];
        if (field && !field.value) {
          this.errors.value[key] = 'Campo obrigatório.';
        } else {
          this.errors.value[key] = null;
        }
      });
    }

    private validateEmail(key: string): void {
      const field = this.fields[key];
      if (field) {
        const regex = new RegExp(/\S+@\S+\.\S+/);
        const match = field.value.match(regex);
        if (!match) this.errors.value[key] = 'Deve ser um email válido';
      }
    }

    private validatePassword(key: string): void {
      const field = this.fields[key];
      if (field) {
        const regex = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#_*$%]).{6,20})/);
        const match = field.value.match(regex);
        if (!match) this.errors.value[key] = 'A senha deve ter entre 6 a 20 caracteres e conter pelo menos uma letra maiúscula, uma minúscula, um numeral e caracter especial: @ # $ % _ *';
      }
    }

    private validateTypes(): void {
      this.fieldsTypes.email.forEach((key) => {
        this.validateEmail(key);
      });
      this.fieldsTypes.password.forEach((key) => {
        this.validatePassword(key);
      });
    }

    private validateCallbacks(): void {
      const filterFields = (key: string): boolean => {
        if (this.config && this.config[key] && this.config[key].callback) return true;
        return false;
      };
      const fields = this.fieldsKeys.filter(filterFields);
      fields.forEach((field) => {
        const callback = this.config && this.config[field] && this.config[field].callback;
        if (callback) {
          const messageError = callback();
          if (messageError) this.errors.value[field] = messageError;
        }
      });
    }

    validate(): boolean {
      this.validateRequiredFields();
      this.validateTypes();
      this.validateCallbacks();
      return this.fieldsKeys.some((field) => this.errors.value[field]);
    }
}

export default FormValidator;
