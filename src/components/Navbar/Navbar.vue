<template>
  <nav
    class="
      navbar navbar-expand-lg navbar-light
      bg-light
      pb-0
      pt-0
      shadow-sm
      rounded
    "
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="../../assets/icon.png"
          alt=""
          width="30"
          class="d-inline-block"
        />
        Feuerwehrbuch
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarText"
        v-if="tokenData.userId"
      >
        <ul class="navbar-nav me-auto mb-lg-0">
          <li
            :class="[
              { active: currenPath === 'Home' },
              'nav-item align-middle',
            ]"
          >
            <router-link class="nav-link align-middle" :to="{ name: 'Home' }">
              <i class="fas fa-home"></i>
              <span class="align-middle"> Home</span>
            </router-link>
          </li>
          <li
            :class="[
              { active: currenPath === 'EmergenciesIndex' },
              'nav-item align-middle',
            ]"
          >
            <router-link
              class="nav-link align-middle"
              :to="{ name: 'EmergenciesIndex' }"
            >
              <i class="fas fa-fire"></i>
              <span class="align-middle"> Einsätze</span>
            </router-link>
          </li>
          <li
            :class="[
              { active: currenPath === 'UsersIndex' },
              'nav-item align-middle',
            ]"
          >
            <router-link
              class="nav-link align-middle"
              :to="{ name: 'UsersIndex' }"
            >
              <i class="fas fa-users"></i>
              <span class="align-middle"> Kameraden</span>
            </router-link>
          </li>
          <li
            :class="[
              { active: currenPath === 'Vehicles' },
              'nav-item align-middle',
            ]"
          >
            <router-link
              class="nav-link align-middle"
              :to="{ name: 'Vehicles' }"
            >
              <i class="fas fa-ambulance"></i>
              <span class="align-middle"> Fahrzeuge</span>
            </router-link>
          </li>
          <li
            :class="[
              { active: currenPath === 'Vehicles' },
              'nav-item align-middle',
            ]"
          >
            <router-link
              class="nav-link align-middle"
              :to="{ name: 'CalculationsIndex' }"
            >
              <i class="fas fa-beer"></i>
              <span class="align-middle"> Getränke</span>
            </router-link>
          </li>
        </ul>
        <div class="navbar-text" v-if="tokenData.userId">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown"
            aria-controls="navbarNavDarkDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDarkDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Moin, {{ tokenData.username }}
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDarkDropdownMenuLink"
                >
                  <li>
                    <router-link
                      class="dropdown-item"
                      :to="{ name: 'UsersIndex' }"
                      >Profil</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="dropdown-item"
                      :to="{ name: 'AdminCalculationsIndex' }"
                      >Getränkeabrechnungen</router-link
                    >
                  </li>
                  <div v-if="tokenData.role > 0">
                    <li><hr class="dropdown-divider" /></li>
                    <li><h6 class="dropdown-header">Getränkewarte</h6></li>
                    <li>
                      <router-link
                        class="dropdown-item"
                        :to="{ name: 'Beverages' }"
                        >Verpflegung</router-link
                      >
                    </li>
                    <li>
                      <router-link
                        class="dropdown-item"
                        :to="{ name: 'AdminCalculationsIndex' }"
                      >
                        Getränkeabrechnungen
                      </router-link>
                    </li>
                    <li>
                      <router-link
                        class="dropdown-item"
                        :to="{ name: 'EmergenciesList' }"
                      >
                        Einsätze
                      </router-link>
                    </li>
                  </div>
                  <div v-if="tokenData.role > 2">
                    <li><hr class="dropdown-divider" /></li>
                    <li><h6 class="dropdown-header">Einheitsführung</h6></li>
                    <li><a class="dropdown-item" href="#">Mitglieder</a></li>
                  </div>
                  <div v-if="tokenData.role === 3">
                    <li><hr class="dropdown-divider" /></li>
                    <li><h6 class="dropdown-header">Admin</h6></li>
                    <li><a class="dropdown-item" href="#">Admin</a></li>
                    <li>
                      <router-link
                        class="dropdown-item"
                        :to="{ name: 'AdminTesting' }"
                      >
                        Testing
                      </router-link>
                    </li>
                  </div>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a class="dropdown-item" href="" @click="logout()"
                      >Logout</a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  components: {},
  computed: {
    ...mapGetters({
      tokenData: "Login/data",
    }),
    currenPath() {
      return this.$route.name;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("Login/logout").then(() => {
        this.$route.go();
      });
    },
  },
};
</script>

<style scoped></style>
