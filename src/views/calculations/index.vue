<template>
  <div>
    <DynamicCardComponent header="Abrechnungsübersicht">
      <div>
        Hier findest du all deine offenen, bezahlten und gesamten
        Getränkeabrechnungen
      </div>
    </DynamicCardComponent>
    {{ calculations }}
    <div class="d-flex justify-content-between">
      <BudgetCard :calc="offeneKosten" />
      <BudgetCard :calc="offeneKosten" />
      <BudgetCard :calc="offeneKosten" />
    </div>
  </div>
</template>

<script>
import DynamicCardComponent from "@/components/DynamicCardComponent";
import BudgetCard from "@/views/calculations/components/BudgetCard";
export default {
  name: "index",
  components: { BudgetCard, DynamicCardComponent },
  data() {
    return {
      offeneKosten: {
        month: "Oktober",
        value: 230,
      },
    };
  },
  computed: {
    calculations() {
      return this.$store.getters["Calculations/all"];
    },
  },
};
</script>

<style scoped></style>
