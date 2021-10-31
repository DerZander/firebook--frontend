<template>
  <div class="grid-container" id="app">
    <div class="Navbar" v-if="tokenData.userId">
      <Navbar />
    </div>
    <div class="Content">
      <div class="d-flex justify-content-center">
        <router-view class="w-75" />
      </div>
      <Alert />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import { doOnStartActions } from "@/store/utils";
import Alert from "@/components/Alert/Alert";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: { Alert, Navbar },
  computed: {
    ...mapGetters({
      tokenData: "Login/data",
      isLoggedIn: "Login/isLoggedIn",
    }),
  },
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
@import "scss/main.scss";

body {
  //background-color: $background-grey;
  background-image: url("./assets/pictures/hydrant.png");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3em 1.8fr;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 1em;
  grid-auto-flow: column;
  grid-template-areas:
    "Navbar"
    "Content";
}

.Content {
  grid-area: Content;
}

.Navbar {
  grid-area: Navbar;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
