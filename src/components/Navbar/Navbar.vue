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
          Guten Tag, {{ tokenData.username }}
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
};
</script>

<style scoped></style>
