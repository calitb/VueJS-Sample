<template>
  <div class="flex flex-wrap m-4">
    <article class="p-3 border border-blue-200" v-for="item in $store.state.items" :key="item.id">
      <div class="flex justify-center items-center w-32 h-32">
        <img :src="item | imageSRC" class="w-auto h-24" />
      </div>
      <div class="flex justify-center">
        <router-link :to="{ name: 'detail', params: { detailId: item.id } }">{{ item.name }}</router-link>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "app-lista"
});
</script>
