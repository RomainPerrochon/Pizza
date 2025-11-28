/* ================================
   MUSIQUE DE FOND + VOLUME
   ================================ */
// Injecter la musique et le contrôle du volume si absents
window.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("musiqueFond")) {
    const volumeControl = document.createElement("div");
    volumeControl.className = "volume-control";
    volumeControl.innerHTML = `
      <label for="volume">🔊 Volume : </label>
      <input type="range" id="volume" min="10" max="100" step="1" value="50">
    `;

    const audio = document.createElement("audio");
    audio.id = "musiqueFond";
    audio.autoplay = true;
    audio.loop = true;
    audio.innerHTML = `<source src="musiqueFond.mp3" type="audio/mpeg">Votre navigateur ne supporte pas l’audio HTML5.`;

    // Placer avant le contenu principal (après header si trouvé)
    const header = document.querySelector("header");
    if (header) {
      header.insertAdjacentElement("afterend", volumeControl);
      header.insertAdjacentElement("afterend", audio);
    } else {
      document.body.prepend(volumeControl);
      document.body.prepend(audio);
    }

    // Gestion du volume
    const slider = volumeControl.querySelector("#volume");
    slider.addEventListener("input", () => {
      audio.volume = slider.value / 100;
    });

    // Volume par défaut
    audio.volume = 0.5;

    // Déblocage navigateur (au clic si autoplay bloqué)
    window.addEventListener("click", () => {
      audio.muted = false;
    }, { once: true });
  }
});

/* ================================
   MODE SOMBRE
   ================================ */
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

/* ================================
   DÉCONNEXION
   ================================ */
function logout() {
  localStorage.removeItem("sessionUser");
  window.location.href = "identification.html";
}

/* ================================
   MOT DE PASSE OUBLIER
   ================================ */
function forgotPassword() {
  const email = prompt("Entrez votre email pour réinitialiser votre mot de passe :");
  if (!email) return;
  const user = JSON.parse(localStorage.getItem(email));
  if (user) {
    alert("📧 Un lien fictif de réinitialisation a été envoyé à " + email);
  } else {
    alert("❌ Cet email n'existe pas.");
  }
}
