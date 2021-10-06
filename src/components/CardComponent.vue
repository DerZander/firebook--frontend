<template>
  <div class="card m-2">
    <div class="card-header text-center pb-0">
      <h5 class="pb-0">
        {{ header }}
      </h5>
    </div>
    <div class="card-body">
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
  },
};
</script>
