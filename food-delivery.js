const restaurants = {
    "Pizza Place": [
        { name: "Margherita Pizza", price: 10, image: "images/margherita.jpg" },
        { name: "Pepperoni Pizza", price: 12, image: "images/pepperoni.jpg" }
    ],
    "Sushi Spot": [
        { name: "California Roll", price: 8, image: "images/california_roll.jpg" },
        { name: "Sushi Platter", price: 15, image: "images/sushi_platter.jpg" }
    ],
    "Burger Joint": [
        { name: "Cheeseburger", price: 9, image: "images/cheeseburger.jpg" },
        { name: "Veggie Burger", price: 7, image: "images/veggie_burger.jpg" }
    ]
};

document.getElementById('restaurantSelect').addEventListener('change', function() {
    const menu = document.getElementById('menu');
    menu.innerHTML = ''; // Clear previous menu items

    const selectedRestaurant = this.value;
    if (selectedRestaurant) {
        restaurants[selectedRestaurant].forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button class="add-to-order" data-name="${item.name}" data-price="${item.price}">Add to Order</button>
            `;
            menu.appendChild(menuItem);
        });
    }
});

// Handle adding items to the order list
document.getElementById('menu').addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-order')) {
        const itemName = event.target.getAttribute('data-name');
        const itemPrice = event.target.getAttribute('data-price');
        const orderList = document.getElementById('orderList');
        
        const orderItem = document.createElement('li');
        orderItem.textContent = `${itemName} - $${itemPrice}`;
        orderList.appendChild(orderItem);
    }
});

// Handle checkout
document.getElementById('placeOrder').addEventListener('click', function() {
    const deliveryAddress = document.getElementById('deliveryAddress').value;
    if (!deliveryAddress) {
        alert('Please enter your delivery address.');
        return;
    }
    
    alert('Order placed! Your food will be delivered to: ' + deliveryAddress);
    // Clear the order list and address field after checkout
    document.getElementById('orderList').innerHTML = '';
    document.getElementById('deliveryAddress').value = '';
});
