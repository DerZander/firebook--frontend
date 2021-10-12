/** * * ==================================MAP===================================
* { * 'headline': { display: 'Diplay attribute', sort: 'Sorting attribute' } * }
* ======================================================================== * *
NOTES: * Sorting is only possible if the sorting attribute is a string * */
<template>
  <div class="flex-table">
    <table>
      <thead>
        <tr>
          <th
            v-for="(item, key) in mapData"
            :key="key"
            @click="sort(item.sort)"
            class="justify-content-between"
            :class="[
              typeof item.sort === 'string'
                ? 'cursor-pointer text-hover-primary'
                : '',
            ]"
          >
            <span v-if="item.translation">{{ $t(key) }}</span>
            <span v-else>{{ key }}</span>
            <div v-show="sorting.property === item.sort && sorting.order === 1">
              <i class="fas fa-chevron-down"></i>
            </div>
            <div
              v-show="sorting.property === item.sort && sorting.order === -1"
            >
              <i class="fas fa-chevron-up"></i>
            </div>
          </th>
          <th v-if="editBtn || switchBtn" class="text-center">
            {{ btnHeader }}
          </th>
          <th v-if="deleteBtn" class="text-center">{{ btnHeader }}</th>
        </tr>
      </thead>
      <div
        class="wrapper"
        :class="{
          start: scroll_state === 'start',
          end: scroll_state === 'end',
          'start end': scroll_state === null,
        }"
      >
        <tbody id="item" class="scrollable" @ps-y-reach-end="scrollReachEnd()">
          <tr
            v-for="item in items"
            :key="item.key"
            class="bg-hover-gray rounded d-flex align-items-center"
            @click="$emit('rowSelect', item)"
          >
            <td
              class="d-inline-block col-6 text-truncate"
              v-for="attribute in mapData"
              :key="attribute.key"
            >
              <span>{{ parseProperty(item, attribute.display) }} </span>
            </td>
            <td v-if="editBtn">
              <button
                class="btn btn-outline-accent-yellow"
                @click="$emit('edit', item)"
              >
                <i class="fa fa-fw fa-edit"></i>
              </button>
            </td>
            <td v-if="deleteBtn">
              <v-popover>
                <button class="btn btn-outline-accent-purple">
                  <i class="fa fa-fw fa-trash"></i>
                </button>
                <template slot="popover">
                  <p>
                    {{ $t("sure_delete") }}
                  </p>
                  <a v-close-popover>
                    <button
                      class="btn btn-outline-accent-purple tooltip-target"
                      @click="$emit('delete', item)"
                    >
                      {{ $t("yes") }}
                    </button></a
                  >
                  <a v-close-popover>
                    <button
                      class="btn btn-outline-accent-purple tooltip-target"
                    >
                      {{ $t("no") }}
                    </button></a
                  >
                </template>
              </v-popover>
            </td>
            <td v-if="switchBtn">
              <div
                class="custom-control custom-switch"
                style="padding: 0.4rem 4.5rem 0.4rem"
              >
                <input
                  type="checkbox"
                  class="custom-control-input d-none"
                  :id="'selected' + item.id"
                  :checked="activeSwitch.indexOf(item) !== -1"
                  @change="$emit('switch', item)"
                />
                <label
                  class="custom-control-label"
                  :for="'selected' + item.id"
                ></label>
              </div>
            </td>
          </tr>
          <!--          <tr v-if="loading">-->
          <!--            <td class="justify-content-center">-->
          <!--&lt;!&ndash;              <FlameLoader />&ndash;&gt;-->
          <!--            </td>-->
          <!--          </tr>-->
        </tbody>
      </div>
    </table>
  </div>
</template>

<script>
import Scrollable from "@/services/scrollable";

export default {
  name: "List",
  props: {
    map: Object,
    list: Array,
    loading: Boolean,
    editBtn: Boolean,
    deleteBtn: Boolean,
    switchBtn: Boolean,
    activeSwitch: {
      type: Array,
    },
    btnHeader: String,
  },
  components: {},
  data() {
    return {
      sorting: { property: undefined, order: 1 },
      // scrollable: null,
      scroll_state: undefined,
      mapData: this.map,
      showModal: false,
      listMax: 30,
    };
  },
  computed: {
    items() {
      let res = this.list;
      if (res && res.length) {
        return res
          .sort((a, b) => {
            if (
              this.parseProperty(a, this.sorting.property) >
              this.parseProperty(b, this.sorting.property)
            ) {
              return this.sorting.order;
            }
            if (
              this.parseProperty(a, this.sorting.property) <
              this.parseProperty(b, this.sorting.property)
            ) {
              return -1 * this.sorting.order;
            }
            return 0;
          })
          .slice(0, this.listMax);
      }
      return res;
    },
  },
  methods: {
    parseProperty(item, property) {
      if (typeof property === "function") {
        return property(item);
      }
      if (typeof property === "string") {
        const separated = property.split(" | ");
        let filter;

        if (separated.length > 1) {
          filter = separated[separated.length - 1];
        }

        const arr = separated[0].split(".");
        let res = item;
        arr.forEach((step) => {
          //Regex to check if property is array
          const regex = /(\w*)\[(\d+)\]/g;
          const found = regex.exec(step);
          if (found) {
            res = res[found[1]][found[2]];
          } else {
            res = res[step];
          }
        });

        if (filter) {
          res = this.$options.filters[filter](res);
        }

        return res;
      }
      return undefined;
    },
    sort(property) {
      if (typeof property === "string") {
        if (this.sorting.property === property) {
          this.sorting.order *= -1;
        } else {
          this.sorting.property = property;
          this.sorting.order = 1;
        }
      }
    },
    scrollReachEnd() {
      let container = document.querySelector("#item");
      let scrollerPosition =
        container.scrollTop / (container.scrollHeight - container.clientHeight);
      if (scrollerPosition >= 0.98) {
        if (this.list.length > this.listMax + 30) {
          this.listMax += 30;
          return;
        }
        this.listMax = this.list.length;
      }
    },
  },
  mounted() {
    if (Object.keys(this.map).length) {
      this.sorting.property = Object.values(this.map)[0].sort;
    }
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
.wrapper {
  position: relative;
  display: flex;
  height: 100%;
  overflow: hidden;
}

th:first-child {
  padding-left: 0;
}

th:last-child {
  padding-right: 0;
}

td:first-child {
  padding-left: 0;
}

td:last-child {
  padding-right: 0;
}

.wrapper.end::before {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  content: "";
  background: linear-gradient(#ffffffff, #ffffff00);
  height: 50px;
  width: 100%;
}

.wrapper.start::after {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  content: "";
  background: linear-gradient(#ffffff00, #ffffffff);
  height: 50px;
  width: 100%;
}

.custom-control-input:checked ~ .custom-control-label::before {
  background: #9e3667 !important;
  border-color: #9e3667 !important;
}
</style>
