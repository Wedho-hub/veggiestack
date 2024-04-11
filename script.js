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
    };

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

// Initialize an object to hold counts for each product
let productCounts = {};

// Function to add an item to the selected items list
const addItemToList = (itemName, itemPrice) => {
    // Check if the product already exists in the list
    if (productCounts[itemName]) {
        productCounts[itemName]++;
    } else {
        productCounts[itemName] = 1;

        // Create list item if it's a new product
        const listItem = document.createElement("p");
        listItem.textContent = `${itemName} - $${itemPrice.toFixed(1)} x ${productCounts[itemName]} = $${(itemPrice * productCounts[itemName]).toFixed(1)}`;
        document.getElementById("selected-items").appendChild(listItem);
    }

    // Update the total quantity in the counter
    let totalQuantity = 0;
    Object.values(productCounts).forEach(quantity => {
        totalQuantity += quantity;
    });
    counter.textContent = totalQuantity;

    // Update the quantity display for the specific item
    const quantityDisplay = document.getElementById(`${itemName}-quantity`);
    if (quantityDisplay) {
        quantityDisplay.textContent = ` x ${productCounts[itemName]}`;
    }
};

// Select all elements with class .add-btn
const addButtons = document.querySelectorAll('.add-btn');
const counter = document.getElementById('counter');

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

// Event listener for basket icon click
const basketIcon = document.getElementById("basket-icon");
const basketTab = document.getElementById("basket-tab");
basketIcon.addEventListener("click", () => {
    // Toggle visibility of basket tab
    basketTab.classList.toggle("hidden");
});

// Event listener for checkout button
const checkoutButton = document.getElementById("checkout");
checkoutButton.addEventListener("click", () => {
    // Implement checkout logic here
    alert("Checkout clicked!");
});

// Clear basket function
function clearBasket() {
    // Clear the product counts
    productCounts = {};

    // Clear the selected items list
    document.getElementById("selected-items").innerHTML = '';

    // Reset the total quantity in the counter
    counter.textContent = '0';
}

// Define the temporaryMessage function
const temporaryMessage = () => {
    alert("🛠️ ...site still being developed for your best experience... 🛠️");
}

// Add an event listener to the submit button
const submitButton = document.getElementById("submit-button"); // Replace "submit-button" with the actual ID of your submit button
submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    temporaryMessage(); // Call the temporaryMessage function
});
