<!--

This component provides a card element with quite a few lines of code

HOW TO USE THIS COMPONENT

- Include the Card component in the parent element with an opening and a closing tag
- Pass the cardNavs props as an object array { name: "name", slot: "slotname" }
- Add the template for the slots inside the DynamicCardComponent tags with v-slot tag with the slot name
- You can also pass components as template in the DynamicCard

EXAMPLE:

<DynamicCardComponent :cardNavs="cardNav">
      <template v-slot:test><p>this is slot test</p></template>
     <template v-slot:hallo><p>this is slot hallo</p></template>
</DynamicCardComponent>

cardNav: [
        { name: "NavTest", slot: "test" },
        { name: "NavHallo", slot: "hallo" }
      ]
-->

<template>
  <div class="card m-2 shadow-sm">
    <div
      v-if="header || cardNavs.length"
      class="card-header pb-0 d-flex justify-content-between"
    >
      <div class="card-title font-size-120">
        <ul v-if="cardNavs.length > 0" class="nav nav-tabs card-header-tabs">
          <li class="nav-item" v-for="cardNav in cardNavs" :key="cardNav.id">
            <a
              class="nav-link"
              v-bind:class="{ active: curNavCard === cardNav.slot }"
              :id="'nav-' + cardNav.slot"
              data-toggle="tab"
              @click="curNavCard = cardNav.slot"
              aria-selected="true"
              v-if="translate"
              >{{ $t(cardNav.name) }}</a
            >
            <a
              v-else
              class="nav-link"
              v-bind:class="{ active: curNavCard === cardNav.slot }"
              :id="'nav-' + cardNav.slot"
              data-toggle="tab"
              @click="curNavCard = cardNav.slot"
              aria-selected="true"
              >{{ cardNav.name }}</a
            >
          </li>
        </ul>
        <div v-else>
          {{ header }}
        </div>
        <i v-if="mandatory" class="text-red font-weight-bolder">* </i>
      </div>
      <div class="mt-2">
        <slot name="headerextra" />
      </div>
    </div>
    <div :class="'card-body d-flex flex-column ' + bodyClass">
      <div v-if="cardNavs.length > 0" class="card-body d-flex flex-column">
        <div
          class="
            tab-content
            flex-basis-0
            overflow-hidden
            flex-grow-1
            scrollable
          "
          id="nav-tabContent"
          v-for="cardNav in cardNavs"
          :key="cardNav.id"
          :class="{ visible: curNavCard === cardNav.slot }"
          v-show="curNavCard === cardNav.slot"
        >
          <div
            class="tab-pane fade show active h-100"
            v-if="curNavCard === cardNav.slot"
            :id="'nav-' + cardNav.slot"
            role="tabpanel"
          >
            <slot :name="cardNav.slot" />
          </div>
        </div>
      </div>
      <div v-else>
        <div
          class="
            tab-content
            flex-basis-0
            overflow-hidden
            flex-grow-1
            scrollable
          "
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DynamicCardComponent",
  data() {
    return {
      curNavCard: this.cardNavs[0].slot,
    };
  },
  props: {
    header: {
      type: String,
      default: "",
    },
    mandatory: {
      type: Boolean,
      default: false,
    },
    bodyClass: {
      type: String,
    },
    cardNavs: {
      type: Array,
      default: () => [],
    },
    translate: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.nav-item {
  cursor: pointer;
}
</style>
