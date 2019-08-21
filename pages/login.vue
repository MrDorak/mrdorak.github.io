<template>
  <div class="container mt-5">
    <b-form @submit.prevent="auth" @reset="onReset" v-if="show">

      <b-form-group id="login" label="Login :" label-for="login_input">
        <b-form-input id="login_input" v-model="form.login" required></b-form-input>
      </b-form-group>

      <b-form-group id="password" label="Mot de passe :" label-for="password_input">
        <b-form-input type="password" v-model="form.password" id="password_input" required></b-form-input>
      </b-form-group>

      <div class="mt-3 text-center">
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
  const Cookie = process.client ? require('js-cookie') : undefined;

  export default {
    data: () => ({
      form : {
        login : null,
        password : null,
      },
      show: true
    }),
    methods: {
      auth() {
        let login = this.form.login;
        let password = this.form.password;
        if (this.$store.state.auth.login === login && this.$store.state.auth.hash === password) {
          setTimeout(() => {
            const auth = {
              accessToken: 'logged'
            };
            this.$store.commit('auth/setAuth', auth);
            Cookie.set('auth', auth);
            this.$router.push('/');
          }, 1000);
        } else {
          alert('Mot de passe ou login incorrect !');
        }
      },
      onReset(e) {
        e.preventDefault();
        this.form.login = '';
        this.form.password = '';
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        })
      },
    },
  }
</script>
