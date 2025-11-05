const ColeccionTamagotchis = document.querySelector("#base .tarjetas-wrapper");
const plantilla_tarjeta = ColeccionTamagotchis.querySelector(".tarjeta");
plantilla_tarjeta.remove();

fetch("http://localhost:3000/")
    .then(respuesta => respuesta.json())
    .then(archivo => {

        // Accede al arreglo dentro del JSON
        const lista_tamagotchis = archivo.resultados || archivo.arreglo || [];

        for (let i = 0; i < lista_tamagotchis.length; i++) {

            var clon = plantilla_tarjeta.cloneNode(true);
            ColeccionTamagotchis.appendChild(clon);

            const nombre = clon.querySelector(".nombre-tamagotchi");
            nombre.innerHTML = lista_tamagotchis[i].nombre || "Desconocido";

            const imagen = clon.querySelector(".img-tamagotchi");
            if (lista_tamagotchis[i].imagen && lista_tamagotchis[i].imagen !== "") {
                imagen.src = "http://localhost:3000/" + lista_tamagotchis[i].imagen;
            } else {
                imagen.src = "img/PLACEHOLDER.png";
            }

            const especie = clon.querySelector(".especie");
            especie.innerHTML = `<strong>Especie:</strong><br>${lista_tamagotchis[i].especie || "Standard"}`;

            const generacion = clon.querySelector(".gen");
            generacion.innerHTML = `<strong>${lista_tamagotchis[i].generacion || "?"}</strong>`;

            const anio = clon.querySelector(".anio");
            anio.innerHTML = `<strong>Año:</strong> ${lista_tamagotchis[i].año || "Desconocido"}`;

            const edicion = clon.querySelector(".edicion");
            edicion.innerHTML = `<strong>Edición:</strong> ${lista_tamagotchis[i].edicion || "Base"}`;
        }

    })
    .catch(error => {
        console.error("Error al obtener datos:", error);
    });
