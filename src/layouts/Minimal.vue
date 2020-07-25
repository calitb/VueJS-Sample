<template>
  <div class="flex flex-col">
    <nav class="flex flex-wrap bg-gray-800 items-center py-3 px-4">
      <router-link
        tag="span"
        class="flex items-center py-2 no-underline cursor-pointer text-xl text-white font-bold"
        :to="{ name: 'list' }"
        >VueJS Tutorial</router-link
      >
      <button
        v-if="authenticated()"
        @click="toggle"
        class="material-icons p-2 mr-2 md:hidden ml-auto border rounded border-white text-white hover:text-black hover:bg-gray-200 focus:outline-none"
      >
        menu
      </button>
      <div
        id="menu"
        v-if="authenticated()"
        class="w-full md:inline-flex md:flex-grow md:w-auto pt-4 md:pt-0"
        :class="[...(!opened ? ['hidden'] : [])]"
      >
        <button
          class="p-2 w-full text-left md:ml-auto md:w-auto md:h-auto text-white rounded md:border md:border-white hover:border-transparent hover:text-black hover:bg-gray-200 cursor-pointer"
          @click="logout"
        >
          Sign out
        </button>
      </div>
    </nav>
    <div class="flex flex-1">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { getItem, removeItem } from "@/utils/Storage";

export default Vue.extend({
  name: "app-layout-minimal",
  data() {
    return {
      opened: false
    };
  },
  methods: {
    toggle() {
      this.opened = !this.opened;
    },
    logout(): void {
      removeItem("SESSION");
      this.$router.push({ name: "login" });
    },
    authenticated(): boolean {
      return getItem("SESSION") !== null;
    }
  }
});
</script>
