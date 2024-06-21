document.addEventListener("DOMContentLoaded", function() {
    const carrito = document.getElementById("carrito");
    const carritoList = document.getElementById("carrito-list");
    const totalCompra = document.getElementById("totalCompra");
    const eliminarCarritoBtn = document.getElementById("eliminarCarrito");
    const comprarBtn = document.getElementById("comprar");

    const productos = [
        { id: 1, nombre: "Camiseta titular", precio: 60000 },
        { id: 2, nombre: "Camiseta suplente", precio: 60000 },
        { id: 3, nombre: "Camiseta arquero", precio: 60000 },
    ];

    let carritoItems = JSON.parse(localStorage.getItem("carrito")) || {};

    function actualizarCarrito() {
        carritoList.innerHTML = "";
        let total = 0;
        for (const id in carritoItems) {
            const producto = productos.find(item => item.id === parseInt(id));
            if (producto) {
                const cantidad = carritoItems[id];
                const subtotal = cantidad * producto.precio;
                total += subtotal;
                const li = document.createElement("li");
                li.classList.add("list-group-item");
                li.textContent = `${producto.nombre}: ${cantidad} x $${producto.precio} = $${subtotal}`;
                carritoList.appendChild(li);
            }
        }
        totalCompra.textContent = `$${total}`;
        // Guarda el carrito actualizado en localStorage
        localStorage.setItem("carrito", JSON.stringify(carritoItems));

        // Mostrar el carrito si tiene productos
        if (Object.keys(carritoItems).length > 0) {
            carrito.style.display = "block";
        } else {
            carrito.style.display = "none";
        }
    }

    function agregarAlCarrito(id) {
        if (carritoItems[id]) {
            carritoItems[id]++;
        } else {
            carritoItems[id] = 1;
        }
        actualizarCarrito();
    }

    function restarDelCarrito(id) {
        if (carritoItems[id] && carritoItems[id] > 0) {
            carritoItems[id]--;
        }
        if (carritoItems[id] === 0) {
            delete carritoItems[id];
        }
        actualizarCarrito();
    }

    function eliminarCarrito() {
        carritoItems = {};
        actualizarCarrito();
    }

    document.querySelectorAll("[data-id]").forEach(button => {
        button.addEventListener("click", function() {
            const id = parseInt(button.getAttribute("data-id"));
            if (button.classList.contains("btn-primary")) {
                agregarAlCarrito(id);
            } else if (button.classList.contains("btn-danger")) {
                restarDelCarrito(id);
            }
        });
    });

    eliminarCarritoBtn.addEventListener("click", eliminarCarrito);

    // Guardar el carrito en localStorage y redirigir a la página del carrito
    comprarBtn.addEventListener("click", function() {
        window.location.href = "carrito.html"; // Cambia esto a la URL correcta
    });

    // Al cargar la página, actualizar el carrito con los datos de localStorage
    actualizarCarrito();
});
