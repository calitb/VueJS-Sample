<template>
  <article v-if="item" class="p-3">
    <div class="flex justify-center items-center">
      <img :src="item.image" class="w-auto h-64" />
    </div>
    <div class="flex justify-center text-xl">
      <p>{{ item.name }}</p>
    </div>
  </article>
  <div v-else>NO EXISTE</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'app-detalle',
  computed: {
    ...mapGetters({ item: 'currentItem' })
  }
});
</script>
