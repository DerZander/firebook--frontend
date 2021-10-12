<template>
  <div>
    <DynamicCardComponent header="Admin Einsätze">
      <button class="btn btn-success" @click="getItemData()">Hinzufügen</button>
      <div>
        <ListComponent
          :map="{
            '#': { display: 'id', sort: 'id' },
            Einsatznummer: { display: 'e_number', sort: 'e_number' },
          }"
          :list="emergencies"
          :edit-btn="true"
          @edit="getItemData"
        />
      </div>
      <Modal
        :header="'Einsatz'"
        :id="1"
        v-if="showModal"
        @close="showModal = false"
      >
        <Create :item="item" @saved="showModal = false" />
      </Modal>
    </DynamicCardComponent>
    <DynamicCardComponent2 header="Admin Einsätze Meine Card">
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
          @edit="getItemData"
        />
        <Modal
          :header="'Einsatz'"
          :id="1"
          v-if="showModal"
          @close="showModal = false"
        >
          <Create :item="item" @saved="showModal = false" />
        </Modal>
      </template>
    </DynamicCardComponent2>
  </div>
</template>

<script>
import DynamicCardComponent from "@/components/op/DynamicCardComponent";
import DynamicCardComponent2 from "@/components/DynamicCardComponent";
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
    DynamicCardComponent2,
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
