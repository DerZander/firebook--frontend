<template>
  <div>
    Einsätze
    <div v-for="item in emergencies" :key="item.id">
      <a>{{ item }}</a>
    </div>
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
