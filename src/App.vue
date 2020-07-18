<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { fetchItems } from '@/store/actions';

export default Vue.extend({
  name: 'App',
  created() {
    this.$store.dispatch(fetchItems());
  }
});
</script>
