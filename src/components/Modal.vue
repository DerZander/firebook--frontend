<template>
  <div>
    <transition name="modal scrollable">
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
          <div class="modal-header" v-if="header">
            <h5 class="modal-title">{{ header }}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="$emit('close')"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-2 background-color-secondary flex-grow-1">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Scrollable from "@/services/scrollable";

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
  },
  data() {
    return {
      scrollable: null,
      scroll_state: undefined,
    };
  },
  mounted() {
    this.scrollable = new Scrollable(".scrollable");
    const container = document.querySelector(".scrollable");
    container.addEventListener("ps-scroll-y", () => {
      this.scroll_state = this.scrollable.ps[0].reach.y;
    });
    container.addEventListener("ps-y-reach-start", () => {
      this.$emit("start");
    });
    container.addEventListener("ps-y-reach-end", () => {
      this.$emit("end");
    });
  },
  updated() {
    const container = document.querySelector(".scrollable");
    if (
      container.classList.contains("ps--active-y") &&
      this.scroll_state === undefined
    ) {
      this.scroll_state = "start";
    }
    this.scrollable.update();
  },
};
</script>
<style>
.modal-body {
  height: 70vh;
}
</style>
