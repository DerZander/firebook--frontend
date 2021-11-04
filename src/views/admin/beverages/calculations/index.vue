<template>
  <div>
    <DynamicCardComponent header="Getränkeabrechnungen">
      Hier werden alle Rechnungen angezeigt
      <div class="d-flex justify-content-between">
        <div class="row row-cols-lg-auto g-3 align-items-center">
          <select class="form-select me-2" style="width: auto" v-model="fYear">
            <option selected>{{ fDefaults.year }}</option>
            <option
              :value="fYear"
              v-for="fYear in getYears()"
              :key="fYear.id"
              @click="calculations()"
            >
              {{ fYear }}
            </option>
          </select>
          <select class="form-select me-2" style="width: auto" v-model="fMonth">
            <option selected>{{ fDefaults.month }}</option>
            <option
              :value="fMonth.value"
              v-for="fMonth in fMonths"
              :key="fMonth.id"
              @click="calculations()"
            >
              {{ fMonth.name }}
            </option>
          </select>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              v-model="fOpen"
              id="fsOpen"
            />
            <label class="form-check-label" for="fsOpen"
              >Nur Offene anzeigen</label
            >
          </div>
        </div>
        <div class="">
          <button
            class="btn btn-success me-2 align-middle"
            :disabled="!canCreate"
            v-if="canCreate"
            @click="createCalculations"
          >
            Neu Erstellen
          </button>
        </div>
      </div>
    </DynamicCardComponent>
    <DynamicCardComponent header="Abrechnungsliste">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Jahr | Monat</th>
            <th scope="col">Nutzer</th>
            <th scope="col">Bezahlart</th>

            <th scope="col">Eröffnet | Geschlossen</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <!--          <tr :v-for="calculation in calculations()" :key="calculation.id">-->
          <tr v-for="calculation in calculations()" :key="calculation.id">
            <td>{{ calculation.year }} | {{ calculation.month_name }}</td>
            <td>{{ calculation.member.fullname }}</td>
            <td>
              <div v-if="calculation.paid_opportunity === 2">Paypal</div>
              <div v-if="calculation.paid_opportunity === 1">Bar</div>
              <div v-if="calculation.paid_opportunity === 0" class="text-red">
                noch Offen
              </div>
            </td>

            <td>
              <div v-if="calculation.open_at">
                {{ calculation.open_at | date }} |
                {{ calculation.closed_at | date }}
              </div>
            </td>
            <td class="d-flex justify-content-evenly">
              <button class="btn btn-outline-warning btn-sm">
                <i class="far fa-edit"></i>
              </button>
              <button
                class="btn btn-outline-success btn-sm"
                title="Als bezahlt makieren"
                v-if="calculation.open_at && calculation.paid_opportunity > 0"
              >
                <i class="far fa-paper-plane"></i>
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                title="Direkt abschließen"
                v-if="!calculation.open_at"
              >
                <i class="far fa-paper-plane"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </DynamicCardComponent>
  </div>
</template>

<script>
import DynamicCardComponent from "@/components/DynamicCardComponent";
import { Alert } from "@/models";
import { CalculationsMembers } from "@/models";

export default {
  name: "index",
  components: { DynamicCardComponent },
  data() {
    return {
      fMonths: CalculationsMembers.getAllMonths(),
      fDefaults: { month: "Alle Monate", year: "Alle Jahre" },
      fMonth: null,
      fYear: null,
      fOpen: false,
      canCreate: false,
    };
  },
  methods: {
    getYears() {
      let res = this.$store.getters["CalculationMembers/all"];
      let years = [new Date().getFullYear()];

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
      let res = this.$store.getters["CalculationMembers/all"];

      //Open
      if (this.fOpen) {
        let _res = res;
        res = _res.filter((item) => item.paid_opportunity === 0);
      }

      //Year filter
      if (this.fYear >= 0) {
        let _res = res;
        res = _res.filter((item) => item.year === this.fYear);
      }
      //Month Filter
      if (this.fMonth >= 0) {
        let _res = res;
        res = _res.filter((item) => item.month === this.fMonth);
      }

      res.forEach((item) => {
        item.member = this.$store.getters["Members/byId"](item.member_id);
        item.member.fullname = `${item.member.last_name}, ${item.member.first_name}`;
        item.month_name = CalculationsMembers.getMonthName(item.month);
      });

      if (res.length === 0) {
        this.canCreate = true;
      } else {
        this.canCreate = false;
      }

      return res;
    },
    createCalculations() {
      this.inOrder = true;
      if (this.fYear === this.fDefaults.year) {
        const alert = new Alert();
        alert.setMessage("Bitte wähle ein genaues Jahr aus!");
        alert.setType(Alert.WARNING);
        this.$store.dispatch("Alert/add", alert);
        return;
      }
      if (this.fMonth === this.fDefaults.month) {
        const alert = new Alert();
        alert.setMessage("Bitte wähle ein genauen Monat aus!");
        alert.setType(Alert.WARNING);
        this.$store.dispatch("Alert/add", alert);
        return;
      }
      let members = this.$store.getters["Members/all"];
      members.forEach((m) => {
        this.$store
          .dispatch("CalculationMembers/createCalculations", {
            month: this.fMonth,
            year: this.fYear,
            member_id: m.id,
          })
          .then(() => {
            const alert = new Alert();
            alert.setMessage(
              `Neue Getränkerechnungen für ${CalculationsMembers.getMonthName(
                this.fMonth
              )} | ${this.fYear} wurden erstellt.`
            );
            alert.setType(Alert.SUCCESS);
            this.$store.dispatch("Alert/add", alert);
            this.$emit("saved");
            this.$store.dispatch("CalculationMembers/all");
            this.calculations();
          });
      });
    },
  },
  mounted() {
    this.$store.dispatch("CalculationMembers/all");
    this.$store.dispatch("Members/all");
    this.fMonth = this.fDefaults.month;
    this.fYear = this.fDefaults.year;

    // this.getUsedMonth();
  },
};
</script>
