<template>
  <div>
    Beverages
    <div v-for="item in beverages" :key="item.id">
      <a>{{ item }}</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "index",
  data() {
    return {
      items: [],
    };
  },
  computed: {
    ...mapGetters({
      beverages: "Beverages/all",
    }),
  },
  mounted() {
    this.$store.dispatch("Beverages/all");
  },
};
</script>
