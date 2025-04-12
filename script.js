let products = [];
let totalSales = 0;

function addProduct() {
    let name = document.getElementById("product-name").value;
    let price = parseFloat(document.getElementById("product-price").value);
    let stock = parseInt(document.getElementById("product-stock").value);
    let imageFile = document.getElementById("product-image").files[0];

    if (!name || isNaN(price) || price <= 0 || isNaN(stock) || stock <= 0) {
        alert("Harap isi semua data dengan benar!");
        return;
    }

    let imageUrl = "images/default.png"; // Gambar default
    if (imageFile) {
        imageUrl = URL.createObjectURL(imageFile);
    }

    let product = { name, price, stock, imageUrl };
    products.push(product);
    updateProductList();
    clearInputs();
}

function updateProductList() {
    let productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        let productCard = `
            <div class="product-card">
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Harga: Rp ${product.price}</p>
                <p>Stok: ${product.stock}</p>
                <button class="sell-btn" onclick="sellProduct(${index})">Jual</button>
            </div>`;
        productList.innerHTML += productCard;
    });
}

function sellProduct(index) {
    if (products[index].stock > 0) {
        products[index].stock--;
        totalSales += products[index].price;
        document.getElementById("total-sales").innerText = totalSales;
        updateProductList();
    } else {
        alert("Stok habis!");
    }
}

function clearInputs() {
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-stock").value = "";
    document.getElementById("product-image").value = "";
}
