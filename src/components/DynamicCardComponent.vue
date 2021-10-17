<template>
  <div class="card m-2 shadow-sm">
    <div class="card-header">
      <div class="d-flex justify-content-start align-items-center align-middle">
        <h5 class="mb-0 flex-fill pb-0">{{ header }}</h5>
        <slot name="headerextra" />
      </div>
    </div>
    <div class="card-body pt-1 pb-1" v-if="cardTop">
      <slot name="default-top" />
    </div>
    <div v-if="cardList">
      <slot name="card-extra" />
    </div>
    <div class="card-body pt-1 pb-1" v-else>
      <slot name="default" />
    </div>
    <div class="card-footer" v-if="cardFooter">
      <slot name="footer" />
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
    cardList: {
      type: Boolean,
      default: false,
    },
    cardFooter: {
      type: Boolean,
      default: false,
    },
    cardTop: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
