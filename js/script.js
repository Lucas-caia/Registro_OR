document.addEventListener("DOMContentLoaded", () => {
  const registrosContainer = document.getElementById("registros-container");
  const addButton = document.getElementById("add-button");

  const registros = [
    { nome: "Jogador 1", vida: 100, sanidade: 50, dinheiro: 200, pm: 5 },
    { nome: "Jogador 2", vida: 80, sanidade: 40, dinheiro: 150, pm: 3 },
    { nome: "Jogador 3", vida: 90, sanidade: 60, dinheiro: 180, pm: 4 }
  ];

  function carregarRegistros() {
    registrosContainer.innerHTML = "";
    registros.forEach((registro) => {
      const div = document.createElement("div");
      div.classList.add("registro");
      div.innerHTML = `
                <strong>${registro.nome}</strong><br>
                Vida: ${registro.vida}<br>
                Sanidade: ${registro.sanidade}<br>
                Dinheiro: ${registro.dinheiro}<br>
                PM: ${registro.pm}
            `;
      registrosContainer.appendChild(div);
    });
  }

  carregarRegistros();

  addButton.addEventListener("click", () => {
    window.location.href = "add.html"; // Vai para a página de adicionar registros
  });
});
