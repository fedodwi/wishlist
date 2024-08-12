document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wishlistForm');
    const itemNameInput = document.getElementById('itemName');
    const itemDescriptionInput = document.getElementById('itemDescription');
    const wishlistItems = document.getElementById('wishlistItems');

    // Load items from localStorage
    function loadItems() {
        const items = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        items.forEach(item => {
            addItemToList(item.name, item.description);
        });
    }

    // Save item to localStorage
    function saveItem(name, description) {
        const items = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        items.push({ name, description });
        localStorage.setItem('wishlistItems', JSON.stringify(items));
    }

    // Add item to the list
    function addItemToList(name, description) {
        const listItem = document.createElement('li');
        listItem.classList.add('wishlist-item');

        const textContainer = document.createElement('div');
        textContainer.classList.add('item-text');
        textContainer.innerHTML = `<strong>${name}</strong>: ${description}`;
        listItem.appendChild(textContainer);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            listItem.remove();
            removeItemFromStorage(name);
        });

        listItem.appendChild(deleteButton);
        wishlistItems.appendChild(listItem);
    }

    // Remove item from localStorage
    function removeItemFromStorage(name) {
        let items = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        items = items.filter(item => item.name !== name);
        localStorage.setItem('wishlistItems', JSON.stringify(items));
    }

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = itemNameInput.value;
        const description = itemDescriptionInput.value;

        if (name && description) {
            addItemToList(name, description);
            saveItem(name, description);
            form.reset();
        }
    });

    // Initial load
    loadItems();
});
