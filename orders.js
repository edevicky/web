/* =========================================
        BREW HAVEN - ORDERS PANEL JS
        PART 1
========================================= */

/* LocalStorage se orders load karna */
let orders = JSON.parse(localStorage.getItem("orders")) || [];

/* Page load hote hi data show */
window.onload = function()
{
    displayOrders();
    updateSummary();
};

/* Orders table display function */
function displayOrders()
{
    let table = document.getElementById("orderTable");

    table.innerHTML = "";

    if(orders.length === 0)
    {
        table.innerHTML = `
        <tr>
            <td colspan="9">No Orders Found</td>
        </tr>
        `;
        return;
    }

    for(let i = 0; i < orders.length; i++)
    {
        table.innerHTML += `
        <tr>
            <td>${orders[i].id}</td>
            <td>${orders[i].name}</td>
            <td>${orders[i].mobile}</td>
            <td>${orders[i].email}</td>
            <td>${orders[i].coffee}</td>
            <td>${orders[i].qty}</td>
            <td>₹${orders[i].total}</td>
            <td>${orders[i].date}</td>
            <td>
                <button class="deleteBtn" onclick="deleteOrder(${i})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    }
}

/* Summary update (Total Orders, Sales, Coffee Count) */
function updateSummary()
{
    let totalOrders = orders.length;
    let totalSales = 0;
    let totalCoffee = 0;

    for(let i = 0; i < orders.length; i++)
    {
        totalSales += orders[i].total;
        totalCoffee += orders[i].qty;
    }

    document.getElementById("totalOrders").innerText = totalOrders;
    document.getElementById("totalSales").innerText = "₹" + totalSales;
    document.getElementById("coffeeCount").innerText = totalCoffee;
}
/* =========================================
        BREW HAVEN - ORDERS PANEL JS
        PART 2
========================================= */

/* Search Order (Customer name se) */
function searchOrder()
{
    let input = document.getElementById("search").value.toLowerCase();

    let table = document.getElementById("orderTable");

    table.innerHTML = "";

    let found = false;

    for(let i = 0; i < orders.length; i++)
    {
        if(orders[i].name.toLowerCase().includes(input))
        {
            table.innerHTML += `
            <tr>
                <td>${orders[i].id}</td>
                <td>${orders[i].name}</td>
                <td>${orders[i].mobile}</td>
                <td>${orders[i].email}</td>
                <td>${orders[i].coffee}</td>
                <td>${orders[i].qty}</td>
                <td>₹${orders[i].total}</td>
                <td>${orders[i].date}</td>
                <td>
                    <button class="deleteBtn" onclick="deleteOrder(${i})">
                        Delete
                    </button>
                </td>
            </tr>
            `;
            found = true;
        }
    }

    if(!found)
    {
        table.innerHTML = `
        <tr>
            <td colspan="9">No Matching Order Found</td>
        </tr>
        `;
    }
}

/* Single order delete */
function deleteOrder(index)
{
    orders.splice(index,1);

    localStorage.setItem("orders", JSON.stringify(orders));

    displayOrders();
    updateSummary();
}

/* All orders delete */
function deleteAllOrders()
{
    if(confirm("Are you sure you want to delete all orders?"))
    {
        orders = [];

        localStorage.removeItem("orders");

        displayOrders();
        updateSummary();
    }
}
