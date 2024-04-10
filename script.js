// Smooth scroll to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const toggler = document.getElementById("toggler");
    const navbar = document.getElementById("navbar");

    // Initialize navbar state
    if (window.innerWidth <= 768) {
        navbar.style.display = "none";
    }

    // Toggle navbar visibility and highlight button on small screens
    const toggleNavbar = () => {
        if (navbar.style.display === "none") {
            navbar.style.display = "block";
            toggler.style.border = "3px solid crimson"; // Highlighting the button
        } else {
            navbar.style.display = "none";
            toggler.style.border = "none";
        }
    }

    // Add click event listener to the toggler button
    toggler.addEventListener("click", toggleNavbar);

    // Close navbar when a menu item is clicked
    const menuItems = document.querySelectorAll('.menu-items a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navbar.style.display = "none";
            }
            toggler.style.border = "none";
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const modalButtons = document.querySelectorAll('.readmore-btn');
    const modals = document.querySelectorAll('.modal');

    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'block';
        });
    });

    modals.forEach(modal => {
        const closeButton = modal.querySelector('.close');
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});

// basket functionalities
document.addEventListener("DOMContentLoaded", function() {
    const basketIcon = document.getElementById("basket-icon");
    const basketTab = document.getElementById("basket-tab");
    const checkoutButton = document.getElementById("checkout");
    const selectedItemsList = document.getElementById("selected-items");
    const totalElement = document.getElementById("total");
    let total = 0;

    // Function to add an item to the selected items list
    const addItemToList = (itemName, itemPrice, quantity) => {
      const itemTotal = itemPrice * quantity;
        total += itemTotal;

      // Create list item
    const listItem = document.createElement("p");
        listItem.innerHTML = `${itemName} - $${itemPrice.toFixed(2)} x ${quantity} = $${itemTotal.toFixed(2)}`;
        selectedItemsList.appendChild(listItem);

      // Update total
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    };

    // Example: Adding an item to the list (you can replace this with actual functionality)
    addItemToList("Tomato", 2.50, 2);

    // Example: Adding another item to the list
    addItemToList("Carrot", 1.50, 3);

    // Event listener for basket icon click
    basketIcon.addEventListener("click", () => {
      // Toggle visibility of basket tab
        basketTab.classList.toggle("hidden");
    });

    // Event listener for checkout button
    checkoutButton.addEventListener("click", () => {
      // Implement checkout logic here
        alert("Checkout clicked!");
    });
});


// Select all elements with class .add-btn
const addButtons = document.querySelectorAll('.add-btn');
const counters = document.getElementById('counter');

// Initialize an object to hold counts for each product
const productCounts = {};

// Function to add an item to the selected items list
const addItemToList = (itemName, itemPrice) => {
    // Check if the product already exists in the list
    if (productCounts[itemName]) {
        productCounts[itemName]++;
    } else {
        productCounts[itemName] = 1;
    }

    // Update the total quantity in the counter
    let totalQuantity = 0;
    Object.values(productCounts).forEach(quantity => {
        totalQuantity += quantity;
    });
    counters.textContent = totalQuantity;

    // Create list item
    const listItem = document.createElement("p");
    listItem.textContent = `${itemName} - $${itemPrice.toFixed(2)} x ${productCounts[itemName]} = $${(itemPrice * productCounts[itemName]).toFixed(2)}`;
    document.getElementById("selected-items").appendChild(listItem);
};

// Event listener for each add button
addButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get product details from the button's data attributes
        const productName = button.getAttribute('data-product-name');
        const productPrice = parseFloat(button.getAttribute('data-product-price'));

        // Add the item to the list
        addItemToList(productName, productPrice);
    });
});

