function saveKeyword() {
  const keyword = document.getElementById("keywords").value;
  const format = document.getElementById("format").value;
  console.log("Zadane slovo: ", keyword);
  console.log("Format dokumentu: ", format);

  if (!keyword) {
    alert("Zadej klicove slovo");
    return;
  }

  fetch(search.php, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keyword, format }),
  });
}
function resetInput() {
  const keyword = document.getElementById("keywords");
  const format = document.getElementById("format");
  keyword.value = "";
  format.value = "";
}

function handleClick() {
  saveKeyword();
  resetInput();
}
