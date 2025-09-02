const leyesContainer = document.getElementById("leyes-container");
const searchInput = document.getElementById("searchInput");
const temaFilter = document.getElementById("temaFilter");
const checkboxes = document.querySelectorAll(".filter");

let leyes = [];

fetch("data/leyes.json")
  .then(res => res.json())
  .then(data => {
    leyes = data;
    renderLeyes();
  });

function renderLeyes() {
  const query = searchInput.value.toLowerCase();
  const tema = temaFilter.value;
  const niveles = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const filtered = leyes.filter(ley =>
    ley.nombre.toLowerCase().includes(query) &&
    (tema === "" || ley.tema === tema) &&
    niveles.includes(ley.nivel)
  );

  leyesContainer.innerHTML = "";

  filtered.forEach(ley => {
    const div = document.createElement("div");
    div.className = "ley";
    div.innerHTML = `
      <h3>${ley.nombre}</h3>
      <p><strong>Tema:</strong> ${ley.tema}</p>
      <p><strong>Nivel:</strong> ${ley.nivel}</p>
      <p><strong>Relacionadas:</strong> ${ley.relacionadas.join(", ")}</p>
    `;
    leyesContainer.appendChild(div);
  });
}

searchInput.addEventListener("input", renderLeyes);
temaFilter.addEventListener("change", renderLeyes);
checkboxes.forEach(cb => cb.addEventListener("change", renderLeyes));