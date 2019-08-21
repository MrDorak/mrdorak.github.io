export default function ({ store, redirect }) {
  // Si l'utilisateur est non authentifié, aller à la page d'accueil
  if (!store.state.auth.auth) {
    return redirect('/')
  }
}
