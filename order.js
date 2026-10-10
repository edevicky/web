/* =========================================
   BREW HAVEN - ORDER PAGE SCRIPT
========================================= */

var cart = [];
var grandTotal = 0;

/* ---------- Toast notification ---------- */
function showToast(message) {
    var wrap = document.getElementById("toastWrap");
    if (!wrap) { alert(message); return; }

    var toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = '<i class="fa-solid fa-check"></i>' + message;
    wrap.appendChild(toast);

    requestAnimationFrame(function () { toast.classList.add("show"); });

    setTimeout(function () {
        toast.classList.remove("show");
        setTimeout(function () { toast.remove(); }, 400);
    }, 2500);
}

/* ---------- Add to cart ---------- */
function addCart(name, price) {
    var found = false;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].qty++;
            cart[i].total = cart[i].qty * cart[i].price;
            found = true;
            break;
        }
    }

    if (!found) {
        cart.push({ name: name, price: price, qty: 1, total: price });
    }

    displayCart();
    showToast(name + " added to cart");
}

/* ---------- Display cart ---------- */
function displayCart() {
    var table = document.getElementById("cartItems");
    table.innerHTML = "";
    grandTotal = 0;
    var totalItems = 0;

    if (cart.length === 0) {
        table.innerHTML = '<tr><td colspan="5">Your cart is empty</td></tr>';
    } else {
        for (var i = 0; i < cart.length; i++) {
            grandTotal += cart[i].total;
            totalItems += cart[i].qty;

            table.innerHTML +=
                "<tr>" +
                    "<td>" + cart[i].name + "</td>" +
                    "<td>₹" + cart[i].price + "</td>" +
                    "<td>" +
                        '<button onclick="decrease(' + i + ')">-</button> ' +
                        cart[i].qty +
                        ' <button onclick="increase(' + i + ')">+</button>' +
                    "</td>" +
                    "<td>₹" + cart[i].total + "</td>" +
                    "<td>" + '<button onclick="removeItem(' + i + ')">Remove</button>' + "</td>" +
                "</tr>";
        }
    }

    document.getElementById("grandTotal").innerText = grandTotal;
    document.getElementById("finalPrice").innerText = grandTotal;
    document.getElementById("totalItem").innerText = totalItems;
}

/* ---------- Qty controls ---------- */
function increase(index) {
    cart[index].qty++;
    cart[index].total = cart[index].qty * cart[index].price;
    displayCart();
}

function decrease(index) {
    if (cart[index].qty > 1) {
        cart[index].qty--;
        cart[index].total = cart[index].qty * cart[index].price;
    } else {
        cart.splice(index, 1);
    }
    displayCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}

/* ---------- Place order ---------- */
function placeOrder() {
    if (cart.length === 0) {
        showToast("Your cart is empty");
        return;
    }

    var name = document.getElementById("name").value.trim();
    var mobile = document.getElementById("mobile").value.trim();
    var email = document.getElementById("email").value.trim();
    var address = document.getElementById("address").value.trim();
    var city = document.getElementById("city").value.trim();
    var pin = document.getElementById("pin").value.trim();

    if (name === "") { showToast("Enter your name"); return; }
    if (mobile === "") { showToast("Enter mobile number"); return; }
    if (email === "") { showToast("Enter email"); return; }
    if (address === "") { showToast("Enter address"); return; }
    if (city === "") { showToast("Enter city"); return; }
    if (pin === "") { showToast("Enter pincode"); return; }

    var coffeeNames = cart.map(function (item) { return item.name; }).join(", ");
    var totalQty = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);

    /* Save order for the Orders panel */
    var orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({
        id: Date.now(),
        name: name,
        mobile: mobile,
        email: email,
        coffee: coffeeNames,
        qty: totalQty,
        total: grandTotal,
        date: new Date().toLocaleString()
    });
    localStorage.setItem("orders", JSON.stringify(orders));

    showToast("Order placed! Amount ₹" + grandTotal);

    cart = [];
    displayCart();

    ["name", "mobile", "email", "address", "city", "pin"].forEach(function (id) {
        document.getElementById(id).value = "";
    });
}

/* ---------- Search products ---------- */
function searchProducts() {
    var value = document.getElementById("searchBox").value.toLowerCase();
    document.querySelectorAll(".products .card").forEach(function (card) {
        var title = card.querySelector("h2").innerText.toLowerCase();
        card.style.display = title.indexOf(value) > -1 ? "" : "none";
    });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});
