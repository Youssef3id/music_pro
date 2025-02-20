<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <RouterLink
        class="text-white font-bold uppercase text-2xl mr-4"
        to="/"
        exact-active-class="no-active"
        >{{ $t('header.music') }}</RouterLink
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <RouterLink class="text-white" to="/about">{{ $t('header.about') }}</RouterLink>
          <!-- Navigation Links -->
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >{{ $t('header.Login') }} / {{ $t('header.register') }}</a
            >
          </li>
          <template v-else>
            <li>
              <RouterLink class="px-2 text-white" to="/manage">{{
                $t('header.manage')
              }}</RouterLink>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="userStore.signOut">{{
                $t('header.logout')
              }}</a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <a href="#" class="px-2 text-white" @click.prevent="changeLocale">{{
              currentLocale
            }}</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
import { mapStores } from 'pinia'
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'
import { use } from 'chai'

export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useModalStore, useUserStore),
    currentLocale() {
      return this.$i18n.locale === 'ar' ? 'Arabic' : 'English'
    },
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen
      console.log(this.modalStore.isOpen)
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'ar' ? 'en' : 'ar'
    },
  },
}
</script>
