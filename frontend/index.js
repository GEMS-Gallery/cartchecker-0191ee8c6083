import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const categoriesContainer = document.getElementById('categories');
    const shoppingList = document.getElementById('shopping-list');
    const addItemForm = document.getElementById('add-item-form');
    const newItemInput = document.getElementById('new-item');

    async function renderCategories() {
        const categories = await backend.getCategories();
        categoriesContainer.innerHTML = '';
        categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            categoryDiv.innerHTML = `
                <h2>${category.name}</h2>
                <div class="category-items">
                    ${category.items.map(item => `
                        <button class="category-item" data-category="${category.name}">${item}</button>
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
                <span>${item.description} (${item.category})</span>
                <button class="toggle-btn" data-id="${item.id}">
                    <i class="fas ${item.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
                </button>
                <button class="delete-btn" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            shoppingList.appendChild(li);
        });
    }

    categoriesContainer.addEventListener('click', async (e) => {
        if (e.target.classList.contains('category-item')) {
            const description = e.target.textContent;
            const category = e.target.dataset.category;
            await backend.addItem(description, category);
            await renderShoppingList();
        }
    });

    addItemForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const description = newItemInput.value.trim();
        if (description) {
            await backend.addItem(description, 'Custom');
            newItemInput.value = '';
            await renderShoppingList();
        }
    });

    shoppingList.addEventListener('click', async (e) => {
        if (e.target.closest('.toggle-btn')) {
            const id = parseInt(e.target.closest('.toggle-btn').dataset.id);
            const item = e.target.closest('.shopping-item');
            const completed = !item.classList.contains('completed');
            await backend.updateItem(id, completed);
            await renderShoppingList();
        } else if (e.target.closest('.delete-btn')) {
            const id = parseInt(e.target.closest('.delete-btn').dataset.id);
            await backend.deleteItem(id);
            await renderShoppingList();
        }
    });

    await renderCategories();
    await renderShoppingList();
});