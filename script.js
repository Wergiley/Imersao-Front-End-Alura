// BOM DIA | BOA TARDE | BOA NOITE

// Obtém a referência do elemento com o ID "greeting"
const greetingElement = document.getElementById("greeting");

if (greetingElement) {
  // Obtém a hora atual do sistema
  const currentHour = new Date().getHours();

  // Define a saudação com base na hora atual
  const greetingMessage =
    currentHour >= 5 && currentHour < 12
      ? "Bom dia"
      : currentHour >= 12 && currentHour < 18
      ? "Boa tarde"
      : "Boa noite";

  greetingElement.textContent = greetingMessage;
}

// GRID INTELIGENTE
const container = document.querySelector(".offer__list-item");

if (container) {
  const observer = new ResizeObserver(() => {
    const containerWidth = container.offsetWidth;
    const numColumns = Math.max(1, Math.floor(containerWidth / 200));

    container.style.gridTemplateColumns = `repeat(${numColumns}, minmax(200px, 1fr))`;
  });

  observer.observe(container);
}

// Função para carregar os dados dos artistas
async function carregarArtistas() {
  try {
    const response = await fetch("artists.json"); // Caminho atualizado
    if (!response.ok) {
      throw new Error("Erro ao carregar os dados dos artistas.");
    }
    const data = await response.json();
    console.log("Dados carregados:", data);
    return data.artists;
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}

// Função de busca de artistas
async function buscarArtista(nome) {
  const artistas = await carregarArtistas();
  if (!artistas.length) return;

  const resultado = artistas.filter(
    (artista) =>
      artista.name.toLowerCase().includes(nome.toLowerCase()) ||
      artista.genre.toLowerCase().includes(nome.toLowerCase())
  );

  console.log("Resultados encontrados:", resultado);
  exibirResultados(resultado);
}

// Exibir os artistas encontrados
function exibirResultados(artistas) {
  const resultContainer = document.getElementById("result-artist");
  if (!resultContainer) return;

  resultContainer.innerHTML = ""; // Limpa os resultados anteriores

  if (artistas.length === 0) {
    resultContainer.innerHTML = "<p>Nenhum artista encontrado.</p>";
    return;
  }

  artistas.forEach((artista) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `
      <img src="${artista.urlImg}" alt="${artista.name}">
      <p>${artista.name} - ${artista.genre}</p>
    `;
    resultContainer.appendChild(div);
  });

  resultContainer.classList.remove("hidden"); // Mostra os resultados
}

// Evento para capturar a pesquisa
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      console.log("Texto digitado:", event.target.value);
      buscarArtista(event.target.value);
    });
  }
});
