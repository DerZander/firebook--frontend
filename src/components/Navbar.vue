<template>
  <div>
    <div id="nav">
      Hallo
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/emergencies">Einsätze</router-link> |
      <router-link to="/beverages">Verpflegung</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped></style>
