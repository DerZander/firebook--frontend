<template>
  <div>
    <DynamicCardComponent header="Abrechnungsübersicht">
      <div>
        Hier findest du all deine offenen, bezahlten und gesamten
        Getränkeabrechnungen
      </div>
      <br />
      <div class="">
        <h6 class="card-title form-check-inline">Filter:</h6>
        <div
          class="form-check form-check-inline"
          v-for="filterOption in filterOptions"
          :key="filterOption.id"
        >
          <input
            class="form-check-input"
            type="radio"
            name="irFilter"
            v-model="fOption"
            :id="'ir_' + filterOption.value"
            :value="filterOption.value"
            :checked="filterOption.checked"
            @click="calculations()"
          />
          <label class="form-check-label" :for="'ir_' + filterOption.value">
            {{ filterOption.name }}
          </label>
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            v-model="sEmpty"
            id="sEmpty"
          />
          <label class="form-check-label" for="sEmpty"
            >Leere Rechnungen anzeigen</label
          >
        </div>
      </div>
    </DynamicCardComponent>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div
        class="col"
        v-for="calculation in calculations()"
        :key="calculation.id"
      >
        <BudgetCard :calc="calculation" />
      </div>
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
      filterOptions: {
        all: {
          name: "Alle",
          value: "all",
          checked: true,
        },
        open: {
          name: "Offene",
          value: "open",
          checked: false,
        },
        closed: {
          name: "Bezahlte",
          value: "closed",
          checked: false,
        },
      },
      fOption: null,
      sEmpty: false,
    };
  },
  computed: {
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
  methods: {
    calculations() {
      let res = this.$store.getters["CalculationMembers/byUserId"](
        this.$store.getters["Login/data"].memberId
      );

      //EMPTYCHECK
      if (!this.sEmpty) {
        let _res = res;
        res = _res.filter((item) => {
          if (
            item.drink_amount !== 0 ||
            item.coffee_amount !== 0 ||
            item.chips_amount !== 0
          ) {
            return item;
          }
        });
      }

      //FILTERUNG
      if (this.fOption) {
        let _res = res;
        res = _res.filter((item) => {
          if (this.fOption === this.filterOptions.all.value) {
            return item;
          } else if (this.fOption === this.filterOptions.open.value) {
            if (item.approved !== 1) {
              return item;
            }
          } else if (this.fOption === this.filterOptions.closed.value) {
            if (item.approved === 1) {
              return item;
            }
          }
        });
      }

      //SORTIERUNG
      let _res = res;
      res = _res.sort(function (a, b) {
        return b.month - a.month;
      });
      return res.sort(function (a, b) {
        return b.year - a.year;
      });
    },
  },
  mounted() {
    this.$store.dispatch("CalculationMembers/all");
    this.fOption = this.filterOptions.all.value;
  },
};
</script>

<style scoped></style>
