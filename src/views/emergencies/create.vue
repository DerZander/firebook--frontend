<template>
  <div>
    <div class="form-group">
      <div class="mb-3">
        <label for="e_number" class="form-label">Einsatznummer</label>
        <input
          type="text"
          class="form-control"
          id="e_number"
          placeholder="12000000000"
          v-model="item.e_number"
          :class="{ 'is-invalid': checkFilled(item.e_number) }"
        />
      </div>
      <div class="mb-3">
        <label for="keyword" class="form-label">Stichwort</label>
        <input
          type="text"
          class="form-control"
          id="keyword"
          placeholder="Feuer1"
          v-model="item.keyword"
          :class="{ 'is-invalid': checkFilled(item.keyword) }"
        />
      </div>
      <div class="mb-3">
        <label for="date" class="form-label">Datum</label>
        <input
          type="datetime-local"
          class="form-control"
          id="date"
          v-model="item.date"
          :class="{ 'is-invalid': checkFilled(item.date) }"
        />
      </div>
      <div class="d-flex justify-content-end">
        <button
          class="btn btn-lg btn-outline-success"
          @click="createEmergency()"
        >
          Speichern
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "create",
  components: {},
  data() {
    return {
      emergency: this.item,
      inCreate: false,
    };
  },
  props: {
    item: Object,
  },
  methods: {
    createEmergency() {
      console.log(this.$store.getters["Login/token"]);
      this.inOrder = true;
      if (!this.item.keyword || !this.item.e_number || !this.item.date) {
        console.log("wrong");
        return;
      }
      delete this.item.vehicles;
      this.item.update().then(() => {
        this.$emit("saved");
      });
    },
    checkFilled(text) {
      return !text && this.inOrder;
    },
  },
};
</script>
