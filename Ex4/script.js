const restaurants = [
    { id: 1, name: 'Pizza Place', menu: ['Margherita', 'Pepperoni', 'BBQ Chicken'] },
    { id: 2, name: 'Sushi Spot', menu: ['California Roll', 'Spicy Tuna', 'Sashimi'] },
];

function loadRestaurants() {
    const restaurantDiv = document.getElementById('restaurants');
    restaurants.forEach(restaurant => {
        const div = document.createElement('div');
        div.className = 'restaurant';
        div.textContent = restaurant.name;
        div.onclick = () => loadMenu(restaurant);
        restaurantDiv.appendChild(div);
    });
}

function loadMenu(restaurant) {
    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = `<h3>${restaurant.name} Menu</h3>`;
    restaurant.menu.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.textContent = item;
        div.onclick = () => orderFood(item);
        menuDiv.appendChild(div);
    });
}

function orderFood(item) {
    alert(`You ordered: ${item}`);
}

window.onload = loadRestaurants;
