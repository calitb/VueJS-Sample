<template>
  <div class="flex flex-wrap m-4 justify-center">
    <router-link
      :to="{ name: 'detail', params: { detailId: item.id } }"
      v-for="item in $store.state.items"
      :key="item.id"
    >
      <article class="p-3 border border-blue-200 hover:border-blue-800">
        <div class="flex justify-center items-center w-20 h-20 md:w-32 md:h-32">
          <img :src="item.image" class="w-auto h-16 md:h-24" />
        </div>
        <div class="flex justify-center text-sm md:text-base">
          {{ item.name }}
        </div>
      </article>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "app-lista"
});
</script>
