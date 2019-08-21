export const state = () => ({
  auth: null,
  login : 'dorianturle@hotmail.fr',
  hash : 'test'
});

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  },
};



