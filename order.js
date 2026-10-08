
let cart = [];
let grandTotal = 0;

function addCart(name, price)
{
    let found = false;

    for(let i=0; i<cart.length; i++)
    {
        if(cart[i].name == name)
        {
            cart[i].qty++;
            cart[i].total = cart[i].qty * cart[i].price;
            found = true;
            break;
        }
    }

    if(found == false)
    {
        cart.push({
            name:name,
            price:price,
            qty:1,
            total:price
        });
    }

    displayCart();
}

function displayCart()
{
    let table = document.getElementById("cartItems");

    table.innerHTML = "";

    grandTotal = 0;

    let totalItems = 0;

    for(let i=0;i<cart.length;i++)
    {
        grandTotal += cart[i].total;

        totalItems += cart[i].qty;

        table.innerHTML += `

        <tr>

        <td>${cart[i].name}</td>

        <td>₹${cart[i].price}</td>

        <td>

        <button onclick="decrease(${i})">-</button>

        ${cart[i].qty}

        <button onclick="increase(${i})">+</button>

        </td>

        <td>₹${cart[i].total}</td>

        <td>

        <button onclick="removeItem(${i})">

        Remove

        </button>

        </td>

        </tr>

        `;
    }

    document.getElementById("grandTotal").innerHTML = grandTotal;

    document.getElementById("finalPrice").innerHTML = grandTotal;

    document.getElementById("totalItem").innerHTML = totalItems;

}

function increase(index)
{
    cart[index].qty++;

    cart[index].total =
    cart[index].qty * cart[index].price;

    displayCart();
}

function decrease(index)
{
    if(cart[index].qty>1)
    {
        cart[index].qty--;

        cart[index].total =
        cart[index].qty * cart[index].price;
    }
    else
    {
        cart.splice(index,1);
    }

    displayCart();
}

function removeItem(index)
{
    cart.splice(index,1);

    displayCart();
}

function placeOrder()
{

    if(cart.length==0)
    {
        alert("Your cart is empty.");

        return;
    }

    let name =
    document.getElementById("name").value;

    let mobile =
    document.getElementById("mobile").value;

    let email =
    document.getElementById("email").value;

    let address =
    document.getElementById("address").value;

    let city =
    document.getElementById("city").value;

    let pin =
    document.getElementById("pin").value;

    if(name=="")
    {
        alert("Enter Your Name");
        return;
    }

    if(mobile=="")
    {
        alert("Enter Mobile Number");
        return;
    }

    if(email=="")
    {
        alert("Enter Email");
        return;
    }

    if(address=="")
    {
        alert("Enter Address");
        return;
    }

    if(city=="")
    {
        alert("Enter City");
        return;
    }

    if(pin=="")
    {
        alert("Enter Pincode");
        return;
    }

    alert(

"🎉 Order Placed Successfully!\n\n"

+

"Customer : "+name+

"\nAmount : ₹"+grandTotal+

"\n\nThank You For Ordering From Brew Haven."

);

    cart=[];

    displayCart();

    document.getElementById("name").value="";

    document.getElementById("mobile").value="";

    document.getElementById("email").value="";

    document.getElementById("address").value="";

    document.getElementById("city").value="";

    document.getElementById("pin").value="";

}
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let newOrder = {
    id: Date.now(),
    name: name,
    mobile: mobile,
    email: email,
    coffee: "Selected Coffee",
    qty: cart.length,
    total: grandTotal,
    date: new Date().toLocaleString()
};

orders.push(newOrder);

localStorage.setItem("orders", JSON.stringify(orders));