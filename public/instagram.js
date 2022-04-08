console.log("instagram.js loaded");

const imagesEl = document.getElementById("images");
const data = fetch("/images")
  .then((res) => res.json())
  .then((JSON) => {
    const data_sliced = JSON.data.slice(0, 8);
    console.log(data_sliced);
    data_sliced.forEach((image) => {
      const img = document.createElement("img");
      img.src = image.media_url;
      img.className = "image d-flex justify-content-between";
      imagesEl.appendChild(img);
    });
  });
