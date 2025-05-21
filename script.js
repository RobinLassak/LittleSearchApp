function actionDownload() {
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
      if (data.error) {
        alert(data.error);
        return;
      }

      //Rozdeleni a prevedeni dat do daneho formatu
      switch (format) {
        case "json":
          content = JSON.stringify(data, null, 2);
          mimeType = "application/json";
          fileExtension = "json";
          break;
        case "csv":
          const header = "Title,Link,Snippet\n";
          const rows = data.map(
            (item) =>
              `"${item.title.replace(/"/g, '""')}","${
                item.link
              }","${item.snippet.replace(/"/g, '""')}"`
          );
          content = header + rows.join("\n");
          mimeType = "text/csv";
          fileExtension = "csv";
          break;
        case "xml":
          content = `<?xml version="1.0" encoding="UTF-8"?>\n<results>\n`;
          data.forEach((item) => {
            content += `  <item>\n`;
            content += `    <title>${escapeXml(item.title)}</title>\n`;
            content += `    <link>${escapeXml(item.link)}</link>\n`;
            content += `    <snippet>${escapeXml(item.snippet)}</snippet>\n`;
            content += `  </item>\n`;
          });
          content += `</results>`;
          mimeType = "application/xml";
          fileExtension = "xml";
          break;
        default:
          content = data
            .map(
              (item) =>
                `Title: ${item.title}\nLink: ${item.link}\nSnippet: ${item.snippet}\n`
            )
            .join("\n\n");
          fileExtension = "txt";
          break;
      }
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `vysledky.${fileExtension}`;
      a.click();
      URL.revokeObjectURL(url);
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
  actionDownload();
  resetInput();
}
