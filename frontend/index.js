import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const categoriesContainer = document.getElementById('categories');
    const shoppingList = document.getElementById('shopping-list');
    const addItemForm = document.getElementById('add-item-form');
    const newItemInput = document.getElementById('new-item');
    const viewToggleBtn = document.getElementById('view-toggle-btn');

    let isGridView = true;

    async function renderCategories() {
        const categories = await backend.getCategories();
        categoriesContainer.innerHTML = '';
        categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            categoryDiv.innerHTML = `
                <h2>${category.name}</h2>
                <div class="category-items">
                    ${category.items.map(([item, emoji]) => `
                        <button class="category-item" data-category="${category.name}" data-emoji="${emoji}">
                            <span class="emoji">${emoji}</span>${item}
                        </button>
                    `).join('')}
                </div>
            `;
            categoriesContainer.appendChild(categoryDiv);
        });
    }

    async function renderShoppingList() {
        const items = await backend.getItems();
        shoppingList.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.className = `shopping-item ${item.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span>${item.emoji} ${item.description}</span>
                <div class="actions">
                    <button class="delete-btn" data-id="${item.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            shoppingList.appendChild(li);
        });
    }

    function toggleView() {
        isGridView = !isGridView;
        if (isGridView) {
            shoppingList.classList.remove('list-view');
            shoppingList.classList.add('grid-view');
            viewToggleBtn.innerHTML = '<i class="fas fa-list"></i> List View';
        } else {
            shoppingList.classList.remove('grid-view');
            shoppingList.classList.add('list-view');
            viewToggleBtn.innerHTML = '<i class="fas fa-th"></i> Grid View';
        }
    }

    viewToggleBtn.addEventListener('click', toggleView);

    categoriesContainer.addEventListener('click', async (e) => {
        if (e.target.classList.contains('category-item')) {
            const description = e.target.textContent.trim();
            const category = e.target.dataset.category;
            const emoji = e.target.dataset.emoji;
            await backend.addItem(description, category, emoji);
            await renderShoppingList();
        }
    });

    addItemForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const description = newItemInput.value.trim();
        if (description) {
            await backend.addItem(description, 'Custom', '🔹');
            newItemInput.value = '';
            await renderShoppingList();
        }
    });

    shoppingList.addEventListener('click', async (e) => {
        if (e.target.closest('.delete-btn')) {
            const id = parseInt(e.target.closest('.delete-btn').dataset.id);
            await backend.deleteItem(id);
            await renderShoppingList();
        }
    });

    await renderCategories();
    await renderShoppingList();
});