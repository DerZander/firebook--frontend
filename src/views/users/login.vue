<template>
  <div class="position-absolute top-50 start-50 translate-middle">
    <div class="position-absolute top-50 start-50 translate-middle w-50">
      <div class="mb-3">
        <label for="login-username" class="form-label">Benutzername</label>
        <input
          id="login-username"
          type="text"
          class="form-control"
          name="username"
          v-model="username"
          placeholder="Kamerad112"
        />
      </div>
      <div class="mb-3">
        <label for="login-password" class="form-label">Passwort</label>
        <input
          id="login-password"
          type="password"
          class="form-control"
          name="password"
          v-model="password"
          placeholder="***********"
        />
      </div>
      <div class="mb-3 d-flex flex-row-reverse">
        <button class="btn btn-success" @click="login()">Login</button>
      </div>
    </div>
    <!--    <CardComponent header="Logge dich ein!" class="w-50">-->
    <!--      <div class="mb-3">-->
    <!--        <label for="login-username" class="form-label">Benutzername</label>-->
    <!--        <input-->
    <!--          id="login-username"-->
    <!--          type="text"-->
    <!--          class="form-control"-->
    <!--          name="username"-->
    <!--          v-model="username"-->
    <!--          placeholder="Kamerad112"-->
    <!--        />-->
    <!--      </div>-->
    <!--      <div class="mb-3">-->
    <!--        <label for="login-password" class="form-label">Passwort</label>-->
    <!--        <input-->
    <!--          id="login-password"-->
    <!--          type="password"-->
    <!--          class="form-control"-->
    <!--          name="password"-->
    <!--          v-model="password"-->
    <!--          placeholder="***********"-->
    <!--        />-->
    <!--      </div>-->
    <!--      <div class="mb-3 d-flex flex-row-reverse">-->
    <!--        <button class="btn btn-success" @click="login()">Login</button>-->
    <!--      </div>-->
    <!--    </CardComponent>-->
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      username: "",
      email: this.email,
      password: "",
      password_repeat: "",
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
    register() {
      this.$store.dispatch("Login/register", {
        username: this.username,
        email: this.email,
        password: this.password,
        password_repeat: this.password_repeat,
      });
    },
  },
};
</script>
