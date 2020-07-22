<template>
  <div v-if="item">
    <b-card :title="item.name" :img-src="item | imageSRC" img-alt="Image" img-top style="max-width: 20rem;" class="mb-2"></b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'app-detalle',
  props: {
    detailId: String
  },
  computed: {
    ...mapGetters({ item: 'currentItem' })
  },
  created() {
    if (isNaN(Number(this.detailId))) {
      this.$router.push({ name: 'error' });
    }
  }
});
</script>
