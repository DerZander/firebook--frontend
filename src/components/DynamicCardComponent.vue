<template>
  <div class="card m-2 shadow-sm">
    <div class="card-header">
      <div class="d-flex justify-content-start align-items-center align-middle">
        <h5 class="mb-0 flex-fill">{{ header }}</h5>
        <slot name="headerextra" />
      </div>
    </div>
    <div class="card-body pt-0 pb-0">
      <div>
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DynamicCardComponent",
  props: {
    header: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped></style>
