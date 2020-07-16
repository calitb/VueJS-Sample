<template>
  <div class="container">
    <b-form>
      <b-row>
        <b-col>Username</b-col>
        <b-col> <b-form-input v-model="username" /> </b-col>
      </b-row>

      <b-row>
        <b-col>Password</b-col>
        <b-col> <b-form-input type="password" v-model="password" /> </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-button block variant="primary" :disabled="!validated" @click="login">Login</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { setItem } from '@/utils/Storage';

export default Vue.extend({
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  computed: {
    validated(): boolean {
      return this.username.length > 0 && this.password.length > 0;
    }
  },
  methods: {
    login(): void {
      setItem('SESSION', 'true');
      this.$router.push({ name: 'list' });
    }
  }
});
</script>

<style scoped>
.container {
  margin: 10px;
  padding: 5px;
  border: 1px solid black;
}
</style>
