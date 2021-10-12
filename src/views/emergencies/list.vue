<template>
  <div>
    <DynamicCardComponent header="Admin Einsätze Meine Card">
      <template v-slot:headerextra>
        <button class="btn btn-success btn-sm" @click="getItemData()">
          Hinzufügen
        </button>
      </template>
      <template v-slot:default>
        <ListComponent
          :map="{
            '#': { display: 'id', sort: 'id' },
            Einsatznummer: { display: 'e_number', sort: 'e_number' },
          }"
          :list="emergencies"
          :edit-btn="true"
          :delete-btn="true"
          @edit="getItemData"
        />
        <Modal
          :header="'Einsatz'"
          :id="1"
          v-if="showModal"
          @close="showModal = false"
        >
          <template v-slot:default>
            <Create :item="item" @saved="showModal = false" />
          </template>
        </Modal>
      </template>
    </DynamicCardComponent>
  </div>
</template>

<script>
import DynamicCardComponent from "@/components/DynamicCardComponent";
import { mapGetters } from "vuex";
import Create from "@/views/emergencies/create";
import Modal from "@/components/Modal";
import { Emergency } from "@/models";
import ListComponent from "@/components/ListComponent";

export default {
  name: "list",
  data() {
    return {
      showModal: false,
      inOrder: false,
      emergency_entry: new Emergency(),
      item: null,
    };
  },
  components: {
    ListComponent,
    Modal,
    Create,
    DynamicCardComponent,
  },
  computed: {
    ...mapGetters({
      emergencies: "Emergencies/all",
    }),
  },
  methods: {
    getItemData(item) {
      if (item === undefined) {
        this.item = new Emergency();
      } else {
        this.item = item;
        this.router.push({
          name: "EmergenciesEdit",
          params: { id: this.item.id },
        });
      }
      this.showModal = true;
    },
  },
  mounted() {
    this.$store.dispatch("Emergencies/all");
  },
};
</script>

<style scoped></style>
