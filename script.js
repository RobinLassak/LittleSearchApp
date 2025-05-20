function saveKeyword() {
  const keyword = document.getElementById("keywords").value;
  const format = document.getElementById("format").value;
  console.log("Zadane slovo: ", keyword);
  console.log("Format dokumentu: ", format);

  if (!keyword) {
    alert("Zadej klicove slovo");
    return;
  }

  //Odeslani na backend
  fetch("search.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keyword, format }),
  })
    //Kontrola
    .then((response) => response.json())
    .then((data) => {
      console.log("Odpověď z PHP:", data);
    })
    .catch((error) => {
      console.error("Chyba:", error);
    });
}

//Resetovani inputu
function resetInput() {
  const keyword = document.getElementById("keywords");
  const format = document.getElementById("format");
  keyword.value = "";
  format.value = "";
}

//Zavolani funkci po stisknuti tlacitka
function handleClick() {
  saveKeyword();
  resetInput();
}
