<template>
  <div>
    <DynamicCardComponent header="Admin Einsätze">
      <button class="btn btn-success" @click="getItemData()">Hinzufügen</button>
      <div class="overflow-hidden flex-basis-0 flex-grow-1">
        <List
          class="h-100"
          :map="{
            '#': { display: 'id', sort: 'id' },
            Einsatznummer: { display: 'e_number', sort: 'e_number' },
          }"
          :list="emergencies"
          :edit-btn="true"
          @edit="getItemData"
        />
      </div>

      <!--      <table class="table table-hover">-->
      <!--        <thead>-->
      <!--          <tr>-->
      <!--            <th scope="col">#</th>-->
      <!--            <th scope="col">Einsatznummer</th>-->
      <!--            <th scope="col">Stichwort</th>-->
      <!--            <th scope="col">Datum</th>-->
      <!--          </tr>-->
      <!--        </thead>-->
      <!--        <tbody>-->
      <!--          <tr v-for="emergency in emergencies" :key="emergency.id">-->
      <!--            <th scope="row">{{ emergency.id }}</th>-->
      <!--            <td>{{ emergency.e_number }}</td>-->
      <!--            <td>{{ emergency.keyword }}</td>-->
      <!--            <td>{{ emergency.date }}</td>-->
      <!--            <td>-->
      <!--              <button-->
      <!--                type="button"-->
      <!--                class="btn btn-warning"-->
      <!--                data-bs-toggle="modal"-->
      <!--                data-bs-target="#editModal"-->
      <!--              >-->
      <!--                <i class="fas fa-edit"></i>-->
      <!--              </button>-->
      <!--              <button type="button" class="btn btn-danger">-->
      <!--                <i class="far fa-trash-alt"></i>-->
      <!--              </button>-->
      <!--            </td>-->
      <!--          </tr>-->
      <!--        </tbody>-->
      <!--      </table>-->
      <Modal
        :header="'Einsatz'"
        :id="1"
        v-if="showModal"
        @close="showModal = false"
      >
        <Create :item="item" @saved="showModal = false" />
      </Modal>
      <!-- Modal -->
      <!--      <div-->
      <!--        class="modal fade"-->
      <!--        id="editModal"-->
      <!--        tabindex="-1"-->
      <!--        aria-labelledby="editModalLabel"-->
      <!--        aria-hidden="true"-->
      <!--      >-->
      <!--        <div class="modal-dialog">-->
      <!--          <div class="modal-content">-->
      <!--            <div class="modal-header">-->
      <!--              <h5 class="modal-title" id="editModalLabel">-->
      <!--                Einsatz bearbeiten-->
      <!--              </h5>-->
      <!--              <button-->
      <!--                type="button"-->
      <!--                class="btn-close"-->
      <!--                data-bs-dismiss="modal"-->
      <!--                aria-label="Close"-->
      <!--              ></button>-->
      <!--            </div>-->
      <!--            <div class="modal-body">-->
      <!--              <Create />-->
      <!--            </div>-->
      <!--            <div class="modal-footer">-->
      <!--              <button-->
      <!--                type="button"-->
      <!--                class="btn btn-secondary"-->
      <!--                data-bs-dismiss="modal"-->
      <!--              >-->
      <!--                Close-->
      <!--              </button>-->
      <!--              <button type="button" class="btn btn-primary">-->
      <!--                Save changes-->
      <!--              </button>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </DynamicCardComponent>
  </div>
</template>

<script>
import DynamicCardComponent from "@/components/DynamicCardComponent";
import List from "@/components/List";
import { mapGetters } from "vuex";
import Create from "@/views/emergencies/create";
import Modal from "@/components/Modal";
import { Emergency } from "@/models";

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
    Modal,
    Create,
    DynamicCardComponent,
    List,
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
};
</script>

<style scoped></style>
