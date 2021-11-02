<template>
  <div>
    <DynamicCardComponent header="Getränkeabrechnungen">
      Hier werden alle Rechnungen angezeigt
      <div class="d-flex justify-content-start">
        <select
          class="form-select me-2"
          aria-label="Default select example"
          style="width: auto"
        >
          <option selected>Alle Monate</option>
          <option
            :value="fMonth.value"
            v-for="fMonth in fMonths"
            :key="fMonth.id"
            @click="calculations()"
          >
            {{ fMonth.name }}
          </option>
        </select>
        <select
          class="form-select me-2"
          aria-label="Default select example"
          style="width: auto"
        >
          <option selected>Alle Jahre</option>
          <option
            :value="fYear"
            v-for="fYear in getYears()"
            :key="fYear.id"
            @click="calculations()"
          >
            {{ fYear }}
          </option>
        </select>
        <button
          class="btn btn-success me-2"
          :disabled="!canCreate"
          v-if="canCreate"
          @click="createCalculations"
        >
          Neu Erstellen
        </button>
      </div>
    </DynamicCardComponent>
  </div>
</template>

<script>
import DynamicCardComponent from "@/components/DynamicCardComponent";
import { CalculationsMembers } from "@/models";
export default {
  name: "index",
  components: { DynamicCardComponent },
  data() {
    return {
      fMonths: CalculationsMembers.getAllMonths(),
      fOption: null,
      canCreate: false,
    };
  },
  methods: {
    getYears() {
      let res = this.$store.getters["CalculationMembers/all"];
      let years = [new Date().getFullYear(), 1997];

      res.forEach((item) => {
        if (!years.includes(item.year)) {
          years.push(item.year);
        }
      });
      years.sort(function (a, b) {
        return b - a;
      });
      return years;
    },
    calculations() {
      return undefined;
    },
    createCalculations() {},
  },
  mounted() {
    this.$store.dispatch("CalculationMembers/all");
    // this.getUsedMonth();
  },
};
</script>
