document.getElementById('new-item-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const itemName = document.getElementById('item-name').value;
    const itemPrice = document.getElementById('item-price').value;

    if (itemName && itemPrice) {
        const itemList = document.getElementById('item-list');

        const listItem = document.createElement('li');
        listItem.textContent = `${itemName} - $${itemPrice}`;
        
        itemList.appendChild(listItem);

        // Clear the input fields
        document.getElementById('item-name').value = '';
        document.getElementById('item-price').value = '';
    }
});
