<template>
  <div>
    <b-card>
      <b-list-group>
        <b-list-group-item v-for="item in $store.state.items" :key="item.id">
          <img :src="item | imageSRC" width="52px" height="52px" />
          <b-link :href="'/detail/' + item.id">{{ item.name }}</b-link>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'app-lista'
});
</script>
