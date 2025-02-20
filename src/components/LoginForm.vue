<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="log_show_alert"
    :class="log_alert_variant"
  >
    {{ log_alert_message }}
  </div>
  <VeeForm :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login.email') }}</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login.password') }}</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'
export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required',
      },
      log_in_submission: false,
      log_show_alert: false,
      log_alert_variant: 'bg-blue-500',
      log_alert_message: 'please wait your',
    }
  },
  methods: {
    ...mapActions(useUserStore, ['auth']),

    async login(valuse) {
      this.log_in_submission = true
      this.log_show_alert = true
      this.log_alert_variant = 'bg-blue-500'
      this.log_alert_message = 'please wait your'
      try {
        await this.auth(valuse)
      } catch (e) {
        this.log_in_submission = false
        this.log_alert_variant = 'bg-red-500'
        this.log_alert_message = 'invalid email or password'
        return
      }

      this.log_alert_variant = 'bg-green-500'
      this.log_alert_message = 'login successfully'
      window.location.reload()
    },
  },
}
</script>
