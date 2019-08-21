const cookieparser = process.server ? require('cookieparser') : undefined;

export const actions = {
  async nuxtServerInit({ commit }, { req }) { //not working idk why
    console.log('working!');
    let auth = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        auth = JSON.parse(parsed.auth);
      } catch (err) {
        console.log(err);
      }
    }
    commit('auth/setAuth', auth)
  }
};
