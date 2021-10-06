<template>
  <div>
    <CardComponent header="Kalkulationen">
      <div
        class="row row-cols-1 row-cols-md-3"
        v-for="calc in calculations"
        :key="calc.id"
      >
        <div class="col">
          <CardComponent :header="calc.getCalcName()">
            <h5 class="card-title">Übersicht</h5>
            <div class="list-group">
              <button
                type="button"
                class="list-group-item list-group-item-action"
                aria-current="true"
                data-bs-toggle="collapse"
                :data-bs-target="'#collapseEmergencies' + calc.id"
                aria-expanded="false"
                :aria-controls="'collapseEmergencies' + calc.id"
              >
                Einsätze: {{ calc.emergencies.length }}
              </button>
              <div class="collapse" :id="'collapseEmergencies' + calc.id">
                <div class="card card-body">
                  <ul class="list-group list-group-flush">
                    <li
                      class="list-group-item"
                      v-for="emerge in calc.emergencies"
                      :key="emerge.id"
                    >
                      {{ emerge.e_number }}: {{ emerge.keyword }}
                      {{ emerge.date }}
                    </li>
                  </ul>
                </div>
              </div>
              <button
                type="button"
                class="list-group-item list-group-item-action"
              >
                Übungsdienste: {{ Math.floor(Math.random() * 10) }}
              </button>
              <button
                type="button"
                class="list-group-item list-group-item-action"
                aria-current="true"
                data-bs-toggle="collapse"
                :data-bs-target="'#collapseCalculations' + calc.id"
                aria-expanded="false"
                :aria-controls="'collapseCalculations' + calc.id"
              >
                Getränkerechnung
              </button>
              <div class="collapse" :id="'collapseCalculations' + calc.id">
                <div class="card card-body">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      Kameraden: {{ calc.members_total }} €
                    </li>
                    <li class="list-group-item">
                      Einsätze: {{ calc.emergencies_total }} €
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardComponent>
        </div>
      </div>
    </CardComponent>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CardComponent from "@/components/CardComponent";

export default {
  name: "index",
  components: { CardComponent },
  computed: {
    ...mapGetters({
      calculations: "Calculations/all",
    }),
  },
  mounted() {
    this.$store.dispatch("Calculations/all");
  },
};
</script>
