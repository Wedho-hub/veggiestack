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
    alert("🛠️ ...Apologies user, the site is still being developed for your best experience... 🛠️");
}

// Add an event listener to the submit button
const submitButton = document.getElementById("submit-btn");
submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    temporaryMessage(); // Call the temporaryMessage function
});


// Function to open social media links
const openSocialMedia = (url) => {
    window.open(url);
};

// Add event listeners to buttons
document.getElementById('order-now').addEventListener('click', () => {
    openSocialMedia('https://wa.link/q6yxzj');
});

document.getElementById('facebookBtn').addEventListener('click', () => {
    openSocialMedia('https://web.facebook.com/profile.php?id=61558182126742');
});

document.getElementById('instagramBtn').addEventListener('click', () => {
    openSocialMedia('https://www.instagram.com/veggie_stack?fbclid=IwAR2FBj5wr0N-_TnAQT_dsQ1efZsyD3FpV5n64rjQYATUvq_lEGr558WdfT0_aem_AajGo7wLJ-_Oztrty1otmLyfvoe2oXUrWyQW8XNpPW5u1MY29oevrXC_05LKIJ3EDgWJtFRbGVPYzw8He3wjKYEz');
});

document.getElementById('linkedinBtn').addEventListener('click', () => {
    alert("🛠️ ...Apologies user, the site is still being developed for your best experience... 🛠️");
});
