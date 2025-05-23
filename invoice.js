document.getElementById('add-item-btn').addEventListener('click', addItem);
document.getElementById('print-btn').addEventListener('click', printBill);

let totalPrice = 0;

function addItem() {
    const itemName = document.getElementById('item-name').value;
    const itemPrice = parseFloat(document.getElementById('item-price').value);

    if (itemName && !isNaN(itemPrice) && itemPrice > 0) {
        const tableBody = document.getElementById('item-list');
        const row = document.createElement('tr');
        
        const itemNameCell = document.createElement('td');
        itemNameCell.textContent = itemName;

        const itemPriceCell = document.createElement('td');
        itemPriceCell.textContent = `₹${itemPrice.toFixed(2)}`;

        row.appendChild(itemNameCell);
        row.appendChild(itemPriceCell);

        tableBody.appendChild(row);

        totalPrice += itemPrice;
        document.getElementById('total-price').textContent = totalPrice.toFixed(2);

        // Clear input fields
        document.getElementById('item-name').value = '';
        document.getElementById('item-price').value = '';
    } else {
        alert('Please enter valid item name and price.');
    }
}

function printBill() {
    const companyName = document.getElementById('company-name').value;
    const companyPhone = document.getElementById('company-phone').value;
    const customerName = document.getElementById('customer-name').value;
    const customerAddress = document.getElementById('customer-address').value;

    if (!companyName || !companyPhone || !customerName || !customerAddress) {
        alert('Please enter all required information.');
        return;
    }

    const billContent = `
        <div class="company-info">
            <h2>${companyName}</h2>
            <p><strong>Contact With Us:</strong> ${companyPhone}</p>
        </div>
        <div class="customer-info">
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Address:</strong> ${customerAddress}</p>
        </div>
        <h2>Items</h2>
        <table class="items-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Price (₹)</th>
                </tr>
            </thead>
            <tbody>
                ${generateBillItems()}
            </tbody>
        </table>
        <div class="total">
            <p><strong>Total:</strong> ₹${totalPrice.toFixed(2)}</p>
        </div>
    `;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Bill</title><link rel="stylesheet" href="style.css"></head><body>');
    printWindow.document.write(billContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

function generateBillItems() {
    const items = document.querySelectorAll('#item-list tr');
    let billItemsHTML = '';

    items.forEach(item => {
        const cells = item.getElementsByTagName('td');
        const itemName = cells[0].textContent;
        const itemPrice = cells[1].textContent;

        billItemsHTML += `
            <tr>
                <td>${itemName}</td>
                <td>${itemPrice}</td>
            </tr>
        `;
    });

    return billItemsHTML;
}
