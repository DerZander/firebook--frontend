<template>
  <DynamicCardComponent :header="`Abrechnung Mitglieder für: `">
    Hi{{ calculation }}
  </DynamicCardComponent>
</template>

<script>
import DynamicCardComponent from "@/components/DynamicCardComponent";
import { mapGetters } from "vuex";
export default {
  name: "list",
  components: { DynamicCardComponent },
  computed: {
    ...mapGetters({
      // calculation: this.$store.getters["Calculations/byId"](1),
    }),
  },
  mounted() {
    // console.log(this.params.id);
  },
};
</script>

<style scoped></style>
