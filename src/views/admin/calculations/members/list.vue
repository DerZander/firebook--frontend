<template>
  <DynamicCardComponent
    :header="`Abrechnung Mitglieder für: ${calculation.getCalcName()}`"
  >
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
    ...mapGetters({}),
    calculation() {
      return this.$store.getters["Calculations/byId"](this.$route.params.id);
    },
    calculation_member() {
      const res = this.$store.getters["Calculation/all"];
      return res.filter();
    },
  },
  mounted() {
    console.log(
      this.$store.getters["Calculations/byId"](this.$route.params.id)
    );
    this.$store.dispatch("Calculations/byId", this.$route.params.id);
  },
};
</script>

<style scoped></style>
