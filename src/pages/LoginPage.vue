<template>
  <div class="flex flex-1 justify-center items-center">
    <div class="w-full max-w-xs">
      <form class="bg-gray-300 border rounded border-gray-600 px-8 pt-6 pb-8">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input
            class="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            v-model="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            class="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
            v-model="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            :disabled="!validated"
            class="flex-1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :class="[...(validated ? ['bg-blue-500', 'hover:bg-blue-700'] : ['bg-gray-600', 'cursor-not-allowed'])]"
            type="button"
            @click="login"
          >Sign In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { setItem } from "@/utils/Storage";

export default Vue.extend({
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    validated(): boolean {
      return this.username.length > 0 && this.password.length > 0;
    }
  },
  methods: {
    login(): void {
      setItem("SESSION", "true");
      this.$router.push({ name: "list" });
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
