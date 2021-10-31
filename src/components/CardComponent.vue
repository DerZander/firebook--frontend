<template>
  <div class="card m-2 p-0 rounded">
    <div
      class="card-body pb-2"
      v-bind:class="{ 'text-center': centeredContent }"
    >
      <h5 class="card-title" v-bind:class="{ 'text-center': centeredHeader }">
        {{ header }}
      </h5>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    header: {
      type: String,
      default: "",
    },
    centeredHeader: {
      type: Boolean,
      default: false,
    },
    centeredContent: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
