document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const questionKey = body.dataset.question; // es: "spring-chicken", "winter-chicken", ecc.

    // Se non c'è data-question (es. result.html), non facciamo nulla
    if (!questionKey) return;

    loadQuestion(questionKey);
});

// Carica le immagini per la domanda corrente dal back-end
async function loadQuestion(questionKey) {
    const res = await fetch(`https://eggtimer-backend.onrender.com/api/${questionKey}`);
    const images = await res.json(); // questo è l'array di oggetti
    const container = document.getElementById("images-container");
    container.innerHTML = ""; // pulisce il contenitore

    images.forEach(imageObject => {
        const img = document.createElement("img");
        img.src = imageObject.imageUrl;         // usa solo la URL
        img.alt = `Opzione ${imageObject.imageUrl}`;
        img.addEventListener("click", () => selectImage(questionKey, imageObject.imageUrl));
        container.appendChild(img);
    });
}

function selectImage(questionKey, imageUrl) {
    // Recupera il vecchio oggetto delle scelte
    let selections = JSON.parse(sessionStorage.getItem("userSelections")) || {};

    // Salva la scelta corrente
    selections[questionKey] = imageUrl;
	
    // Aggiorna lo storage
    sessionStorage.setItem("userSelections", JSON.stringify(selections));

    // Vai alla pagina successiva in ordine fisso
    const currentPage = window.location.pathname.split("/").pop();
    let nextPage;

	console.log("Redirect verso:", nextPage);
    if (currentPage === "index.html") nextPage = "page2.html";
    else if (currentPage === "page2.html") nextPage = "page3.html";
    else if (currentPage === "page3.html") nextPage = "result.html";

    if (nextPage) window.location.href = nextPage;
}

document.addEventListener("DOMContentLoaded", () => {
  const kitchenBg = document.querySelector(".kitchen-bg");
  const icons = ["🍳", "🥚", "🥄", "🍽️", "🥓", "🧈"];

  // Crea un tot di elementi random che cadono
  for (let i = 0; i < 20; i++) {
    const icon = document.createElement("div");
    icon.classList.add("kitchen-icon");
    icon.textContent = icons[Math.floor(Math.random() * icons.length)];
    icon.style.left = `${Math.random() * 100}vw`;
    icon.style.animationDuration = `${5 + Math.random() * 10}s`;
    icon.style.fontSize = `${1 + Math.random() * 2}rem`;
    kitchenBg.appendChild(icon);
  }

});
