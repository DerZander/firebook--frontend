<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light pb-0 shadow-sm rounded"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Feuerwehrbuch</a>
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
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li :class="[{ active: currenPath === 'Home' }, 'nav-item']">
            <router-link class="nav-link" :to="{ name: 'Home' }"
              >Home</router-link
            >
          </li>
          <li :class="[{ active: currenPath === 'Beverages' }, 'nav-item']">
            <router-link class="nav-link" :to="{ name: 'Beverages' }"
              >Verpflegung</router-link
            >
          </li>
          <li :class="[{ active: currenPath === 'Emergencies' }, 'nav-item']">
            <router-link class="nav-link" :to="{ name: 'Emergencies' }"
              >Einsätze</router-link
            >
          </li>
          <li :class="[{ active: currenPath === 'Calculations' }, 'nav-item']">
            <router-link class="nav-link" :to="{ name: 'Calculations' }"
              >Getränkeabrechnungen</router-link
            >
          </li>

          <li :class="[{ active: currenPath === 'Vehicles' }, 'nav-item']">
            <router-link class="nav-link" :to="{ name: 'Vehicles' }"
              >Fahrzeuge</router-link
            >
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
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </li>
                  <div
                    v-if="
                      tokenData.isBeverageAdmin ||
                      tokenData.isUnitAdmin ||
                      tokenData.isAdmin
                    "
                  >
                    <li><hr class="dropdown-divider" /></li>
                    <li><h6 class="dropdown-header">Getränkewarte</h6></li>
                    <li>
                      <router-link
                        class="dropdown-item"
                        :to="{ name: 'Calculations' }"
                      >
                        Getränkeabrechnungen
                      </router-link>
                    </li>
                  </div>
                  <div v-if="tokenData.isUnitAdmin || tokenData.isAdmin">
                    <li><hr class="dropdown-divider" /></li>
                    <li><h6 class="dropdown-header">Einheitsführung</h6></li>
                    <li><a class="dropdown-item" href="#">beverages</a></li>
                  </div>
                  <div v-if="tokenData.isAdmin">
                    <li><hr class="dropdown-divider" /></li>
                    <li><h6 class="dropdown-header">Admin</h6></li>
                    <li><a class="dropdown-item" href="#">Admin</a></li>
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
        <div class="navbar-text" v-else>
          <LoginForm />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import LoginForm from "@/components/Auth/LoginForm";

export default {
  name: "Navbar",
  components: { LoginForm },
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
