import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import LoginView from "@/views/Auth/Login.vue";
import store from "@/store";
import errorMessages from "@/functions/validators/form-validator/error-messages";
import * as authService from "@/services/auth";

describe("Login", () => {
  it("render the component", () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [store]
      }
    });
    const email = wrapper.get('[data-test="email"]');
    const emailInput = email.get('[data-test="input"]');
    expect(email.text()).toBe("Email");
    expect(emailInput.text()).toBe("");

    const password = wrapper.get('[data-test="password"]');
    const passwordInput = password.get('[data-test="input"]');
    expect(password.text()).toBe("Senha");
    expect(passwordInput.text()).toBe("");
  });

  it("Shows form error when try submiting blank inputs", async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [store]
      }
    });

    const { formErrors } = wrapper.vm;

    const button = wrapper.get('[data-test="button"]');
    button.trigger("click");

    expect(formErrors.email).toBe(errorMessages.email);
    expect(formErrors.password).toBe(errorMessages.password);

    await nextTick();

    const emailError = wrapper.get('[data-test="emailError"]');
    const passwordError = wrapper.get('[data-test="passwordError"]');

    expect(emailError.text()).toBe(errorMessages.email);
    expect(passwordError.text()).toBe(errorMessages.password);
  });

  it("Shows loader while awaiting login response", async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [store]
      }
    });

    jest.spyOn(authService, "login").mockImplementationOnce(
      async () =>
        new Promise(resolve => {
          resolve({
            token: "token"
          });
        })
    );

    const email = wrapper.get('[data-test="email"]');
    const emailInput = email.get('[data-test="input"]');

    const password = wrapper.get('[data-test="password"]');
    const passwordInput = password.get('[data-test="input"]');

    await emailInput.setValue("email@email.com");
    await passwordInput.setValue("Abcdf123@_*");

    const button = wrapper.get('[data-test="button"]');
    button.trigger("click");

    await nextTick();

    const loading = wrapper.get('[data-test="loading"]');
    expect(loading.text()).toBe("Loading...");
  });
});
