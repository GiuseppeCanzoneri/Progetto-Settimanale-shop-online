const URLParams = new URLSearchParams(window.location.search);

const selectedId = URLParams.get("id");
console.log("SELECTED ID: ", selectedId);
window.onload = async () => {
  const container = document.getElementById("telephone-details");
  try {
    const resp = await fetch("https://striveschool-api.herokuapp.com/api/product/" + selectedId);
    const telephoneData = await resp.json();

    const { _id, name, description, price, brand } = telephoneData;

    container.innerHTML = `
              <h1 class="fw-bold">${name}</h1>
              <p class="font-monospace">${description}</p>
              <span class="badge text-bg-dark">${brand}</span>
              <p>${price}€</p>
              <h6 class="bg-light py-3 ps-2">Server Details</h6>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item ps-2"><strong>id:</strong> ${_id}</li>
              </ul>
              <button class="btn btn-success mt-3" onclick="handleClick()">Modifica</button>
              `;
  } catch (err) {
    console.log(err);
  }
};

const handleClick = () => {
  window.location.assign("./backoffice.html?id=" + selectedId);
};
