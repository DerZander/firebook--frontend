<template>
  <DynamicCardComponent :header="calc.month" class="h-100 w-100">
    Rechnung: {{ calc.value }}
  </DynamicCardComponent>
</template>

<script>
import DynamicCardComponent from "@/components/DynamicCardComponent";
export default {
  name: "BudgetCard",
  components: { DynamicCardComponent },
  props: {
    calc: Object,
  },
};
</script>
