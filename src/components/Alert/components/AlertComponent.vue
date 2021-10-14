<template>
  <div class="alert z-index-above-popup" :class="['alert-' + alert.type]">
    <h5 class="alert-heading">
      {{ alert.header }}
    </h5>
    {{ alert.message }}
    <div v-if="alert.footer" class="mt-2">
      {{ alert.footer }}
    </div>
  </div>
</template>
<script>
import { Alert } from "@/models";

export default {
  name: "AlertComponent",
  props: {
    alert: {
      type: Alert,
      default: () => new Alert(),
    },
  },
  mounted() {
    this.alert.display();
  },
};
</script>
