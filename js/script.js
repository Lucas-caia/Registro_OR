document.addEventListener("DOMContentLoaded", () => {

  /**
   * Configura uma lista dinâmica:
   * inputId: ID do campo de entrada.
   * addBtnId: ID do botão que adiciona o item.
   * listUlId: ID da <ul> que mostrará os itens.
   * hiddenFieldId: ID do campo hidden que guardará o valor final.
   */
  function setupDynamicList(inputId, addBtnId, listUlId, hiddenFieldId) {
    const input = document.getElementById(inputId);
    const addBtn = document.getElementById(addBtnId);
    const ul = document.getElementById(listUlId);
    const hiddenField = document.getElementById(hiddenFieldId);
    let items = [];

    // Atualiza o campo oculto com os itens separados por vírgula
    function updateHiddenField() {
      hiddenField.value = items.join(", ");
    }

      // Renderiza os itens da lista, com botão para remoção
    function renderList() {
      ul.innerHTML = "";
      items.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remover";
        removeBtn.addEventListener("click", () => {
          items.splice(index, 1);
          renderList();
          updateHiddenField();
        });
        li.appendChild(removeBtn);
        ul.appendChild(li);
      });
    }

    addBtn.addEventListener("click", () => {
      const value = input.value.trim();
      if (value) {
        items.push(value);
        input.value = "";
        renderList();
        updateHiddenField();
      }
    });
  }

  // Configura a lista dinâmica para cada campo, se os elementos existirem na página

  if(document.getElementById("input-missoes")){
    setupDynamicList("input-missoes", "add-missao", "missoes-ul", "missoes-hidden");
  }

  if(document.getElementById("input-habilidades")){
    setupDynamicList("input-habilidades", "add-habilidade", "habilidades-ul", "habilidades-hidden");
  }

  if(document.getElementById("input-rituais")){
    setupDynamicList("input-rituais", "add-ritual", "rituais-ul", "rituais-hidden");
  }
});
