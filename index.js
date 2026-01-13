const colorInput = document.getElementById("seed-color");
const schemeSelect = document.getElementById("scheme-mode");
const getBtn = document.getElementById("get-scheme");
const container = document.getElementById("color-container");

getBtn.addEventListener("click", () => {
  const seedHex = colorInput.value.substring(1);
  const mode = schemeSelect.value;

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedHex}&mode=${mode}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      renderColors(data.colors);
    });
});

//render the colors

function renderColors(colorsArray) {
  let html = "";
  colorsArray.forEach((color) => {
    const hex = color.hex.value;
    html += `
            <div class="color-column">
                <div class="color-swatch" style="background-color: ${hex}" data-hex="${hex}"></div>
                <p class="hex-value" data-hex="${hex}">${hex}</p>
            </div>
        `;
  });
  container.innerHTML = html;
}

/*Click to copy*/

container.addEventListener("click", (e) => {
  const hex = e.target.dataset.hex;
  if (hex) {
    navigator.clipboard.writeText(hex);
    alert(`Copied ${hex} to clipboard!`);
  }
});
