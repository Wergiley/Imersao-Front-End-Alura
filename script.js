//BOM DIA | BOA TARDE | BOA NOITE

// Obtém a referência do elemento com o ID "greeting"
const greetingElement = document.getElementById("greeting");

// Obtém a hora atual do sistema
const currentHour = new Date().getHours();

// Define a saudação com base na hora atual
// if (currentHour >= 5 && currentHour < 12) {
//   greetingElement.textContent = "Bom dia";
// } else if (currentHour >= 12 && currentHour < 18) {
//   greetingElement.textContent = "Boa tarde";
// } else {
//   greetingElement.textContent = "Boa noite";
// }

// Forma mais simples
const greetingMessage =
  currentHour >= 5 && currentHour < 12
    ? "Bom dia"
    : currentHour >= 12 && currentHour < 18
    ? "Boa tarde"
    : "Boa noite";

greetingElement.textContent = greetingMessage;

// GRID INTELIGENTE
const container = document.querySelector(".offer__list-item");

const observer = new ResizeObserver(() => {  //mudanças no tamanho do elemento 
  const containerWidth = container.offsetWidth; //largura total do elemento, incluindo largura do conteúdo, bordas e preenchimento.
  const numColumns = Math.floor(containerWidth / 200); //número de colunas com base na largura do container

  //largura mínima de 200px e máxima de 1fr (uma fração do espaço disponível).
  container.style.gridTemplateColumns = `repeat(${numColumns}, minmax(200px, 1fr))`;

  console.log({ container });
  console.log({ numColumns });
});
//observando a mudança do elemento
observer.observe(container);

//---------------------------------------------------------------------------
// Função para carregar os dados dos artistas
async function carregarArtistas() {
  try {
    const response = await fetch('artists.json'); // Verifica se o caminho está correto
    if (!response.ok) {
      throw new Error('Erro ao carregar os dados dos artistas.');
    }
    const data = await response.json();
    return data.artists;
  } catch (error) {
    console.error('Erro:', error);
    return [];
  }
}

// Função de busca de artistas
async function buscarArtista(nome) {
  const artistas = await carregarArtistas();
  const resultado = artistas.filter(artista => artista.name.toLowerCase().includes(nome.toLowerCase()));

  if (resultado.length > 0) {
    exibirResultados(resultado);
  } else {
    console.log('Nenhum artista encontrado.');
  }
}

// Exibir os artistas encontrados
function exibirResultados(artistas) {
  const resultContainer = document.getElementById('result-artist');
  resultContainer.innerHTML = ''; // Limpa os resultados anteriores

  artistas.forEach(artista => {
    const div = document.createElement('div');
    div.classList.add('artist-card');
    div.innerHTML = `
      <img src="${artista.urlImg}" alt="${artista.name}">
      <p>${artista.name} - ${artista.genre}</p>
    `;
    resultContainer.appendChild(div);
  });

  resultContainer.classList.remove('hidden'); // Mostra os resultados
}

// Evento para capturar a pesquisa
document.getElementById('search-input').addEventListener('input', (event) => {
  buscarArtista(event.target.value);
});

