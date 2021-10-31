<template>
  <div class="collect">
    <AlertComponent v-for="alert in alerts" :key="alert.key" :alert="alert" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AlertComponent from "@/components/Alert/components/AlertComponent";

export default {
  components: {
    AlertComponent,
  },
  computed: {
    ...mapGetters({
      alerts: "Alert/visible",
    }),
  },
};
</script>

<style lang="scss" scoped>
.collect {
  position: absolute;
  top: 5rem;
  right: 1rem;
  width: 20vw;
  min-width: 300px;
}
</style>
