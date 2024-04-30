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
    const totalDueSpan = document.getElementById('total-due');
    const counter = document.getElementById('counter');
    const selectedItems = document.getElementById("selected-items");

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

// Function to generate a code summarizing the contents of the basket including the total amount due
const generateBasketCode = () => {
    let code = "Basket Summary:\n";
    const items = document.querySelectorAll('.item');
    let totalPrice = 0; // Initialize total price variable

    items.forEach(item => {
        const itemName = item.querySelector('.name').textContent;
        const quantity = item.querySelector('.quantity').textContent.trim().split(' ')[1];
        const price = parseFloat(item.querySelector('.price').textContent.substring(1)); // Parse price as float
        const itemTotalPrice = price * parseInt(quantity); // Calculate total price for this item
        totalPrice += itemTotalPrice; // Accumulate total price
        code += `${itemName}: ${quantity} x ${price.toFixed(2)} = R${itemTotalPrice.toFixed(2)}\n`; // Append item details to code
    });

    code += `Total Amount Due: R${totalPrice.toFixed(2)}\n`; // Append total amount due to code

    return code;
};

// Function to close the basket summary
const closeOrderSummary = () => {
    console.log("Closing basket summary"); // Check if function is being called
    tempMessage.innerHTML = ''; // Clear the content
    tempMessage.classList.add("hidden");
};

// Update the checkout button event listener
checkoutButton.addEventListener("click", () => {
    const basketCode = generateBasketCode();
    tempMessage.innerHTML = `
        <div id="order-summary">
            <h2>Order Summary</h2>
            <pre>${basketCode}</pre>
            <button id="closeButton">Close</button>
        </div>
    `;
    tempMessage.classList.remove("hidden");
    basketTab.classList.add("hidden");
;
    // Add event listener to the close button
    document.getElementById("closeButton").addEventListener("click", closeOrderSummary);
    document.getElementById("closeButton").addEventListener("click", clearBasket);
})

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

    // Optionally, you can submit the form here if needed
    // For example, if you have a form element with id "contact-form":
    // document.getElementById("contact-form").submit();
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
        temporaryMessage();
    };

    // Initialize an object to hold counts for each product
    let productCounts = {};

// Function to add an item to the selected items list
const addItemToList = (itemName, itemPrice) => {
    // Check if the product already exists in the list
    if (productCounts[itemName]) {
        // Increment the quantity
        productCounts[itemName]++;

        // Update the quantity span for the existing item
        const existingItem = document.querySelector(`.item[data-name="${itemName}"]`);
        const quantitySpan = existingItem.querySelector('.quantity');
        quantitySpan.textContent = ` x ${productCounts[itemName]}`;
    } else {
        // Create list item if it's a new product
        productCounts[itemName] = 1;

        const listItem = document.createElement("div");
        listItem.classList.add("item");
        listItem.setAttribute("data-name", itemName);

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

        selectedItems.appendChild(listItem);
    }

    // Function to update the total amount due
    const updateTotalDue = () => {
        let totalDue = 0;
        Object.entries(productCounts).forEach(([itemName, quantity]) => {
            const itemPrice = parseFloat(document.querySelector(`.item[data-name="${itemName}"] .price`).textContent.substring(1));
            totalDue += itemPrice * quantity;
        });
        totalDueSpan.textContent = `Total Due: R${totalDue.toFixed(2)}`;
    };

    // Update the total quantity in the counter
    let totalQuantity = 0;
    Object.values(productCounts).forEach(quantity => {
        totalQuantity += quantity;
    });
    counter.textContent = totalQuantity;

    // Update the total amount due
    updateTotalDue();
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
        selectedItems.innerHTML = '';

        // Reset the total quantity in the counter
        counter.textContent = '0';

        // Reset the total amount due
        totalDueSpan.textContent = 'Total Due: R0.00';
    };

    clearBtn.addEventListener("click", clearBasket);
});
