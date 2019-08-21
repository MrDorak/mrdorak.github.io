<template>
  <div id="page-top">
    <scrollactive class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" :class="{ 'navbarOpen': show }" id="sideNav">
      <nuxt-link v-if="isLogged" class="btn btn-toolbar" to="/login">Connexion</nuxt-link>
      <button v-else class="btn btn-toolbar nav-item" @click="logout">Déconnexion</button>
      <nuxt-link class="navbar-brand js-scroll-trigger" to="/">
        <span class="d-block d-lg-none">Dorian Turle</span>
        <span class="d-none d-lg-block">
          <img class="img-fluid img-profile rounded-circle mx-auto mb-2" src="../assets/img/pp_2019.jpg" alt=""/>
        </span>
      </nuxt-link>
      <button class="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" @click="toggleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent" :class="{ 'show': show }">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="(item, i) in items" :key="i" >
            <a v-if="isLogged" class="nav-link js-scroll-trigger scrollactive-item" :href="'#'+item.to">{{ item.title }}</a>
            <nuxt-link v-else="isLogged" class="nav-link js-scroll-trigger" :to="item.to">{{ item.title }}</nuxt-link>
          </li>
        </ul>
      </div>
      <a class="dot" href="#page-top">^</a>
    </scrollactive>
    <nuxt />
  </div>
</template>

<script>
  const Cookie = process.client ? require('js-cookie') : undefined;

  export default {
    scrollToTop: true,
    data() {
      return {
        show: false,
      }
    },
    methods: {
      toggleNavbar() {
        this.show = !this.show;
      },
      logout () {
        Cookie.remove('auth');
        this.$store.commit('auth/setAuth', null);
        this.$router.push('/')
      }
    },
    computed: {
      items () {
        if (this.isLogged) {
          return this.$store.state.nav.resume
        } else {
          return this.$store.state.nav.logged
        }
      },
      isLogged() {
        return !this.$store.state.auth.auth;
      }
    }
  }
</script>

<style>
  a.dot {
    width: 50px;
    height: 50px;
    border-radius: 50%;

    font-size: 25px;
    color: white;
    line-height: 50px;
    text-align: center;
    opacity: 0.85;
    background: #BD5D36;

    position: fixed;
    right: 70px;
    bottom: 50px;

    text-decoration: none;
  }

  a:hover.dot {
    animation: bounce 0.7s ease-out infinite alternate;
    -webkit-animation: bounce 0.7s ease-out infinite alternate;
  }

  @keyframes bounce {
    from { transform: translateY(0); }
    to   { transform: translateY(-10px); }
  }

  @-webkit-keyframes bounce {
    from { transform: translateY(0); }
    to   { transform: translateY(-10px); }
  }
</style>
