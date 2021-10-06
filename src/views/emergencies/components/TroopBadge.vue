<template>
  <div class="inline">
    <slot />
    <span
      class="badge rounded-pill bg-primary"
      :class="getBadgeColor()"
      :title="troop[1]"
      >{{ troop[0] }}</span
    >
    <span
      class="badge rounded-pill bg-dark text-light"
      v-if="isAgt === 1"
      title="Atemschutzgeräteträger"
      >AGT</span
    >
  </div>
</template>

<script>
export default {
  name: "TroopBadge",
  props: {
    troop: {
      type: Array,
      default: undefined,
    },
    isAgt: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getBadgeColor() {
      let value = "";
      switch (this.troop[0]) {
        case "ATf" || "ATm":
          value = "bg-danger";
          break;
        case "WTf" || "WTm":
          value = "bg-info";
          break;
        case "STf" || "STm":
          value = "bg-warning";
          break;
        default:
          value = "bg-secondary";
          break;
      }
      return value;
    },
  },
};
</script>

<style scoped></style>
