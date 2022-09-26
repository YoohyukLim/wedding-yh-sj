function createBoard(items) {
    const board = document.getElementById("board_items");

    items.shift();
    items.sort(function(a, b) {
        return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
    });
    items.forEach(element => {
        let div_item = document.createElement("div");
        let div_content = document.createElement("span");
        let div_div = document.createElement("div");
        let div_author = document.createElement("div");
        let div_timestamp = document.createElement("timestamp");

        div_item.className = "item";
        div_author.className = "author";
        div_timestamp.className = "timestamp";

        div_content.textContent = element[2];
        div_author.textContent = element[1];
        div_timestamp.textContent = element[0];

        div_item.appendChild(div_content);
        div_item.appendChild(div_div);
        div_div.appendChild(div_author);
        div_div.appendChild(div_timestamp);

        board.appendChild(div_item);
    });
}

fetch('https://sheets.googleapis.com/v4/spreadsheets/1hCtye4c-bXpkCBNBKHOD1JIAIOVze9ZGQ0K9js6DhBA/values/sheet?key=AIzaSyC1Ad6YVFFvJu6I0LtwTNG3XpkHAAyUqIQ')
    .then((response) => response.json())
    .then((data) => createBoard(data.values))
