const fetchData = async () => {
  console.log("pre");

  try {
    const resp = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0M2QzZmY4MWI0MjAwMTM5YjI4NzUiLCJpYXQiOjE2NzkwNjAxOTQsImV4cCI6MTY4MDI2OTc5NH0.g3cNV2ElpeaMGnZ6W1_Dw8km--PT_RFgViH_Mo9onUY",
      },
    });
    console.log("RESP", resp);

    if (resp.status === 400) throw new Error("Errore nella richiesta, probabilmente mal formata (400)");
    if (resp.status === 404) throw new Error("Non abbiamo trovato la risorsa (404)");
    if (!resp.ok) throw new Error("Abbiamo un problema con la fetch");

    const telephones = await resp.json();

    const list = document.getElementById("telephone-list");
    telephones.forEach(telephone => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex align-items-center";
      li.innerHTML = `<h3 class="me-auto">${telephone.name}</h3> <span class="badge text-bg-dark me-3">${telephone.price}€</span>
      <p>${telephone.brand}</p>
      <p>${telephone.description}</p>
      <a href="./details.html?id=${telephone._id}">Scopri di più</a>`;
      list.appendChild(li);
    });
    console.log(telephones);
  } catch (err) {
    alert("QUI SIAMO NEL CATCH " + err.message);
  }

  console.log("post");
};

window.onload = () => {
  fetchData();

  console.log("LAST OF ONLOAD");
};
