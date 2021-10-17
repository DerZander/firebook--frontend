<template>
  <DynamicCardComponent
    :header="calculation.getCalcName()"
    :cardList="true"
    :cardFooter="true"
  >
    <template v-slot:card-extra>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <h5 class="card-title">Mitglieder</h5>
          <div class="d-flex justify-content-between">
            <div class="me-auto">Noch offen:</div>
            <span>{{ calculation.members_total_open }} €</span>
          </div>
          <div class="d-flex justify-content-between">
            <div class="me-auto">Bereits bezahlt:</div>
            <span>{{ calculation.members_total_paid }} €</span>
          </div>
          <div class="d-flex justify-content-between">
            <div class="me-auto">Gesamt:</div>
            <span>{{ calculation.members_total }} €</span>
          </div>
        </li>
        <li class="list-group-item">
          <h5 class="card-title">Einsätze</h5>
          <!--          <div class="d-flex justify-content-between">-->
          <!--            <div class="me-auto">Noch offen:</div>-->
          <!--            <span>{{ calculation.emergencies_total }} €</span>-->
          <!--          </div>-->
          <div class="d-flex justify-content-between">
            <div class="me-auto">Einsätze:</div>
            <span>{{ calculation.emergencies.length }}</span>
          </div>
          <div class="d-flex justify-content-between">
            <div class="me-auto">Bezahlt am:</div>
            <span
              >{{ new Date().getDate() }}.{{ new Date().getUTCMonth() }}</span
            >
          </div>
          <div class="d-flex justify-content-between">
            <div class="me-auto">Gesamtbetrag:</div>
            <span>{{ calculation.emergencies_total }} €</span>
          </div>
        </li>
        <li class="list-group-item">
          <div class="d-flex justify-content-between">
            <div class="me-auto">Gesamtbetrag:</div>
            <span
              >{{
                calculation.members_total + calculation.emergencies_total
              }}
              €</span
            >
          </div>
        </li>
      </ul>
    </template>
    <template v-slot:footer>
      <div class="d-flex justify-content-between">
        <router-link
          :to="{
            name: 'CalculationsMemberList',
            params: { id: calculation.id },
          }"
        >
          h
        </router-link>
        <button class="btn btn-sm btn btn-outline-secondary">
          <i class="fas fa-eye"></i>
          Mitglieder
        </button>
        <button class="btn btn-sm btn btn-outline-secondary">
          <i class="fas fa-eye"></i>
          Einsätze
        </button>
      </div>
    </template>
  </DynamicCardComponent>
</template>

<script>
import DynamicCardComponent from "@/components/DynamicCardComponent";

export default {
  name: "calculationCards",
  components: {
    DynamicCardComponent,
  },
  data() {
    return {
      open_value: 0,
      paid_value: 0,
    };
  },
  props: {
    calculation: Object,
  },
  mounted() {
    this.calculation.members.forEach((cm) => {
      if (cm.paid_date) {
        this.paid_value += cm.total;
      } else {
        this.open_value += cm.total;
      }
    });
  },
};
</script>
