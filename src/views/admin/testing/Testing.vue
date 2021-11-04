<template>
  <div>
    <CardComponent header="Card">
      <div>
        <button type="button" class="btn btn-primary">Primary</button>
        <button type="button" class="btn btn-secondary">Secondary</button>
        <button type="button" class="btn btn-success">Success</button>
        <button type="button" class="btn btn-danger">Danger</button>
        <button type="button" class="btn btn-warning">Warning</button>
        <button type="button" class="btn btn-info">Info</button>
        <button type="button" class="btn btn-light">Light</button>
        <button type="button" class="btn btn-dark">Dark</button>
      </div>

      <div>
        <button type="button" class="btn btn-outline-primary">Primary</button>
        <button type="button" class="btn btn-outline-secondary">
          Secondary
        </button>
        <button type="button" class="btn btn-outline-success">Success</button>
        <button type="button" class="btn btn-outline-danger">Danger</button>
        <button type="button" class="btn btn-outline-warning">Warning</button>
        <button type="button" class="btn btn-outline-info">Info</button>
        <button type="button" class="btn btn-outline-light">Light</button>
        <button type="button" class="btn btn-outline-dark">Dark</button>
      </div>
    </CardComponent>
    <DynamicCardComponent header="DynamicCard">
      <template v-slot:headerextra>
        <button class="btn btn-primary btn-sm" @click="showModal = true">
          Modal
        </button>
        <Modal
          header="Modal"
          :footer="true"
          v-if="showModal"
          @close="showModal = false"
        >
          <template v-slot:default>Default</template>
          <template v-slot:footer>Foooter</template>
        </Modal>
      </template>
      <template v-slot:default> Hallo </template>
    </DynamicCardComponent>
    <CardComponent header="Listcomponent">
      <template v-slot:default>
        <ListComponent
          :map="{
            '#': { display: 'id', sort: 'id' },
            Name: { display: 'name', sort: 'name' },
          }"
          :list="listData"
          :edit-btn="true"
          :delete-btn="true"
        />
      </template>
    </CardComponent>
    <CardListComponent header="Card List Component">
      <template v-slot:list>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <h5 class="card-title">Mitglieder</h5>
            <div class="d-flex justify-content-between">
              <div class="me-auto">Noch offen:</div>
              <span>5 €</span>
            </div>
            <div class="d-flex justify-content-between">
              <div class="me-auto">Bereits bezahlt:</div>
              <span>3 €</span>
            </div>
            <div class="d-flex justify-content-between">
              <div class="me-auto">Gesamt:</div>
              <span>123 €</span>
            </div>
          </li>
        </ul>
      </template>
    </CardListComponent>
    <CardComponent header="Switches">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          title="Registrier dich!"
        />
      </div>
      <label class="form-check-label" for="flexSwitchCheckDefault">
        Neu?
      </label>
    </CardComponent>
    <CardComponent header="KEINE AHNUNG">
      <v-popover>
        <button class="btn btn-outline-accent-purple">
          <i class="fa fa-fw fa-trash"></i>
        </button>
        <template slot="popover">
          <p>Sicher?</p>
          <a v-close-popover>
            <button class="btn btn-outline-accent-purple tooltip-target">
              Ja
            </button></a
          >
          <a v-close-popover>
            <button class="btn btn-outline-accent-purple tooltip-target">
              Nein
            </button></a
          >
        </template>
      </v-popover></CardComponent
    >
    <Icons />
  </div>
</template>

<script>
import CardComponent from "@/components/CardComponent";
import DynamicCardComponent from "@/components/DynamicCardComponent";
import Modal from "@/components/Modal";
import CardListComponent from "@/components/CardListComponent";
import ListComponent from "@/components/ListComponent";
import Icons from "@/views/admin/testing/componentes/Icons";
export default {
  name: "Testing",
  components: {
    Icons,
    ListComponent,
    CardListComponent,
    Modal,
    DynamicCardComponent,
    CardComponent,
  },
  data() {
    return {
      showModal: false,
      listData: [{ id: 1, name: "Test" }],
    };
  },
};
</script>
