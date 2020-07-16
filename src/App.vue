<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import getItems from '@/api/getItems';

export default Vue.extend({
  name: 'App',
  methods: {
    loadItems() {
      getItems((error, data) => {
        if (!error) {
          this.$root.$data.items = data;
        }
      });
    }
  },
  created() {
    this.loadItems();
  }
});
</script>
