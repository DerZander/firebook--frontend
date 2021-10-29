<template>
  <div id="app">
    <Navbar />
    <div class="d-flex justify-content-center p-2">
      <router-view class="w-75" />
    </div>
    <Alert />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import { doOnStartActions } from "@/store/utils";
import Alert from "@/components/Alert/Alert";

export default {
  name: "App",
  components: { Alert, Navbar },
  created() {
    if (this.isLoggedIn) {
      doOnStartActions(this.$store);
    }
  },
  watch: {
    isLoogedIn: function (val) {
      if (val) {
        doOnStartActions(this.$store);
      }
    },
  },
};
</script>

<style lang="scss">
@import "scss/variables.scss";
@import "node_modules/bootstrap/scss/bootstrap";

body {
  background-color: $background-brown;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
