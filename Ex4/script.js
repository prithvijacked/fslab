const menuData = {
    "Pizza Place": [
        { name: "Margherita Pizza", price: 8 },
        { name: "Pepperoni Pizza", price: 10 },
        { name: "Veggie Pizza", price: 9 },
    ],
    "Sushi Spot": [
        { name: "California Roll", price: 12 },
        { name: "Sushi Combo", price: 15 },
        { name: "Salmon Sashimi", price: 14 },
    ],
    "Burger Joint": [
        { name: "Cheeseburger", price: 7 },
        { name: "Veggie Burger", price: 6 },
        { name: "Double Burger", price: 10 },
    ],
};

document.getElementById('restaurantSelect').addEventListener('change', function() {
    const selectedRestaurant = this.value;
    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = '';

    if (selectedRestaurant) {
        menuData[selectedRestaurant].forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.innerHTML = `${item.name} - $${item.price} <button onclick="addToOrder('${item.name}', ${item.price})">Add</button>`;
            menuDiv.appendChild(menuItem);
        });
    }
});

let order = [];

function addToOrder(itemName, itemPrice) {
    order.push({ name: itemName, price: itemPrice });
    updateOrderList();
}

function updateOrderList() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';
    order.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        orderList.appendChild(li);
    });
}

document.getElementById('placeOrder').addEventListener('click', function() {
    if (order.length > 0) {
        alert('Your order has been placed!');
        order = [];
        updateOrderList();
    } else {
        alert('Please add items to your order before placing.');
    }
});
