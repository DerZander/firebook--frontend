<template>
  <div class="flex-table">
    <table class="table table-hover table-borderless table-sm">
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
            <div class="d-flex bd-highlight">
              <div class="p-2 flex-shrink-1 bd-highlight">{{ key }}</div>
              <div
                class="p-2 flex-shrink-1 bd-highlight"
                v-show="sorting.property === item.sort"
              >
                <div v-show="sorting.order === 1">
                  <i class="fas fa-chevron-down"></i>
                </div>
                <div v-show="sorting.order === -1">
                  <i class="fas fa-chevron-up"></i>
                </div>
              </div>
            </div>
          </th>
          <th v-if="editBtn || switchBtn" class="text-center">
            {{ btnHeader }}
          </th>
          <th v-if="deleteBtn" class="text-center">
            {{ btnHeader }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.key"
          class="bg-hover-gray rounded align-items-center align-middle"
        >
          <td v-for="attribute in mapData" :key="attribute.key">
            <div class="ps-2">
              {{ parseProperty(item, attribute.display) }}
            </div>
          </td>
          <td v-if="editBtn">
            <button
              class="btn btn btn-outline-warning btn-sm"
              @click="$emit('edit', item)"
            >
              <i class="fa fa-fw fa-edit"></i>
            </button>
          </td>
          <td v-if="deleteBtn">
            <!--            <VPopover>-->
            <!--              <button class="btn btn btn-outline-danger">-->
            <!--                <i class="fa fa-fw fa-trash"></i>-->
            <!--              </button>-->
            <!--              <template slot="popover">-->
            <!--                <p>-->
            <!--                  Sicher?-->
            <!--                </p>-->
            <!--                <a v-close-popover>-->
            <!--                  <button-->
            <!--                    class="btn btn btn-outline-danger tooltip-target"-->
            <!--                    @click="$emit('delete', item)"-->
            <!--                  >-->
            <!--                    Ja-->
            <!--                  </button>-->
            <!--                </a>-->
            <!--                <a v-close-popover>-->
            <!--                  <button class="btn btn btn-outline-danger tooltip-target">-->
            <!--                    Nein-->
            <!--                  </button>-->
            <!--                </a>-->
            <!--              </template>-->
            <!--            </VPopover>-->
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
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ListComponent",
  components: {},
  props: {
    map: Object,
    list: Array,
    editBtn: Boolean,
    switchBtn: Boolean,
    activeSwitch: {
      type: Array,
    },
    deleteBtn: Boolean,
    btnHeader: String,
  },
  data() {
    return {
      mapData: this.map,
      sorting: { property: undefined, order: 1 },
      showModal: false,
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
  },
};
</script>

<style>
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

.custom-control-input:checked ~ .custom-control-label::before {
  background: #9e3667 !important;
  border-color: #9e3667 !important;
}
</style>
