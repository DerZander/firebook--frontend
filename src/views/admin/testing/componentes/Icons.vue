<template>
  <DynamicCardComponent header="Icons">
    <button type="button" class="btn btn-secondary">
      Edit
      <span class="badge bg-secondary">
        <i class="far fa-edit" />
      </span>
    </button>
    <button type="button" class="btn btn-secondary">
      File
      <span class="badge bg-secondary">
        <i class="far fa-file"></i>
      </span>
    </button>
    <button type="button" class="btn btn-secondary">
      paper-plane
      <span class="badge bg-secondary">
        <i class="far fa-paper-plane"></i>
      </span>
    </button>
    <button type="button" class="btn btn-secondary">
      check
      <span class="badge bg-secondary">
        <i class="fas fa-check"></i>
      </span>
    </button>
  </DynamicCardComponent>
</template>

<script>
import DynamicCardComponent from "@/components/DynamicCardComponent";
export default {
  name: "Icons",
  components: { DynamicCardComponent },
};
</script>

<style scoped></style>
