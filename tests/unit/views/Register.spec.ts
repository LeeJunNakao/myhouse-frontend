import { nextTick } from 'vue';
import flushPromises from 'flush-promises';
import { mount } from '@vue/test-utils';
import RegisterView from '@/views/Auth/Register.vue';
import store from '@/store';
import errorMessages from '@/functions/validators/form-validator/error-messages';
import * as authService from '@/services/auth';

class ResponseError extends Error {
    response: { data: { message: string }};

    constructor(message: string) {
      super();
      this.response = {
        data: {
          message,
        },
      };
    }
}
describe('Login', () => {
  it('render the component', () => {
    const wrapper = mount(RegisterView, {
      global: {
        plugins: [store],
      },
    });

    const name = wrapper.get('[data-test="name"]');
    const nameInput = name.get('[data-test="input"]');
    expect(name.text()).toBe('Nome');
    expect(nameInput.text()).toBe('');

    const email = wrapper.get('[data-test="email"]');
    const emailInput = email.get('[data-test="input"]');
    expect(email.text()).toBe('Email');
    expect(emailInput.text()).toBe('');

    const password = wrapper.get('[data-test="password"]');
    const passwordInput = password.get('[data-test="input"]');
    expect(password.text()).toBe('Senha');
    expect(passwordInput.text()).toBe('');

    const repeatPassword = wrapper.get('[data-test="repeatPassword"]');
    const repeatPasswordInput = repeatPassword.get('[data-test="input"]');
    expect(repeatPassword.text()).toBe('Repita a senha');
    expect(repeatPasswordInput.text()).toBe('');
  });

  it('Shows form error when try submiting blank inputs', async () => {
    const wrapper = mount(RegisterView, {
      global: {
        plugins: [store],
      },
    });

    const { formErrors } = wrapper.vm;

    const button = wrapper.get('[data-test="button"]');
    button.trigger('click');

    expect(formErrors.name).toBe(errorMessages.required);
    expect(formErrors.email).toBe(errorMessages.email);
    expect(formErrors.password).toBe(errorMessages.password);
    expect(formErrors.repeatPassword).toBe(errorMessages.required);

    await nextTick();

    const nameError = wrapper.get('[data-test="nameError"]');
    const emailError = wrapper.get('[data-test="emailError"]');
    const passwordError = wrapper.get('[data-test="passwordError"]');
    const repeatPasswordError = wrapper.get('[data-test="repeatPasswordError"]');

    expect(nameError.text()).toBe(errorMessages.required);
    expect(emailError.text()).toBe(errorMessages.email);
    expect(passwordError.text()).toBe(errorMessages.password);
    expect(repeatPasswordError.text()).toBe(errorMessages.required);
  });

  it('Shows error if password and repeat password are not the same', async () => {
    const wrapper = mount(RegisterView, {
      global: {
        plugins: [store],
      },
    });

    const { formErrors } = wrapper.vm;

    const passwordInput = wrapper.get('[data-test="password"]').get('[data-test="input"]');
    const repeatPasswordInput = wrapper.get('[data-test="repeatPassword"]').get('[data-test="input"]');

    passwordInput.setValue('Kdsl@*4256');
    repeatPasswordInput.setValue('Kdsl@&4256');

    const button = wrapper.get('[data-test="button"]');
    button.trigger('click');

    expect(formErrors.password).toBe(null);
    expect(formErrors.repeatPassword).toBe('Deve estar igual a senha.');

    await nextTick();

    const repeatPasswordError = wrapper.get('[data-test="repeatPasswordError"]');

    expect(repeatPasswordError.text()).toBe('Deve estar igual a senha.');
  });

  it('Shows error message from http request error', async () => {
    const wrapper = mount(RegisterView, {
      global: {
        plugins: [store],
      },
    });

    jest.spyOn(authService, 'register').mockImplementationOnce(async () => new Promise((resolve, reject) => {
      throw new ResponseError('Error message');
    }));

    const nameInput = wrapper.get('[data-test="name"]').get('[data-test="input"]');
    const emailInput = wrapper.get('[data-test="email"]').get('[data-test="input"]');
    const passwordInput = wrapper.get('[data-test="password"]').get('[data-test="input"]');
    const repeatPasswordInput = wrapper.get('[data-test="repeatPassword"]').get('[data-test="input"]');
    const button = wrapper.get('[data-test="button"]');

    const { formErrors } = wrapper.vm;

    nameInput.setValue('Alguem da Silva');
    emailInput.setValue('email@email.com');
    passwordInput.setValue('Kdsl@*4256');
    repeatPasswordInput.setValue('Kdsl@*4256');
    button.trigger('click');

    await nextTick();

    const Loading = wrapper.get('[data-test="loading"]');

    expect(Loading.text()).toBe('Loading...');

    await flushPromises();

    expect(formErrors.response).toBe('Error message');

    const responseMessageError = wrapper.get('[data-test="responseError"]');
    expect(responseMessageError.text()).toBe('Error message');
  });
});
