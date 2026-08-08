/*
    ==========================================
    BLUECRAFT STORE
    Frontend JavaScript
    ==========================================

    Later you can connect this to your Minecraft
    server/backend API.

    Example:

    const API_URL = "https://your-server.com/api";

    ==========================================
*/


// ==========================================
// CONFIG
// ==========================================

const API_URL = "";


// ==========================================
// PRODUCTS
// ==========================================

const products = [

    {
        id: 1,
        name: "VIP Rank",
        category: "ranks",
        icon: "👑",
        description: "Unlock exclusive commands and perks.",
        price: 9.99
    },

    {
        id: 2,
        name: "MVP Rank",
        category: "ranks",
        icon: "💎",
        description: "Powerful perks for dedicated players.",
        price: 19.99
    },

    {
        id: 3,
        name: "LEGEND Rank",
        category: "ranks",
        icon: "🔥",
        description: "The ultimate rank for your adventure.",
        price: 39.99
    },

    {
        id: 4,
        name: "Zombie Spawner",
        category: "spawners",
        icon: "🧟",
        description: "Place a zombie spawner on your island.",
        price: 4.99
    },

    {
        id: 5,
        name: "Iron Golem Spawner",
        category: "spawners",
        icon: "🗿",
        description: "Generate iron automatically.",
        price: 14.99
    },

    {
        id: 6,
        name: "Blaze Spawner",
        category: "spawners",
        icon: "🔥",
        description: "Create your own blaze farm.",
        price: 24.99
    },

    {
        id: 7,
        name: "500 Shards",
        category: "shards",
        icon: "💠",
        description: "Get 500 premium shards instantly.",
        price: 4.99
    },

    {
        id: 8,
        name: "1,500 Shards",
        category: "shards",
        icon: "💎",
        description: "A bigger shard package for your account.",
        price: 11.99
    },

    {
        id: 9,
        name: "5,000 Shards",
        category: "shards",
        icon: "🔷",
        description: "Massive shard package with bonus value.",
        price: 29.99
    }

];


// ==========================================
// RECENT PURCHASES
// ==========================================

const recentPurchases = [

    {
        username: "ShadowKing",
        item: "MVP Rank",
        price: "€19.99"
    },

    {
        username: "VoidPlayer",
        item: "1,500 Shards",
        price: "€11.99"
    },

    {
        username: "IceWolf",
        item: "Blaze Spawner",
        price: "€24.99"
    },

    {
        username: "xDream",
        item: "VIP Rank",
        price: "€9.99"
    },

    {
        username: "DarkMiner",
        item: "5,000 Shards",
        price: "€29.99"
    },

    {
        username: "ProBuilder",
        item: "Iron Golem Spawner",
        price: "€14.99"
    }

];


// ==========================================
// STATE
// ==========================================

let cart = [];

let selectedEdition = "Java";

let currentCategory = "all";


// ==========================================
// ELEMENTS
// ==========================================

const productsContainer =
    document.getElementById("products");

const recentContainer =
    document.getElementById("recentPurchases");

const cartSidebar =
    document.getElementById("cartSidebar");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutModal =
    document.getElementById("checkoutModal");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const checkoutEdition =
    document.getElementById("checkoutEdition");


// ==========================================
// FORMAT MONEY
// ==========================================

function formatPrice(price) {

    return new Intl.NumberFormat("en-EU", {
        style: "currency",
        currency: "EUR"
    }).format(price);

}


// ==========================================
// RENDER PRODUCTS
// ==========================================

function renderProducts() {

    productsContainer.innerHTML = "";

    const filteredProducts =
        currentCategory === "all"
            ? products
            : products.filter(
                product =>
                    product.category === currentCategory
            );


    filteredProducts.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product";

        card.innerHTML = `

            <div class="product-icon">
                ${product.icon}
            </div>

            <span class="product-type">
                ${product.category.toUpperCase()}
            </span>

            <h3>
                ${product.name}
            </h3>

            <p class="product-description">
                ${product.description}
            </p>

            <div class="product-bottom">

                <span class="price">
                    ${formatPrice(product.price)}
                </span>

                <button
                    class="add-button"
                    data-id="${product.id}"
                >
                    Add to cart
                </button>

            </div>

        `;

        productsContainer.appendChild(card);

    });


    document
        .querySelectorAll(".add-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(button.dataset.id);

                    addToCart(id);

                }
            );

        });

}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) return;

    cart.push(product);

    updateCart();

    openCart();

}


// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    cartCount.textContent = cart.length;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div>🛒</div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add something from the store.
                </p>

            </div>

        `;

    } else {

        cartItems.innerHTML = "";

        cart.forEach((product, index) => {

            const item =
                document.createElement("div");

            item.className = "cart-item";

            item.innerHTML = `

                <div class="cart-item-info">

                    <div class="cart-item-icon">
                        ${product.icon}
                    </div>

                    <div>

                        <div class="cart-item-name">
                            ${product.name}
                        </div>

                        <div class="cart-item-price">
                            ${formatPrice(product.price)}
                        </div>

                    </div>

                </div>

                <button
                    class="remove-item"
                    data-index="${index}"
                >
                    Remove
                </button>

            `;

            cartItems.appendChild(item);

        });


        document
            .querySelectorAll(".remove-item")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        removeFromCart(
                            Number(button.dataset.index)
                        );

                    }
                );

            });

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price,
            0
        );

    cartTotal.textContent =
        formatPrice(total);

    checkoutTotal.textContent =
        formatPrice(total);

}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

    cartSidebar.classList.add("open");

    overlay.classList.add("active");

}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

    cartSidebar.classList.remove("open");

    overlay.classList.remove("active");

}


document
    .getElementById("openCart")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );


overlay.addEventListener(
    "click",
    closeCart
);


// ==========================================
// EDITION SELECTOR
// ==========================================

document
    .querySelectorAll(".edition")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".edition")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

                selectedEdition =
                    button.dataset.edition;

                document
                    .getElementById("selectedEdition")
                    .textContent =
                    selectedEdition;

                checkoutEdition.textContent =
                    selectedEdition;

            }
        );

    });


// ==========================================
// CATEGORY FILTER
// ==========================================

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

                currentCategory =
                    button.dataset.category;

                renderProducts();

            }
        );

    });


// ==========================================
// RECENT PURCHASES
// ==========================================

function renderRecentPurchases() {

    recentContainer.innerHTML = "";

    recentPurchases
        .slice(0, 6)
        .forEach(purchase => {

            const element =
                document.createElement("div");

            element.className = "purchase";

            element.innerHTML = `

                <div class="purchase-user">

                    <div class="avatar">
                        ⛏️
                    </div>

                    <div>

                        <div class="purchase-name">
                            ${purchase.username}
                        </div>

                        <div class="purchase-item">
                            ${purchase.item}
                        </div>

                    </div>

                </div>

                <div class="purchase-price">
                    ${purchase.price}
                </div>

            `;

            recentContainer.appendChild(element);

        });

}


// ==========================================
// CHECKOUT
// ==========================================

document
    .getElementById("checkoutButton")
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty!"
                );

                return;

            }

            closeCart();

            checkoutModal.classList.add(
                "active"
            );

        }
    );


document
    .getElementById("closeCheckout")
    .addEventListener(
        "click",
        () => {

            checkoutModal.classList.remove(
                "active"
            );

        }
    );


// ==========================================
// PAYMENT
// ==========================================

document
    .getElementById("payButton")
    .addEventListener(
        "click",
        async () => {

            const username =
                document
                    .getElementById(
                        "minecraftUsername"
                    )
                    .value
                    .trim();


            if (!username) {

                alert(
                    "Please enter your Minecraft username."
                );

                return;

            }


            /*
                ======================================
                FUTURE BACKEND CONNECTION
                ======================================

                Example:

                const response = await fetch(
                    `${API_URL}/checkout`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            username,
                            edition: selectedEdition,
                            products: cart.map(item => item.id)
                        })
                    }
                );

                const data =
                    await response.json();

                window.location.href =
                    data.paymentUrl;

                ======================================
            */


            alert(
                "Demo checkout created! Payment API will be connected later."
            );

        }
    );


// ==========================================
// SERVER STATUS
// ==========================================

async function checkServerStatus() {

    /*
        Later:

        const response =
            await fetch(`${API_URL}/status`);

        const data =
            await response.json();

        document.getElementById(
            "serverStatus"
        ).textContent =
            data.online
                ? "Server Online"
                : "Server Offline";
    */


    document.getElementById(
        "serverStatus"
    ).textContent =
        "Server Online";

}


// ==========================================
// PLAYER COUNT
// ==========================================

async function updatePlayerCount() {

    /*
        Later connect this to your server API.

        Example response:

        {
            "players": 1248
        }
    */


    const randomPlayers =
        Math.floor(
            Math.random() * 80
        ) + 1200;

    document.getElementById(
        "playerCount"
    ).textContent =
        randomPlayers.toLocaleString();

}


// ==========================================
// INITIALIZE
// ==========================================

renderProducts();

renderRecentPurchases();

updateCart();

checkServerStatus();

updatePlayerCount();


// Update fake player count every 30 seconds

setInterval(
    updatePlayerCount,
    30000
);
