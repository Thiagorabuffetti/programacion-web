document.addEventListener("DOMContentLoaded", function() {
    const carrito = document.getElementById("carrito");
    const carritoList = document.getElementById("carrito-list");
    const totalCompra = document.getElementById("totalCompra");
    const eliminarCarritoBtn = document.getElementById("eliminarCarrito");
    const comprarBtn = document.getElementById("comprar");

    const productos = [
        { id: 1, nombre: "Camiseta titular", precio: 100 },
        { id: 2, nombre: "Camiseta suplente", precio: 100 },
        { id: 3, nombre: "Camiseta arquero", precio: 100 },
    ];
        
    const carritoItems = {};

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
    }

    function agregarAlCarrito(id) {
        if (carritoItems[id]) {
            carritoItems[id]++;
        } else {
            carritoItems[id] = 1;
        }
        actualizarCarrito();
        carrito.style.display = "block";
    }

    function restarDelCarrito(id) {
        if (carritoItems[id] && carritoItems[id] > 0) {
            carritoItems[id]--;
        }
        if (carritoItems[id] === 0) {
            delete carritoItems[id];
        }
        actualizarCarrito();
        if (Object.keys(carritoItems).length === 0) {
            carrito.style.display = "none";
        }
    }

    function eliminarCarrito() {
        for (const id in carritoItems) {
            delete carritoItems[id];
        }
        actualizarCarrito();
        carrito.style.display = "none";
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
});
