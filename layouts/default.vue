<template>
  <div id="page-top">
    <scrollactive class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" :class="{ 'navbarOpen': show }" id="sideNav">
      <a class="navbar-brand js-scroll-trigger" href="#page-top">
        <span class="d-block d-lg-none">Dorian Turle</span>
        <span class="d-none d-lg-block">
          <img class="img-fluid img-profile rounded-circle mx-auto mb-2" src="../assets/img/pp_2019.jpg" alt=""/>
        </span>
      </a>
      <button class="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" @click="toggleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent" :class="{ 'show': show }">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="(item, i) in items" :key="i" >
            <a class="nav-link js-scroll-trigger scrollactive-item" :href="'#'+item.to">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </scrollactive>
    <nuxt />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        items: [
          {
            title: 'À propos',
            to: 'about'
          },
          {
            title: 'Expériences',
            to: 'experience'
          },
          {
            title: 'Études',
            to: 'education'
          },
          {
            title: 'Compétences',
            to: 'skills'
          },
          {
            title: 'Intérêts',
            to: 'interests'
          },
        ],
      }
    },
    methods: {
      toggleNavbar(){
        this.show = !this.show;
      }
    }
  }
</script>
