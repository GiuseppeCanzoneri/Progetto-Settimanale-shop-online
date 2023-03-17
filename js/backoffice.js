const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");

const endpoint = selectedId
  ? "https://striveschool-api.herokuapp.com/api/product/" + selectedId
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = selectedId ? "PUT" : "POST";

const handleValidate = () => {
  const form = document.querySelector("form");
  form.classList.add("validated");
};

window.onload = async () => {
  if (selectedId) {
    document.getElementById("subtitle").innerText = " — Modifica Telefono";
    document.getElementById("delete-btn").classList.remove("d-none");

    try {
      const resp = await fetch(endpoint, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0M2QzZmY4MWI0MjAwMTM5YjI4NzUiLCJpYXQiOjE2NzkwNjAxOTQsImV4cCI6MTY4MDI2OTc5NH0.g3cNV2ElpeaMGnZ6W1_Dw8km--PT_RFgViH_Mo9onUY",
        },
      });
      const telephoneData = await resp.json();
      const { name, description, brand, price } = telephoneData;

      document.getElementById("name").value = name;
      document.getElementById("description").value = description;
      document.getElementById("price").value = price;
      document.getElementById("brand").value = brand;

      const sbmtBtn = document.querySelector("button[type='submit']");
      sbmtBtn.classList.remove("btn-primary");
      sbmtBtn.classList.add("btn-success");
      sbmtBtn.innerText = "Modifica";
    } catch (error) {
      console.log(error);
    }
  }
};

const handleSubmit = async event => {
  event.preventDefault();

  const newTelephone = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    time: document.getElementById("brand").value,
  };

  console.log("HERE ON SUBMIT", newTelephone);

  try {
    isLoading(true);
    const resp = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method,
      body: JSON.stringify(newTelephone),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0M2QzZmY4MWI0MjAwMTM5YjI4NzUiLCJpYXQiOjE2NzkwNjAxOTQsImV4cCI6MTY4MDI2OTc5NH0.g3cNV2ElpeaMGnZ6W1_Dw8km--PT_RFgViH_Mo9onUY",
      },
    });

    if (resp.ok) {
      const newTelObj = await resp.json();

      if (selectedId) {
        alert("Risorsa con l'id " + newTelObj._id + ", modificata con successo");
      } else {
        alert("Risorsa con l'id " + newTelObj._id + ", creata con successo");
      }
    } else {
      throw new Error("La richiesta non è andata a buon fine");
    }
  } catch (error) {
    alert(error);
  } finally {
    isLoading(false);
  }
};

window.onload = async () => {
  if (selectedId) {
    document.getElementById("subtitle").innerText = " — Modifica Telefono";
    document.getElementById("delete-btn").classList.remove("d-none");

    try {
      const resp = await fetch(endpoint, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0M2QzZmY4MWI0MjAwMTM5YjI4NzUiLCJpYXQiOjE2NzkwNjAxOTQsImV4cCI6MTY4MDI2OTc5NH0.g3cNV2ElpeaMGnZ6W1_Dw8km--PT_RFgViH_Mo9onUY",
        },
      });
      const telephoneData = await resp.json();
      const { name, description, brand, price } = telephoneData;

      document.getElementById("name").value = name;
      document.getElementById("description").value = description;
      document.getElementById("price").value = price;
      document.getElementById("brand").value = brand;

      const sbmtBtn = document.querySelector("button[type='submit']");
      sbmtBtn.classList.remove("btn-primary");
      sbmtBtn.classList.add("btn-success");
      sbmtBtn.innerText = "Modifica";
    } catch (error) {
      console.log(error);
    }
  }
};

const handleDelete = async () => {
  isLoading(true); // loader diventa visibile

  const hasAccepted = confirm("Sei convinto di voler elimilare il modello ?");
  if (hasAccepted) {
    try {
      console.log("DELETE");

      const resp = await fetch(endpoint, { method: "DELETE" });
      const deletedObj = await resp.json();

      alert("Hai eliminato il telefono " + deletedObj.name);
      window.location.assign("./index.html");
    } catch (error) {
      console.log(error);
    } finally {
      isLoading(false);
    }
  }
};

const isLoading = loadingState => {
  const spinner = document.querySelector(".spinner-border");
  if (loadingState) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
