<template>
  <div class="card m-2 shadow-sm">
    <div class="card-body pb-2">
      <img
        :src="picture.path"
        class="card-img-top mb-4"
        :alt="picture.alt"
        v-if="picture"
      />
      <div
        class="
          d-flex
          justify-content-start
          card-title
          pb-0
          align-items-center align-middle
        "
        v-bind:class="{ 'text-center': centeredHeader }"
      >
        <h5 class="mb-0 flex-fill pb-0">{{ header }}</h5>
        <slot class="mb-0 flex-fill pb-0" name="headerextra" />
      </div>
      <div v-if="cardTop">
        <slot name="default-top" />
      </div>
      <div v-if="cardList">
        <slot name="card-extra" />
      </div>
      <div v-else>
        <slot name="default" />
      </div>
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
    picture: {
      path: {
        type: String,
        default: "",
      },
      alt: {
        type: String,
        default: "",
      },
    },
    header: {
      type: String,
      default: "",
    },
    centeredHeader: {
      type: Boolean,
      default: false,
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
