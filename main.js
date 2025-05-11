const gallery = document.getElementById("gallery");
const btnSearch = document.getElementById("search");
const paraH2 = document.querySelector("h2");
const inpText = document.getElementById("inpText");
let currentPage = 1;

async function loadImages(page, limit) {
  const res = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
  );
  const data = await res.json();
  console.log(limit);

  gallery.innerHTML = "";

  for (const img of data) {
    const image = document.createElement("img");
    image.src = img.download_url;
    image.height = 140;
    image.loading = "lazy";
    image.width = 200;
    gallery.appendChild(image);
  }
}
btnSearch.addEventListener("click", () => {
  if (inpText.value.trim() === "") {
    alert("Renseigne le champ de texte!");
    return;
  }

  const limit = parseInt(inpText.value);

  if (limit <= 0 || isNaN(limit)) {
    gallery.innerHTML = "";
    console.log("Valeur invalide :", inpText.value);
    return;
  }

  currentLimit = limit;
  loadImages(currentPage, currentLimit);
});

document.getElementById("next").addEventListener("click", () => {
  if (currentPage < 17) {
    currentPage++;
    paraH2.textContent = `Page : ${currentPage}`;
  } else {
    paraH2.textContent = "Page : 17";
  }
  if (inpText.value == "") {
    alert("Tu peux pas!");
    paraH2.textContent = "Page : 1";
    currentPage = 1;
  }
  loadImages(currentPage, currentLimit);
});

document.getElementById("return").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    paraH2.textContent = `Page : ${currentPage}`;
  } else {
    paraH2.textContent = `Page : 1`;
  }
  if (inpText.value == "") {
    alert("Tu peux pas!");
    paraH2.textContent = "Page : 1";
    currentPage = 1;
  }
  loadImages(currentPage, currentLimit);
});
