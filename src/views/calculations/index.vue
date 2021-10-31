<template>
  <div>
    <DynamicCardComponent header="Abrechnungsübersicht">
      <div>
        Hier findest du all deine offenen, bezahlten und gesamten
        Getränkeabrechnungen
      </div>
    </DynamicCardComponent>
    <div class="d-flex justify-content-between">
      <BudgetCard
        :calc="calculation"
        v-for="calculation in calculations"
        :key="calculation.id"
      />
    </div>
  </div>
</template>

<script>
import DynamicCardComponent from "@/components/DynamicCardComponent";
import BudgetCard from "@/views/calculations/components/BudgetCard";
import { User } from "@/models";

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
      return this.$store.getters["CalculationMembers/byUserId"](1);
    },
    currentUser() {
      const token = this.$store.getters["Login/data"];
      if (token.userId) {
        const user = this.$store.getters["Users/byId"](token.userId);

        if (!user.id) {
          this.$store.dispatch("Users/byId", token.userId);
        }
        return user;
      }
      return new User();
    },
  },
  mounted() {
    this.$store.dispatch("CalculationMembers/all");
  },
};
</script>

<style scoped></style>
