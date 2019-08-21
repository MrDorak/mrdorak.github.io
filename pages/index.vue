<template>
    <div class="container-fluid p-0">
      <section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="about">
        <div class="w-100">
          <h1 class="mb-0">Dorian
            <span class="text-primary">Turle</span>
          </h1>
          <div class="subheading mb-5">
            <span>Français · </span>
            <span v-for="(detail, d) in cv.perso.about" :key="d">
              <span v-if="d === 'mail'"><br><span class="fas fa-envelope"></span><a :href="`mailto:${detail.description}`"> {{ detail.description }}</a></span>
              <span v-else>{{ detail.description }} · </span>
            </span>
          </div>
          <div class="social-icons">
            <a href="https://www.linkedin.com/in/dorian-turle-4a2aa110b/">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/MrDorak">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </div>
      </section>

      <hr class="m-0">

      <section class="resume-section p-3 p-lg-5" id="experience">
        <div>
          <h2 class="mb-5">Experience</h2>

          <div class="mb-5" v-for="(items, i) in cv.pro.experiences" :key="i">

            <div v-if="cv.pro.experiences.travail === items" >
              <div v-for="(item_taf, j) in items" :key="j">
                <div class="resume-date text-md-right">
                  <span class="text-primary">{{ item_taf.duree }}</span>
                </div>

                <div class="resume-content">
                  <h3 class="mb-0">{{ item_taf.role }}</h3>
                  <div class="subheading mb-3">{{ item_taf.lieu }}</div>
                  <p>{{ item_taf.desc }}</p>

                  <ul class="list-inline" v-for="comps in item_taf.competences">
                    <li v-for="(comp_details, c) in comps" :key="c" >
                      <div v-if="c === 0" class="rounded-pill text-center text-light bg-primary mb-3">{{ comp_details }}</div>
                      <div class="ml-3" v-else><i class="fas fa-long-arrow-alt-right"></i> {{ comp_details }}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div v-else v-for="item_stage in items">
              <div class="resume-date text-md-right">
                <span class="text-primary">{{ item_stage.duree }}</span>
              </div>
              <div class="resume-content">
                <h3 class="mb-0">{{ item_stage.role }}</h3>
                <div class="subheading mb-3">{{ item_stage.lieu }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr class="m-0">

      <section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="education">
        <div class="w-100">
          <h2 class="mb-5">Études</h2>

          <div v-for="(items, i) in cv.pro.formations" :key="i">
            <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
              <div class="resume-content">
                <h3 class="mb-0">{{ items.univ }}</h3>
                <div class="subheading mb-3">{{ items.name }}</div>
                <span v-for="(desc, d) in items.description" :key="d" >
                  {{ desc }} <span v-if="d !== Object.keys(items.description).length - 1"> - </span>
                </span>
              </div>
              <div class="resume-date text-md-right">
                <span class="text-primary">{{ items.details }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr class="m-0">

      <section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="skills">
        <div class="w-100">
          <h2 class="mb-5">Compétences</h2>

          <div class="subheading mb-3">Langages de développement &amp; Outils</div>
          <ul class="list-inline dev-icons">
            <li class="list-inline-item">
              <i class="fab fa-html5"></i>
            </li>
            <li class="list-inline-item">
              <i class="fab fa-css3-alt"></i>
            </li>
            <li class="list-inline-item">
              <i class="fab fa-php"></i>
            </li>
            <li class="list-inline-item">
              <i class="fab fa-js-square"></i>
            </li>
            <li class="list-inline-item">
              <i class="fab fa-vuejs"></i>
            </li>
            <li class="list-inline-item">
              <i class="fab fa-laravel"></i>
            </li>
            <li class="list-inline-item">
              <i class="fab fa-sass"></i>
            </li>
            <li class="list-inline-item">
              <i class="fab fa-gulp"></i>
            </li>
            <li class="list-inline-item">
              <i class="fab fa-npm"></i>
            </li>
            <li class="list-inline-item">
              <i class="fab fa-yarn"></i>
            </li>
            <li class="list-inline-item">
              <i class="fab fa-docker"></i>
            </li>
          </ul>

          <div class="subheading mb-3 mt-5">Langues</div>
          <ul class="fa-ul mb-0">
            <li>
              <i class="fa-li fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <span style="margin-left: 5px">Français</span>
            </li>
            <li>
              <i class="fa-li fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star-half-alt"></i>
              <span style="margin-left: 5px">Anglais</span>
            </li>
          </ul>
        </div>
      </section>

      <hr class="m-0">

      <section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="interests">
        <div class="w-100">
          <h2 class="mb-5">Intérêts</h2>
          <p style="font-size: 22px" class="mb-3">Dans mon temps libre, j'aime également : </p>
          <div v-for="l in cv.perso.loisirs">
            <ul class="fa-ul mb-0">
              <li>
                <i class="fa-li fas fa-minus"></i>
                {{ l }}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
  import VueScrollProgress from 'vue-scroll-progress'

  export default {
    data: () => ({
      profil: 'Développeur web',
      cv: {
        pro: {
          formations: {
            dut: {
              univ: 'Université de La Rochelle',
              name: 'DUT Informatique',
              details: 'Septembre 2014 - Juillet 2018',
              description: [
                'Développement d\'une application Java',
                'Création d\'un site web avec Zend Framework',
                'Réalisation d\'un site web à l\'aide de Prestashop',
              ],
            },
            bac: {
              univ: 'Lycée Paul Guérin',
              name: 'Bac Scientifique',
              details: 'Septembre 2011 - Juillet 2014',
              description: ['Option SVT', 'Spécialité Mathémathiques'],
            },
          },
          experiences: {
            travail: {
              '1': {
                lieu: 'Groupe Rhinos',
                duree: 'du 2 Juillet 2018 à aujourd\'hui',
                role: 'Développeur PHP',
                competences: {
                  web: [
                    'Développement web - PHP / JS',
                    'Amélioration de fonctionnalités sur un framework interne',
                    'Développement de sites web de simulation/stimulation, formulaire de parrainage pour de gros clients',
                    'Manipulation de larges BDD',
                    'Utilisation de crons en CLI'
                  ],
                  technos: [
                    'Technologies utilisées',
                    'WkHTMLToPDF',
                    'jQuery / Vue.js',
                    'Vue DatePicker / Transition / Vee-Validate',
                    'Highcharts / Select2 / Datatables / Lobibox',
                    'Sass',
                    'Git / GitHub / CircleCi / Sentry / Capistrano',
                    'Docker',
                    'Webpack / Babel',
                    'NPM / Yarn',
                  ],
                  plateformes: [
                    'Plateformes',
                    'Linux',
                    'Windows'
                  ],
                  gestion: [
                    'Gestion de projet',
                    'Support et maintenance opérationnelle et technique',
                    'JIRA'
                  ],
                },
              },
            },
            stage: {
              '1': {
                lieu: 'Groupe Rhinos',
                duree: 'du 11 Avril au 22 Juin 2018',
                role: 'Stage développeur web',
              },
            },
          },
        },
        perso: {
          about: {
            age: {
              description : '22 ans',
            },
            adresse: {
              description : '17000 La Rochelle',
            },
            mail: {
              description : 'dorianturle@hotmail.fr',
            },
          },
          loisirs: ['Faire du jeu de rôle', 'Cuisiner', 'Lire des livres, des comics', 'Regarder des séries', 'Apprendre le développement mobile'],
          langues: ['Français', 'Anglais'],
        },
      },
    }),
    components: {
      VueScrollProgress
    }
  };
</script>
