<template>
  <div>
    <transition name="modal">
      <div class="modal-backdrop show" />
    </transition>
    <div
      class="modal"
      style="display: block"
      tabindex="-1"
      role="dialog"
      :id="'modal_' + id"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header pt-2 pb-2 pe-2" v-if="header">
            <h5 class="modal-title">{{ header }}</h5>
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
              aria-label="Close"
              @click="$emit('close')"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body background-color-secondary flex-grow-1">
            <slot name="default" />
          </div>
          <div class="modal-footer" v-if="footer">
            <slot name="footer" v-if="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    header: {
      type: String,
      default: null,
    },
    id: {
      type: Number,
      default: 0,
    },
    item: {
      type: Object,
    },
    footer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
