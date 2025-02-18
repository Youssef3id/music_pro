import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
} from '@vee-validate/rules'
export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    // defineRule('numeric', numeric)
    defineRule('min_value', minValue)
    defineRule('max_value', maxValue)
    defineRule('confirmed', confirmed)

    configure({
      generateMessage: (context) => {
        const field = context.field // Field name (e.g., 'name', 'email')
        const rule = context.rule?.name // Rule name (e.g., 'required', 'email')

        // Custom messages for each field and rule
        const customMessages = {
          name: {
            required: 'Name is required',
            alpha_spaces: 'Name can only contain letters and spaces',
          },
          email: {
            required: 'Email is required',
            email: 'Please enter a valid email address',
          },
          age: {
            required: 'Age is required',
            min_value: 'You must be at least 18 years old',
            max_value: 'You must be less than 100 years old',
          },
          password: {
            required: 'Password is required',
            min: 'Password must be at least 8 characters long',
          },
          confirm_password: {
            required: 'Confirm Password is required',
            confirmed: 'Passwords do not match',
          },
          country: {
            required: 'Country is required',
          },
          tos: {
            required: 'You must accept the terms of service',
          },
        }

        // Return the custom message for the field and rule
        return customMessages[field]?.[rule] || `Validation error for ${field}`
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    })
  },
}
