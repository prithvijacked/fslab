const restaurantData = {
    1: { name: "Restaurant 1", menu: ["Pizza", "Burger", "Pasta"] },
    2: { name: "Restaurant 2", menu: ["Sushi", "Ramen", "Tempura"] },
    3: { name: "Restaurant 3", menu: ["Tacos", "Burritos", "Nachos"] },
    4: { name: "Restaurant 4", menu: ["Salad", "Sandwich", "Soup"] }
};

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get('restaurant');

    if (restaurantId) {
        const restaurant = restaurantData[restaurantId];
        document.getElementById('menu').innerHTML = `
            <h2>${restaurant.name}</h2>
            <form id="food-form">
                ${restaurant.menu.map(food => `
                    <label>
                        <input type="checkbox" name="food" value="${food}">
                        ${food}
                    </label>
                `).join('')}
            </form>
        `;

        document.getElementById('checkout-button').onclick = function() {
            const selectedFoods = [...document.querySelectorAll('input[name="food"]:checked')]
                .map(checkbox => checkbox.value);
            localStorage.setItem('selectedFoods', JSON.stringify(selectedFoods));
            location.href = 'checkout.html';
        };
    }

    document.getElementById('checkout-form').onsubmit = function(event) {
        event.preventDefault();
        const address = document.getElementById('address').value;
        const selectedFoods = JSON.parse(localStorage.getItem('selectedFoods'));
        alert(`Order placed for: ${selectedFoods.join(', ')}\nDelivering to: ${address}`);
        localStorage.removeItem('selectedFoods');
        // Here you can also redirect or do other actions
    };
};
