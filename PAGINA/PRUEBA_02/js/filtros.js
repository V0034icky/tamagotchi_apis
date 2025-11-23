var botones = document.querySelectorAll(".filtros button");

for (var i = 0; i < botones.length; i++) {
  crearMenu(botones[i]);
}

function crearMenu(boton) {
  var menu = document.createElement("div");
  menu.className = "dropdown-menu";
  menu.style.display = "none";

  if (boton.textContent === "Año") {
    menu.innerHTML = "<p>1996</p><p>1997</p><p>1998</p><p>2021</p><p>2023</p><p>2024</p><p>2025</p>";
  }
  if (boton.textContent === "Generación") {
    menu.innerHTML = "<p>GEN 1</p><p>GEN 2</p><p>GEN 3</p><p>Era Digital Moderna</p><p>Uni Series</p><p>Connection Series</p><p>Paradise World</p>";
  }
  if (boton.textContent === "Edición") {
    menu.innerHTML = "<p>Original</p><p>Tamagotchi</p><p>Uni</p><p>Connection</p><p>Paradise</p>";
  }

  boton.appendChild(menu);

  boton.onclick = function (evento) {
    evento.stopPropagation();

    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      var todosMenus = document.querySelectorAll(".dropdown-menu");
      for (var j = 0; j < todosMenus.length; j++) {
        todosMenus[j].style.display = "none";
      }
      menu.style.display = "block";
    }
  };
}

document.onclick = function (evento) {
  if (!evento.target.closest(".filtros button")) {
    var menus = document.querySelectorAll(".dropdown-menu");
    for (var k = 0; k < menus.length; k++) {
      menus[k].style.display = "none";
    }
  }
};
