<template>
  <div class="form-group">
    <div class="mb-3">
      <label class="form-label">Monat</label>
      <select
        id="month"
        class="form-select"
        aria-label="Default select example"
        v-model="calc.month"
        v-on="months"
        :class="{ 'is-invalid': checkFilled(calc.month) }"
      >
        <option selected>Wähle einen Monat aus</option>
        <option v-for="month in months" :key="month.id" :value="month.value">
          {{ month.name }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label for="year" class="form-label">Jahr</label>
      <input
        type="number"
        class="form-control"
        id="year"
        placeholder="2021"
        v-model="calc.year"
        :class="{ 'is-invalid': checkFilled(calc.year) }"
        @change="changeMonth()"
        required
      />
    </div>
    <div class="d-flex justify-content-end">
      <button
        class="btn btn-lg btn-outline-success"
        @click="createCalculation()"
      >
        Speichern
      </button>
    </div>
  </div>
</template>

<script>
import { Alert, Calculations } from "@/models";

export default {
  name: "create_form",
  data() {
    return {
      months: {},
      calc: new Calculations(),
    };
  },
  methods: {
    checkFilled(text) {
      return !text && this.inOrder;
    },
    createCalculation() {
      this.inOrder = true;
      if (!this.calc.month || !this.calc.year) {
        console.log("wrong", this.calc);
        return;
      }
      delete this.calc.members_total;
      delete this.calc.emergencies_total;
      delete this.calc.emergencies;

      this.calc.created_at = Date.now();
      this.calc.update().then(() => {
        const alert = new Alert();
        alert.setMessage("Kalkulation erstellt.");
        alert.setType(Alert.SUCCESS);
        this.$store.dispatch("Alert/add", alert);
        this.$emit("saved");
      });
    },
    changeMonth() {
      const yearCalcs = this.$store.getters["Calculations/all"];
      const usedMonths = [];
      yearCalcs.filter((item) => {
        if (item.year === parseInt(this.calc.year)) {
          usedMonths.push(item.month);
        }
      });
      this.months = Calculations.getAllMonths();
      usedMonths.forEach((um) => {
        delete this.months[`${um}`];
      });
    },
  },
  mounted() {
    this.calc.year = new Date().getFullYear();
    this.$store.dispatch("Calculations/all");
    this.changeMonth();
  },
};
</script>
