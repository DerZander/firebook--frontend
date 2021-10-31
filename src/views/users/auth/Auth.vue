<template>
  <div
    class="position-absolute top-50 start-50 translate-middle"
    id="AuthCard"
    :style="{
      'background-image': Background,
    }"
  >
    <DynamicCardComponent
      :header="textValues.header"
      :picture="{ path: Logo, alt: 'Feuerwehrbuch' }"
    >
      <template v-slot:headerextra>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            v-model="authSwitch"
            id="flexSwitchCheckDefault"
            title="Wechsel zwischen Login und Registrierung"
            @change="switchAuth()"
          />
        </div>
        <label class="form-check-label" for="flexSwitchCheckDefault">
          Neu?
        </label>
      </template>
      <template v-slot:default>
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
        <div class="mb-3" v-if="authSwitch">
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
          <label for="login-password" class="form-label">Passwort</label>
          <input
            id="login-password"
            type="password"
            class="form-control"
            name="password"
            v-model="password"
            placeholder="***********"
            v-on:keyup.enter="btnTrigger()"
          />
        </div>
        <div class="mb-3" v-if="authSwitch">
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
            v-on:keyup.enter="btnTrigger()"
          />
        </div>
        <div class="mb-3 d-flex flex-row-reverse">
          <button
            class="btn btn-success"
            @click="btnTrigger()"
            :title="textValues.buttonTitle"
          >
            Status 3
            <i class="fas fa-plane-departure"></i>
          </button>
        </div>
      </template>
    </DynamicCardComponent>
  </div>
</template>

<script>
import DynamicCardComponent from "@/components/DynamicCardComponent";
import Logo from "@/assets/logo.png";
import Background from "@/assets/pictures/Aussicht DLK.jpg";

export default {
  name: "login",
  components: { DynamicCardComponent },
  data() {
    return {
      username: "",
      email: this.email,
      password: "",
      password_repeat: "",
      authSwitch: false,
      textValues: {
        header: "Logge dich ein!",
        buttonTitle: "Log in",
      },
      Logo,
      Background,
    };
  },
  methods: {
    switchAuth() {
      if (this.authSwitch) {
        this.textValues.header = "Registrier dich!";
        this.textValues.buttonTitle = "Sign in";
      } else {
        this.textValues.header = "Logge dich ein!";
        this.textValues.buttonTitle = "Log in";
      }
      console.log("swtich", this.authSwitch);
    },
    btnTrigger() {
      console.log(this.authSwitch);
      if (this.authSwitch) {
        this.register();
      } else {
        this.login();
      }
    },
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
  mounted() {
    this.switchAuth();
  },
};
</script>
<style scoped>
@media screen and (max-width: 720px) {
  #AuthCard {
    width: 100%;
  }
}
@media (min-width: 860px) {
  #AuthCard {
    width: 30% !important;
  }
}
</style>
