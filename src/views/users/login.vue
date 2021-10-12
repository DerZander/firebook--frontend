<template>
  <div class="row d-flex justify-content-center mt-4">
    <div class="col-4">
      <CardComponent header="Regristiere dich!">
        <div>
          <div class="mb-3">
            <label for="reg-username" class="form-label">Benutzername</label>
            <input
              id="reg-username"
              type="text"
              class="form-control"
              name="username"
              v-model="username"
              placeholder="Kamerad112"
            />
          </div>
          <div class="mb-3">
            <label for="reg-email" class="form-label">Email</label>
            <input
              id="reg-email"
              type="email"
              class="form-control"
              name="email"
              v-model="email"
              placeholder="kamerad112@email.com"
            />
          </div>
          <div class="mb-3">
            <label for="reg-password" class="form-label">Passwort</label>
            <input
              id="reg-password"
              type="password"
              class="form-control"
              name="password"
              v-model="password"
              placeholder="***********"
            />
          </div>
          <div class="mb-3">
            <label for="reg-password_repeat" class="form-label"
              >Passwort wiederholen</label
            >
            <input
              id="reg-password_repeat"
              type="password"
              class="form-control"
              name="password_repeat"
              v-model="password_repeat"
              placeholder="***********"
            />
          </div>
          <div class="mb-3 d-flex flex-row-reverse">
            <button class="btn btn-primary" @click="register()">
              Registrieren
            </button>
          </div>
        </div>
      </CardComponent>
    </div>
    <div class="col-4">
      <CardComponent header="Logge dich ein!">
        <div>
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
      </CardComponent>
    </div>
  </div>
</template>

<script>
import CardComponent from "@/components/CardComponent";
export default {
  name: "login",
  components: { CardComponent },
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
