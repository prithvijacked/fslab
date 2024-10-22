const restaurantSelect = document.getElementById('restaurantSelect');
const menuList = document.getElementById('menuList');
const orderList = document.getElementById('orderList');

const menus = {
    "Pizza Place": ["Margherita Pizza", "Pepperoni Pizza", "Veggie Pizza"],
    "Sushi Spot": ["California Roll", "Sushi Platter", "Sashimi"],
    "Burger Joint": ["Cheeseburger", "Veggie Burger", "BBQ Chicken Sandwich"]
};

restaurantSelect.addEventListener('change', function() {
    const selectedRestaurant = restaurantSelect.value;
    menuList.innerHTML = ''; // Clear previous menu

    if (selectedRestaurant) {
        menus[selectedRestaurant].forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.textContent = item;
            menuItem.className = 'menu-item';
            menuItem.addEventListener('click', () => addToOrder(item));
            menuList.appendChild(menuItem);
        });
    }
});

function addToOrder(item) {
    const orderItem = document.createElement('li');
    orderItem.textContent = item;
    orderList.appendChild(orderItem);
}

document.getElementById('placeOrder').addEventListener('click', function() {
    alert("Your order has been placed!");
    orderList.innerHTML = ''; // Clear order list after placing the order
});
