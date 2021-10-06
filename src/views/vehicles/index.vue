<template>
  <div>
    {{ vehicles }}
  </div>
</template>

<script>
// import List from "@/components/List";
import { mapGetters } from "vuex";
export default {
  name: "index",
  components: {
    // List
  },
  computed: {
    ...mapGetters({
      vehicles: "Vehicles/all",
    }),
  },
  mounted() {
    this.$store.dispatch("Vehicles/all");
  },
};
</script>

<style scoped></style>
