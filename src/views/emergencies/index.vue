<template>
  <div>
    Hallo
    {{ emergencies }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "index",
  computed: {
    ...mapGetters({
      emergencies: "Emergencies/all",
    }),
  },
  mounted() {
    this.$store.dispatch("Emergencies/all");
  },
};
</script>
