export const state = () => ({
  proxy_url : 'https://cors-anywhere.herokuapp.com/',
  base_url : 'https://api.guildwars2.com/',
  access_token : '?access_token=',
  api_key : 'F8587A77-208A-F44D-8C7F-1887CB186B6455FA3DC2-E0F1-492F-9467-D4A1D13DE383',
  characters : [],
});

export const mutations = {
  SET_CHARS(state, response) {
    state.characters = response
  },
  SET_CHARS_DETAILS(state, payload) {
    state.characters[payload.index] = payload.response
  },
  SET_API_KEY(state, api_key) {
    state.api_key = api_key
  },
};

export const actions = {
  fetchChars({ commit }) {
    return fetch(this.state.gw2.proxy_url + this.state.gw2.base_url + 'v2/characters/' + this.state.gw2.access_token + this.state.gw2.api_key)
    .then(response => response.json())
    .then(response => {
      commit("SET_CHARS", response);
    });
  },

  fetchCharDetails({ commit }, payload) {
    return fetch(this.state.gw2.proxy_url + this.state.gw2.base_url + 'v2/characters/' + payload.name + '/' + this.state.gw2.access_token  + this.state.gw2.api_key)
      .then(response => response.json())
      .then(response => {
        this.dispatch('gw2/fetchGuildDetails', { guild : response.guild } , { root: true })
          .then(res => response.guild = res);

        this.dispatch('gw2/fetchSpecializationDetails', { specializations : response.specializations } , { root: true })
          .then(res => {
            res === '' ? res = '<h3 class="p-space text-center">Aucune spécialisation</h3>' : null;
            response.specializations = res
          });

        this.dispatch('gw2/fetchSkillsDetails', { skills : response.skills } , { root: true })
          .then(res => response.skills = res);

        this.dispatch('gw2/fetchInventoryDetails', { equipment : response.equipment } , { root: true })
          .then(res => response.equipment = res);

        commit("SET_CHARS_DETAILS", {index : payload.index, response});
        return response;
      })
  },

  async fetchGuildDetails({ commit }, { guild }){
    return fetch(this.state.gw2.proxy_url + this.state.gw2.base_url + 'v1/guild_details?guild_id=' + guild)
    .then(response => response.json())
    .then(responseData => {
      return '[' + responseData.tag + '] ' + responseData.guild_name
    })
  },

  async fetchInventoryDetails({ commit }, { equipment }){
    equipment = equipment.map(e => e['id']).join();
    return fetch(this.state.gw2.proxy_url + this.state.gw2.base_url + 'v2/items?ids=' + equipment)
    .then(response => response.json())
    .then(responseData => {
      let resp = '';
      let type = 'Armor';
      responseData.forEach(function(e) {
        if (type !== e.type){
          resp += '<h3 class="text-center">' + e.type + '</h3>';
          type = e.type;
        }

        resp += '<div class="p-tooltip">' +
            '<img src="'+e.icon+'" alt="'+e.name+'" />' +
            '<span class="p-tooltiptext">' +
              '<strong class="'+e.rarity+' p-space">'+e.name+'</strong>';

        if (e.description) {
          resp += '<div class="p-description p-space">'+e.description+'</div>'
        }

        resp +=  '<div class="p-space">Level ' + e.level + '</div><div class="p-space">';

        if (e.type === "Weapon") {
          resp += e.details.type + '</div>' +
            '<div class="p-space">Weapon Strength : ' + e.details.min_power + '-' + e.details.max_power
        } else if (e.type === "Armor") {
          resp += e.details.weight_class + ' ' + e.details.type + ' armor</div>' +
            '<div class="p-space">Defense : ' + (e.details.defense ? e.details.defense : 0);
        }

        resp += '</div>';

        if (e.details.infix_upgrade && e.details.infix_upgrade.attributes.length > 0){
          e.details.infix_upgrade.attributes.forEach(function(el) {
            resp += '<div class="p-space">+' + el.modifier + ' ' + el.attribute + '</div>';
          });
        }

        resp += '</span></div>';
      });

      return resp
    })
  },

  async fetchSpecializationDetails({ commit }, { specializations }){
    let resp = '';
    for (let s1 in specializations) {
      if (specializations[s1][0] === null) break;

      var specializations_ids = specializations[s1].map(s => s['id']).join();
      var specializations_traits = specializations[s1].map(s => s['traits']).join();
      var specializations_icons = [];

      await fetch(this.state.gw2.proxy_url + this.state.gw2.base_url + 'v2/specializations?ids=' + specializations_ids)
      .then(response => response.json())
      .then(responseData => responseData.forEach(r1 => specializations_icons[r1.id] = [r1.icon]));

      await fetch(this.state.gw2.proxy_url + this.state.gw2.base_url + 'v2/traits?ids=' + specializations_traits)
      .then(response => response.json())
      .then(responseData => responseData.forEach(r1 => {
        specializations_icons[r1.specialization] = specializations_icons[r1.specialization] || [];
        specializations_icons[r1.specialization]['traits'] = specializations_icons[r1.specialization]['traits'] || [];
        specializations_icons[r1.specialization]['traits'].push(r1)
      }));

      resp += '<div class="p-container-spe">' +
        '<h3 class="p-space text-center"><u>'+ s1.toUpperCase() +'</u></h3>';
      specializations_icons.forEach(e1 => {
        resp += '<img src="'+e1[0]+'" alt="" />  ';
        e1.traits.forEach(e2 => {
          resp += '<div class="p-tooltip">' +
            '<img class="p-size" src="'+e2.icon+'" alt="'+e2.name+'" />' +
            '<span class="p-tooltiptext">' +
            '<strong class="p-space">'+e2.name+'</strong>' +
            '<div class="p-description p-space">'+e2.description+'</div>' +
            '</span> </div> &mdash; ';
        });
        resp = resp.slice(0, -8);
      });
      resp += '<div class="p-space"></div></div>';
    }
    return resp
  },

  async fetchSkillsDetails({ commit }, { skills }){
    let resp = '';
    for (let s1 in skills) {
      if (skills[s1]['heal'] === null) break;

      let utilities = Object.keys(skills[s1]['utilities']).map(k => skills[s1]['utilities'][k]).filter(x => x).join();

      let ids = skills[s1]['heal'] + (utilities ? ',' + utilities : '') + (skills[s1]['elite'] ? ',' + skills[s1]['elite'] : '');

      resp += '<div class="p-container-skills">' +
        '<h3 class="p-space text-center"><u>'+ s1.toUpperCase() +'</u></h3>';
      await fetch(this.state.gw2.proxy_url + this.state.gw2.base_url + 'v2/skills?ids=' + ids)
      .then(response => response.json())
      .then(responseData => {
        responseData.forEach(e1 => {
          resp += '<div class="p-tooltip">' +
            '<img class="p-size" src="'+e1.icon+'" alt="'+e1.name+'" />' +
            '<span class="p-tooltiptext">' +
            '<strong class="p-space p-left">'+e1.name+'</strong>';

          e1.facts.forEach(e2 => {
            if (e2.type === 'Recharge'){
              resp += '<div class="p-right">' + e2.value + '<img class="p-size" width="16px" src="'+e2.icon+'" alt="" /></div>'
            }
          });
          resp += '<div style="width: 100%" class="p-description p-space p-under">'+e1.description+'</div>' + '</span> </div>';
        });
      });
      resp += '<div class="p-space"></div></div>';
    }
    return resp
  }
};
