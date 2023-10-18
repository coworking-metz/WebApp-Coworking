export function afterOneHour(codeToExecute) {
  return setTimeout(codeToExecute, 3600000); // 1 hour in milliseconds
}
export async function sha1(input) {
  const msgBuffer = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

// Fonction pour gérer la soumission du formulaire de connexion
export function connexion(response) {
  if (response.user) {
    // Authentification réussie
    auth.identifiant = response.user.login;
    auth.id = response.user.id;
    auth.name = response.user.name;
    auth.session = response.user.session_id;
    auth.fresh = true;

    reglages.reset();
    reglages.droits = response.reglages.droits;
    reglages.settings = response.reglages.settings;
    reglages.admin = response.reglages.admin;
    router.push("/"); // Redirection vers la page d'accueil
  } else if (response?.code) {
    // Gestion des erreurs d'authentification
    return alert(response.message);
  }
}
