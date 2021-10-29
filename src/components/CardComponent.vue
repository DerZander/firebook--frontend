<template>
  <div class="card m-2">
    <div class="card-body">
      <h5 class="card-title">{{ header }}</h5>
      <p class="card-text">
        <slot />
      </p>
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
  },
};
</script>
