<template>
  <DynamicCardComponent
    :header="calc.getMonthYear()"
    class="h-100 w-100"
    :centered-header="true"
  >
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <h5 class="card-title">Auflistung</h5>
        <div
          class="d-flex justify-content-between"
          v-if="calc.drink_amount > 0"
        >
          <div class="me-auto">
            {{ calc.drink_amount }} x Getränke (á
            {{ parseFloat(calc.drink_price).toFixed(2) }}€):
          </div>
          <span
            >{{ parseFloat(calc.drink_amount * calc.drink_price).toFixed(2) }} €
          </span>
        </div>
        <div
          class="d-flex justify-content-between"
          v-if="calc.coffee_amount > 0"
        >
          <div class="me-auto">
            {{ calc.coffee_amount }} x Kaffee-Pads (á
            {{ parseFloat(calc.coffee_price).toFixed(2) }}€):
          </div>
          <span
            >{{ parseFloat(calc.coffee_amount * calc.coffee_price).toFixed(2) }}
            €
          </span>
        </div>
        <div
          class="d-flex justify-content-between"
          v-if="calc.chips_amount > 0"
        >
          <div class="me-auto">
            {{ calc.chips_amount }} x Chips (á
            {{ parseFloat(calc.chips_price).toFixed(2) }}€):
          </div>
          <span
            >{{ parseFloat(calc.chips_amount * calc.chips_price).toFixed(2) }} €
          </span>
        </div>
        <div class="d-flex justify-content-between">
          <div class="me-auto">GESAMT:</div>
          <span>{{ parseFloat(getTotal()).toFixed(2) }} € </span>
        </div>
      </li>
      <li class="list-group-item">
        <h5 class="card-title">Bezahlart</h5>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            :name="'rio-' + calc.id"
            :id="'ir' + calc.id + '-1'"
            :value="1"
            v-model="calc.paid_opportunity"
            :disabled="calc.paid_date || payBlocker"
          />
          <label class="form-check-label" :for="'ir' + calc.id + '-1'"
            >Bar</label
          >
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            :name="'rio-' + calc.id"
            :id="'ir' + calc.id + '-2'"
            :value="2"
            v-model="calc.paid_opportunity"
            :disabled="calc.paid_date || payBlocker"
          />
          <label class="form-check-label" :for="'ir' + calc.id + '-2'"
            >Paypal</label
          >
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            :name="'rio-' + calc.id"
            :id="'ir' + calc.id + '-3'"
            :value="3"
            v-model="calc.paid_opportunity"
            :disabled="calc.paid_date || payBlocker || true"
          />
          <label class="form-check-label" :for="'ir' + calc.id + '-3'"
            >Lastschrift (noch nicht)</label
          >
        </div>
        <div v-if="!calc.paid_date">
          <button
            class="btn btn-outline-success btn-sm"
            @click="userPay()"
            onclick="style.display = 'none'"
          >
            Bezahlen
          </button>
        </div>
      </li>
      <li class="list-group-item" v-if="calc.paid_date || payBlocker">
        <h5 class="card-title">Status</h5>
        <div v-if="calc.paid_date">Datum: {{ getDate(calc.paid_date) }}</div>
        <div class="d-flex justify-content-between">
          <div class="me-auto">Status:</div>
          <span class="badge bg-success mb-0 lh-base" v-if="calc.approved"
            >Bezahlt</span
          >
          <span class="badge rounded-pill bg-warning lh-base" v-else
            >in Prüfung
          </span>
        </div>
      </li>
    </ul>
  </DynamicCardComponent>
</template>

<script>
import DynamicCardComponent from "@/components/DynamicCardComponent";
import { Alert } from "@/models";
import { mapGetters } from "vuex";
export default {
  name: "BudgetCard",
  components: { DynamicCardComponent },
  props: {
    calc: Object,
  },
  data() {
    return {
      payBlocker: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "Login/data",
    }),
  },
  methods: {
    getDate(dateVal) {
      console.log(dateVal);
      const date = new Date(dateVal);
      return date.toLocaleDateString();
    },
    getTotal() {
      const totalDrinks = this.calc.drink_amount * this.calc.drink_price;
      const totalCoffee = this.calc.coffee_amount * this.calc.coffee_price;
      const totalChips = this.calc.chips_amount * this.calc.chips_price;
      return totalDrinks + totalCoffee + totalChips;
    },
    userPay() {
      this.inOrder = true;
      if (!this.calc.paid_opportunity) {
        const alert = new Alert();
        alert.setMessage("Bitte wähle eine Bezahlart aus.");
        alert.setType(Alert.DANGER);
        this.$store.dispatch("Alert/add", alert);
        return;
      }
      if (this.payBlocker) {
        const alert = new Alert();
        alert.setMessage(
          "Du kannst nur einmal bezahlen. Bitte warte auf die Prüfung!"
        );
        alert.setType(Alert.WARNING);
        this.$store.dispatch("Alert/add", alert);
        return;
      }

      this.calc.update().then(() => {
        const alert = new Alert();
        alert.setMessage(
          `Deine Bezahlung vom ${this.calc.getMonthYear()} wird in kürze geprüft.`
        );
        alert.setType(Alert.SUCCESS);
        this.$store.dispatch("Alert/add", alert);
        this.$emit("saved");
        this.calc.paid_date = Date.now();
        this.payBlocker = true;
      });
    },
  },
  mounted() {
    this.$store.dispatch("CalculationMembers/byId", this.calc.id);
  },
};
</script>
