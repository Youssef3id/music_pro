<template>
  <!-- Auth Modal -->
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal" :class="hiddenClass">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click="isOpen = false">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4"
                :class="{
                  'transition hover:text-white text-white bg-blue-600': activeTab === 'login',
                  'hover:text-blue-600': activeTab !== 'register',
                }"
                href="#"
                @click="activeTab = 'login'"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                href="#"
                @click="activeTab = 'register'"
                :class="{
                  'transition hover:text-white text-white bg-blue-600': activeTab === 'register',
                  'hover:text-blue-600': activeTab === 'login',
                }"
                >Register</a
              >
            </li>
          </ul>

          <!-- Login Form -->
          <AppLoginForm v-if="activeTab === 'login'" />
          <!-- Registration Form -->
          <AppRegisterForm v-else />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useModalStore from '@/stores/modal'
import { mapState, mapWritableState } from 'pinia'
import { ErrorMessage } from 'vee-validate'
import AppLoginForm from '@/components/LoginForm.vue'
import AppRegisterForm from '@/components/RegisterForm.vue'
// import { E } from 'vitest/dist/chunks/reporters.6vxQttCV'
// import { errorMessages } from 'vue/compiler-sfc'

export default {
  name: 'Auth',
  data() {
    return {
      activeTab: 'login',
    }
  },
  components: {
    AppLoginForm,
    AppRegisterForm,
  },
  computed: {
    ...mapState(useModalStore, ['hiddenClass']),
    ...mapWritableState(useModalStore, ['isOpen']),
  },
}
</script>
