<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>

      <v-btn color="grey lighten-2" outlined to="/" class="mx-2">
        Home
      </v-btn>
      <v-btn color="grey lighten-2" outlined to="/about" class="mx-2">
        About
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {
    //
  },

  data: () => ({
    //
  })
});
</script>
