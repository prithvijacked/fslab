function checkout() {
    const address = document.getElementById("address").value;
    const orderSummary = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        orderSummary.push(checkbox.value);
    });

    const orderText = orderSummary.length > 0 
        ? `You have ordered: ${orderSummary.join(", ")}\nDelivery Address: ${address}` 
        : "No items selected!";

    document.getElementById("order-summary").innerText = orderText;
    document.getElementById("checkout").classList.remove("hidden");
}
