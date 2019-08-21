<template>
  <div class="m-5">
    <b-form @submit.prevent="fetchGw2Data">

      <b-form-group label="Rentrer la clé d'api :" label-for="api_key_input">
        <b-form-input id="api_key_input" v-model="api_key" required></b-form-input>
      </b-form-group>

      <div class="mt-3 mb-3 text-center">
        <b-button type="submit" variant="primary">Envoyer</b-button>
      </div>
    </b-form>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-dark mt-5" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <b-table v-else striped hover :items="items" :fields="fields">
      <template slot="equipment" slot-scope="row">
        <span v-html="row.item.equipment"></span>
      </template>
      <template slot="specializations" slot-scope="row">
        <span v-html="row.item.specializations"></span>
      </template>
      <template slot="skills" slot-scope="row">
        <span v-html="row.item.skills"></span>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    middleware: 'notAuthenticated',
    data: () => ({
      fields: ['name', 'level', 'profession', 'race', 'guild', 'age', 'specializations', 'skills', 'equipment'],
      items: [],
      loading: false,
    }),
    computed: {
      api_key: {
        set(api_key) {
          this.$store.commit('SET_API_KEY', { api_key })
        },
        get() {
          return this.$store.state.gw2.api_key
        }
      },
    },
    methods: {
      fetchGw2Data() {
        this.loading = true;
        this.$store.dispatch("gw2/fetchChars")
        .then(async () => {
          for (var index = 0; index < this.$store.state.gw2.characters.length ; index ++) {
            await this.$store.dispatch("gw2/fetchCharDetails", { name : this.$store.state.gw2.characters[index], index })
            .then(res => {
              res.age = Math.round(res.age/3600*100) / 100 + 'h';
              this.items.push(res);
              return true
            })
          }
        }).then(() => this.loading = false)
      }
    },
  }
</script>

<style lang="scss">
  .p-tooltip {
    position: relative;
    display: inline-block;

    .p-tooltiptext {
      visibility: hidden;
      width: 350px;
      background-color: black;
      color: #fff;
      text-align: center;
      padding: 5px 0;
      border-radius: 6px;

      position: absolute;
      z-index: 9999;
      bottom: 100%;
      left: 50%;
      margin-left: -185px;
    }
  }

  .p-tooltip:hover .p-tooltiptext {
    visibility: visible;
  }

  .p-tooltiptext:hover {
    display: none;
  }

  .p-space {
    display: block;
  }

  .p-size {
    max-width: 64px;
    max-height: 64px;
  }

  .p-container-spe {
    width: 318px;
  }

  .p-container-skills {
    width: 350px;
  }

  .p-description {
    font-style: italic;
    font-size: 11px;
  }

  .p-right {
    position: absolute;
    right: 8%;
  }

  .p-left {
    position: absolute;
    left: 8%;
  }

  .p-under {
    padding: 3em 0 0.5em 0;
  }

  .Fine {
    color: #62A4DA;
  }

  .Masterwork {
    color: #1a9306;
  }

  .Rare {
    color: #fcd00b;
  }

  .Exotic {
    color: #ffa405;
  }

  .Ascended {
    color: #fb3e8d;
  }

  .Legendary {
    color: #4C139D;
  }

</style>
