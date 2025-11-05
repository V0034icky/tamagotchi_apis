const ColeccionTamagotchis = document.querySelector("#base .tarjetas-wrapper");
const plantilla_tarjeta = ColeccionTamagotchis.querySelector(".tarjeta");
plantilla_tarjeta.remove();

fetch("http://localhost:3000/")
    .then(respuesta => respuesta.json())
    .then(archivo => {
        const lista_tamagotchis = archivo.resultados || archivo.arreglo || [];

        for (let i = 0; i < lista_tamagotchis.length; i++) {
            const clon = plantilla_tarjeta.cloneNode(true);
            ColeccionTamagotchis.appendChild(clon);

            const tamagotchi = lista_tamagotchis[i];

            const nombre = clon.querySelector(".nombre-tamagotchi");
            nombre.innerHTML = tamagotchi.nombre || "Desconocido";

            const imagen = clon.querySelector(".img-tamagotchi");
            let rutaImagen = Array.isArray(tamagotchi.imagen) ? tamagotchi.imagen[0] : tamagotchi.imagen;

            if (rutaImagen && rutaImagen.startsWith("http")) {
                imagen.src = rutaImagen;
            } else if (rutaImagen && rutaImagen !== "") {
                imagen.src = "http://localhost:3000/" + rutaImagen;
            } else {
                imagen.src = "img/PLACEHOLDER.png";
            }

            const especie = clon.querySelector(".especie");
            especie.innerHTML = `<strong>Especie:</strong><br>${tamagotchi.especie || "Standard"}`;

            const generacion = clon.querySelector(".gen");
            generacion.innerHTML = `<strong>${tamagotchi.generacion || "?"}</strong>`;

            const anio = clon.querySelector(".anio");
            anio.innerHTML = `<strong>Año:</strong> ${tamagotchi.año || "Desconocido"}`;

            const edicion = clon.querySelector(".edicion");
            edicion.innerHTML = `<strong>Edición:</strong> ${tamagotchi.edicion || "Base"}`;
        }
    })
    .catch(error => {
        console.error("Error al obtener datos:", error);
    });
