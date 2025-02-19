<template>
  <AppHeader />
  <RouterView />
  <auth></auth>
</template>

<script>
import { mapWritableState } from 'pinia'
import useUserStore from '@/stores/user'
import AppHeader from '@/components/AppHeader.vue'
import Auth from '@/components/Auth.vue'
import { getAuth } from 'firebase/auth'

export default {
  name: 'App',
  components: {
    AppHeader,
    Auth,
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn']),
  },

  created() {
    const aauth = getAuth()
    if (aauth.currentUser) {
      this.userLoggedIn = true
    }
  },
}
</script>
