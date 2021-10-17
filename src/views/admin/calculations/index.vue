<template>
  <div>
    <DynamicCardComponent header="Getränkeabrechnung">
      <template v-slot:headerextra>
        <button class="btn btn-success btn-sm" @click="showModal = true" on>
          Hinzufügen
        </button>
        <Modal
          header="Neue Abrechnung erstellen"
          :id="1"
          v-if="showModal"
          @close="showModal = false"
        >
          <template v-slot:default>
            <Create_form
              @saved="showModal = false"
              @close="showModal = false"
            />
          </template>
        </Modal>
      </template>
      <template v-slot:default>
        Der Gesamtbetrag der Mitglieder beträgt: {{ membersTotalValue }} €
        <div>
          <div class="progress">
            <div
              class="progress-bar bg-success"
              role="progressbar"
              :style="`width: ${
                (membersTotalOpenValue / membersTotalValue) * 100
              }%`"
              aria-valuenow="15"
              aria-valuemin="0"
              :aria-valuemax="membersTotalValue"
            >
              Bezahlt: {{ membersTotalPaidValue }} €
            </div>
            <div
              class="progress-bar bg-danger"
              role="progressbar"
              :style="`width: ${
                (membersTotalPaidValue / membersTotalValue) * 100
              }%`"
              aria-valuenow="30"
              aria-valuemin="0"
              aria-valuemax="membersTotalValue"
            >
              Noch Offen: {{ membersTotalOpenValue }} €
            </div>
          </div>
        </div>
      </template>
    </DynamicCardComponent>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="calc in calculations" :key="calc.key">
        <CalculationCards :calculation="calc" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DynamicCardComponent from "@/components/DynamicCardComponent";
import Modal from "@/components/Modal";
import Create_form from "@/views/admin/calculations/components/create_form";
import CalculationCards from "@/views/admin/calculations/components/calculationCards";

export default {
  name: "index",
  components: { CalculationCards, Create_form, Modal, DynamicCardComponent },
  data() {
    return {
      showModal: false,
      membersTotalValue: 0,
      membersTotalOpenValue: 0,
      membersTotalPaidValue: 0,
    };
  },
  computed: {
    ...mapGetters({
      calculations: "Calculations/all",
    }),
  },
  mounted() {
    this.$store.dispatch("Calculations/all");
    console.log(this.calculations);
    this.calculations.forEach((c) => {
      this.membersTotalValue += c.members_total;
      this.membersTotalOpenValue += c.members_total_open;
      this.membersTotalPaidValue += c.members_total_paid;
    });
  },
};
</script>
