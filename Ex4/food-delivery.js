const restaurantData = {
    1: {
        name: "Wendy's",
        menu: [
            { name: "Burger", price: 5.99, image: "burger.jpg" },
            { name: "Frosty", price: 2.99, image: "frosty.jpg" },
            { name: "Chicken Nuggets", price: 4.99, image: "nuggets.jpg" }
        ]
    },
    2: {
        name: "M'cDonald's",
        menu: [
            { name: "Big Mac", price: 3.99, image: "burger.jpg" },
            { name: "Fries", price: 1.99, image: "fries.jpg" },
            { name: "McFlurry", price: 2.49, image: "mcflurry.jpg" }
        ]
    },
    3: {
        name: "Burger King",
        menu: [
            { name: "Whopper", price: 4.99, image: "whooper.jpg" },
            { name: "Onion Rings", price: 2.29, image: "onion.jpg" },
            { name: "Ice Cream", price: 1.89, image: "ice.jpg" }
        ]
    },
    4: {
        name: "Los Pollos Hermanos",
        menu: [
            { name: "Chicken Platter", price: 7.99, image: "chicplat.jpg" },
            { name: "Tortilla", price: 0.99, image: "tortilla.jpg" },
            { name: "Salsa", price: 1.29, image: "salsa.jpg" }
        ]
    }
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
                        <input type="checkbox" name="food" value="${food.name}" data-price="${food.price}">
                        <img src="${food.image}" alt="${food.name}" style="width: 50px; height: 50px;">
                        ${food.name} - $${food.price.toFixed(2)}
                    </label>
                `).join('')}
            </form>
        `;

        document.getElementById('food-form').addEventListener('change', updateTotalCost);

        document.getElementById('checkout-button').onclick = function() {
            const selectedFoods = [...document.querySelectorAll('input[name="food"]:checked')]
                .map(checkbox => checkbox.value);
            localStorage.setItem('selectedFoods', JSON.stringify(selectedFoods));
            location.href = 'checkout.html';
        };
    }
};

function updateTotalCost() {
    const selectedFoods = [...document.querySelectorAll('input[name="food"]:checked')];
    const totalCost = selectedFoods.reduce((total, checkbox) => {
        return total + parseFloat(checkbox.getAttribute('data-price'));
    }, 0);
    document.getElementById('total-cost').innerText = `Total Cost: $${totalCost.toFixed(2)}`;
}
