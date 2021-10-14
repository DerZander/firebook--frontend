<template>
  <div>
    <DynamicCardComponent header="Einsätze">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="emergency in emergencies" :key="emergency.id">
          <div class="card">
            <div class="card-header text-center pb-0">
              <h5 class="pb-0">
                {{ emergency.e_number }}
              </h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                Einsatzstichwort: {{ emergency.keyword }}
              </li>
              <li
                class="list-group-item text-left"
                aria-current="true"
                data-bs-toggle="collapse"
                :data-bs-target="'#collapseemergency' + emergency.id"
                aria-expanded="false"
                :aria-controls="'collapseemergency' + emergency.id"
                v-if="emergency.vehicles.length > 0"
              >
                <div class="d-flex justify-content-between">
                  <div>Fahrzeuge im Einsatz:</div>
                  <div>Anzahl: {{ emergency.vehicles.length }}</div>
                </div>
                <div class="collapse" :id="'collapseemergency' + emergency.id">
                  <ul class="list-group list-group-flush">
                    <li
                      class="list-group-item"
                      v-for="ev in emergency.vehicles"
                      :key="ev.id"
                      aria-current="true"
                      data-bs-toggle="collapse"
                      :data-bs-target="'#collapsevehicles' + ev.id"
                      aria-expanded="false"
                      :aria-controls="'collapsevehicles' + ev.id"
                    >
                      <div class="d-flex justify-content-between">
                        <div>
                          {{ ev.name }}
                        </div>
                        <div>Besatzung: {{ ev.members.length }}</div>
                      </div>
                      <div class="collapse" :id="'collapsevehicles' + ev.id">
                        <ul class="list-group list-group-flush">
                          <li
                            class="list-group-item"
                            v-for="evm in ev.members"
                            :key="evm.id"
                          >
                            <TroopBadge
                              :troop="[evm.troop_key, evm.troop_name]"
                              :is-agt="evm.isAgt"
                            >
                              {{ evm.first_name }} {{ evm.last_name }}
                            </TroopBadge>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div class="card-footer text-muted">
              Einsatz am: {{ emergency.date }}
            </div>
          </div>
        </div>
      </div>
    </DynamicCardComponent>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TroopBadge from "@/views/emergencies/components/TroopBadge";
import DynamicCardComponent from "@/components/op/DynamicCardComponent";

export default {
  name: "index",
  components: { DynamicCardComponent, TroopBadge },
  computed: {
    ...mapGetters({
      emergencies: "Emergencies/all",
    }),
  },
  mounted() {
    this.$store.dispatch("Emergencies/all");
  },
};
</script>
