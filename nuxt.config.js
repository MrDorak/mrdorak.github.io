import pkg from './package'

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/'
  }
} : {};

export default {
  mode: 'spa',

  router: {
    base: '/'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Personal Website - Dorian Turle',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:500,700'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Muli:400,400i,800,800i'
      },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    './node_modules/@fortawesome/fontawesome-free/css/all.min.css',
    '~/assets/css/resume.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '@/plugins/vue-scroll-progress'},
    {src: '@/plugins/vue-scrollactive'},
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt'
  ],
}
