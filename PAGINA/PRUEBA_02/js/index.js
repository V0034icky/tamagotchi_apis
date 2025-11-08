const ColeccionTamagotchis = document.querySelector("#base .tarjetas-wrapper");
const plantilla_tarjeta_base = ColeccionTamagotchis.querySelector(".tarjeta");
plantilla_tarjeta_base.remove();

const MisTamagotchis = document.querySelector("#mis .tarjetas-wrapper");
const plantilla_tarjeta_mis = MisTamagotchis.querySelector(".tarjeta");
plantilla_tarjeta_mis.remove();

const CatalogoGeneral = document.querySelector("#catalogo .tarjetas-wrapper");
const plantilla_tarjeta_catalogo = CatalogoGeneral.querySelector(".tarjeta");
plantilla_tarjeta_catalogo.remove();

function cargarColeccion() {
  MisTamagotchis.innerHTML = "";

  fetch("http://localhost:3000/coleccion").then(respuesta => {
    if (respuesta.status == 200) {
      respuesta.json().then(data => {
        const lista = data.coleccion;

        for (let i = 0; i < lista.length; i++) {
          const clon = plantilla_tarjeta_mis.cloneNode(true);
          MisTamagotchis.appendChild(clon);

          const tama = lista[i];
          clon.querySelector(".nombre-tamagotchi").innerHTML = tama.nombre;
          clon.querySelector(".img-tamagotchi").src = tama.imagen || "img/PLACEHOLDER.png";
          clon.querySelector(".especie").innerHTML = "<strong>Especie:</strong><br>" + tama.especie;
          clon.querySelector(".gen").innerHTML = "<strong>" + tama.generacion + "</strong>";
          clon.querySelector(".anio").innerHTML = "<strong>Año:</strong> " + tama.año;
          clon.querySelector(".edicion").innerHTML = "<strong>Edición:</strong> " + tama.edicion;
        }
      });
    }
  });
}

function cargarCatalogo() {
  CatalogoGeneral.innerHTML = "";

  fetch("http://localhost:3000/base").then(r1 => {
    if (r1.status == 200) {
      r1.json().then(baseData => {
        fetch("http://localhost:3000/coleccion").then(r2 => {
          if (r2.status == 200) {
            r2.json().then(coleccionData => {
              const baseLista = baseData.resultados;
              const misIDs = [];
              for (let i = 0; i < coleccionData.coleccion.length; i++) {
                misIDs.push(coleccionData.coleccion[i].nombre);
              }

              for (let i = 0; i < baseLista.length; i++) {
                const clon = plantilla_tarjeta_catalogo.cloneNode(true);
                CatalogoGeneral.appendChild(clon);

                const tama = baseLista[i];
                clon.querySelector(".nombre-tamagotchi").innerHTML = tama.nombre;

                const imagen = clon.querySelector(".img-tamagotchi");
                let ruta = Array.isArray(tama.imagen) ? tama.imagen[0] : tama.imagen;
                if (ruta && ruta.startsWith("http")) {
                  imagen.src = ruta;
                } else if (ruta && ruta !== "") {
                  imagen.src = "http://localhost:3000/" + ruta;
                } else {
                  imagen.src = "img/PLACEHOLDER.png";
                }

                clon.querySelector(".especie").innerHTML = "<strong>Especie:</strong><br>" + tama.especie;
                clon.querySelector(".gen").innerHTML = "<strong>" + tama.generacion + "</strong>";
                clon.querySelector(".anio").innerHTML = "<strong>Año:</strong> " + tama.año;
                clon.querySelector(".edicion").innerHTML = "<strong>Edición:</strong> " + tama.edicion;

                let estaEnColeccion = false;
                for (let j = 0; j < misIDs.length; j++) {
                  if (misIDs[j] == tama.nombre) {
                    estaEnColeccion = true;
                  }
                }

                if (estaEnColeccion == false) {
                  const overlay = document.createElement("img");
                  overlay.src = "../img/TARJETA-GRIS.png";
                  overlay.classList.add("overlay-gris");
                  clon.appendChild(overlay);
                }
              }
            });
          }
        });
      });
    }
  });
}

fetch("http://localhost:3000/base").then(respuesta => {
  if (respuesta.status == 200) {
    respuesta.json().then(archivo => {
      const lista = archivo.resultados;

      for (let i = 0; i < lista.length; i++) {
        const clon = plantilla_tarjeta_base.cloneNode(true);
        ColeccionTamagotchis.appendChild(clon);

        const tama = lista[i];
        clon.querySelector(".nombre-tamagotchi").innerHTML = tama.nombre;

        const imagen = clon.querySelector(".img-tamagotchi");
        let rutaImagen = Array.isArray(tama.imagen) ? tama.imagen[0] : tama.imagen;
        if (rutaImagen && rutaImagen.startsWith("http")) {
          imagen.src = rutaImagen;
        } else if (rutaImagen && rutaImagen !== "") {
          imagen.src = "http://localhost:3000/" + rutaImagen;
        } else {
          imagen.src = "img/PLACEHOLDER.png";
        }

        clon.querySelector(".especie").innerHTML = "<strong>Especie:</strong><br>" + tama.especie;
        clon.querySelector(".gen").innerHTML = "<strong>" + tama.generacion + "</strong>";
        clon.querySelector(".anio").innerHTML = "<strong>Año:</strong> " + tama.año;
        clon.querySelector(".edicion").innerHTML = "<strong>Edición:</strong> " + tama.edicion;

        const botonAgregar = clon.querySelector(".btn-tarjeta.agregar");
        if (botonAgregar != null) {
          botonAgregar.addEventListener("click", () => {
            const nuevoTama = {
              nombre: tama.nombre,
              especie: tama.especie,
              generacion: tama.generacion,
              año: tama.año,
              edicion: tama.edicion,
              imagen: tama.imagen
            };

            fetch("http://localhost:3000/coleccion", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(nuevoTama)
            }).then(r => {
              if (r.status == 200) {
                r.json().then(() => {
                  cargarColeccion();
                  cargarCatalogo();
                });
              }
            });
          });
        }
      }
    });
  }
});

cargarColeccion();
cargarCatalogo();
