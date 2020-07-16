<template>
  <div v-if="item">
    <b-card
      :title="item.name"
      :img-src="item | imageSRC"
      img-alt="Image"
      img-top
      style="max-width: 20rem;"
      class="mb-2"
    ></b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Item } from '@/items';

export default Vue.extend({
  name: 'app-detalle',
  props: {
    detailId: String
  },
  computed: {
    item(): Item | undefined {
      return this.$root.$data.items.find((item: Item) => parseInt(item.id, 10) === parseInt(this.detailId, 10));
    }
  },
  created() {
    if (isNaN(Number(this.detailId))) {
      this.$router.push({ name: 'error' });
    }
  }
});
</script>
