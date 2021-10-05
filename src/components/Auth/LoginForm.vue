<template>
  <div>
    <div class="row align-items-center">
      <div class="col-auto">
        <input
          class="form-control"
          required=""
          v-model="username"
          placeholder="Username"
        />
      </div>
      <div class="col-auto">
        <input
          class="form-control"
          required=""
          type="password"
          name="password"
          v-model="password"
          placeholder="Password"
        />
      </div>
      <div class="col-auto">
        <button class="btn btn-success" @click="login">Senden</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("Login/login", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "Home" });
        });
    },
  },
};
</script>

<style scoped></style>
