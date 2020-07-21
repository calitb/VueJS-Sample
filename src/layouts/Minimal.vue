<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">VueJS Tutorial</b-navbar-brand>
      <b-navbar-toggle v-if="authenticated()" target="nav-collapse"></b-navbar-toggle>
      <b-collapse v-if="authenticated()" id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-button variant="outline-light" @click="logout">Sign Out</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { getItem, removeItem } from '@/utils/Storage';

export default Vue.extend({
  name: 'app-layout-minimal',
  methods: {
    logout(): void {
      removeItem('SESSION');
      this.$router.push({ name: 'login' });
    },
    authenticated(): boolean {
      return getItem('SESSION') !== null;
    }
  }
});
</script>
