<template>
  <div class="card m-2 p-0 rounded">
    <div class="card-body pb-2">
      <div
        class="
          d-flex
          justify-content-start
          card-title
          pb-0
          align-items-center align-middle
        "
      >
        <h5 class="mb-0 flex-fill pb-0">{{ header }}</h5>
        <slot class="mb-0 flex-fill pb-0" name="headerextra" />
      </div>
      <slot name="list" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CardListComponent",
  props: {
    header: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped></style>
