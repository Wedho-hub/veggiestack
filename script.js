document.addEventListener("DOMContentLoaded", function() {
    const toggler = document.getElementById("toggler");
    const navbar = document.getElementById("navbar");
    const modalButtons = document.querySelectorAll('.readmore-btn');
    const modals = document.querySelectorAll('.modal');
    const tempMessage = document.getElementById("temp-message");
    const basketIcon = document.getElementById("basket-icon");
    const basketTab = document.getElementById("basket-tab");
    const checkoutButton = document.getElementById("checkout");
    const submitButton = document.getElementById("submit-btn");
    const closeTempBtn = document.querySelector(".apology-button");
    const clearBtn = document.getElementById("clear");

    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

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

    // Show modal on button click
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'block';
        });
    });

    // Close modal on close button click or outside click
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

    // Toggle visibility of basket tab on basket icon click
    basketIcon.addEventListener("click", () => {
        basketTab.classList.toggle("hidden");
    });

    // Checkout button event listener
    checkoutButton.addEventListener("click", () => {
        // Implement checkout logic here
        tempMessage.classList.remove("hidden");
        basketTab.classList.add("hidden");
    });

    // Temporary message function
    const temporaryMessage = () => {
        tempMessage.classList.remove("hidden");
    };

    // Close temporary message function
    const hideApology = () => {
        tempMessage.classList.add("hidden");
    };

    // add event listener to the closeTempBtn
    closeTempBtn.addEventListener("click", hideApology);

    // Add event listener to the submit button
    submitButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        temporaryMessage(); // Call the temporaryMessage function
    });

    // Event listener for social media buttons
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
        openLinkedIn();
    });
    
    // Function to open social media links
    const openSocialMedia = (url) => {
        // Open the URL in a new blank window
        window.open(url, '_blank');
    };
    
    const openLinkedIn = () => {
        alert("🛠️ ...Apologies user, the site is still being developed for your best experience... 🛠️");
    };

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
        const listItem = document.createElement("div");
        listItem.classList.add("item");

        const nameSpan = document.createElement("span");
        nameSpan.textContent = itemName;
        nameSpan.classList.add("name");
        listItem.appendChild(nameSpan);

        const quantitySpan = document.createElement("span");
        quantitySpan.textContent = ` x ${productCounts[itemName]}`;
        quantitySpan.classList.add("quantity");
        listItem.appendChild(quantitySpan);

        const priceSpan = document.createElement("span");
        priceSpan.textContent = `R${itemPrice.toFixed(2)}`;
        priceSpan.classList.add("price");
        listItem.appendChild(priceSpan);

        document.getElementById("selected-items").appendChild(listItem);
    }

    // Update the total quantity in the counter
    const counter = document.getElementById('counter');
    let totalQuantity = 0;
    Object.values(productCounts).forEach(quantity => {
        totalQuantity += quantity;
    });
    counter.textContent = totalQuantity;

    // Update the quantity display for the specific item
    const quantityDisplay = document.querySelector(`#selected-items .item[data-name="${itemName}"] .quantity`);
    if (quantityDisplay) {
        quantityDisplay.textContent = ` x ${productCounts[itemName]}`;
    }
};



    // Select all elements with class .add-btn
    const addButtons = document.querySelectorAll('.add-btn');

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

    // Clear basket function
    const clearBasket = () => {
        // Clear the product counts
        productCounts = {};

        // Clear the selected items list
        document.getElementById("selected-items").innerHTML = '';

        // Reset the total quantity in the counter
        counter.textContent = '0';
    };

    clearBtn.addEventListener("click", clearBasket);
});
