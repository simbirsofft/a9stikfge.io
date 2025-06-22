import DB from './database.js';

document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-items-count');
    const clearCartBtn = document.getElementById('clear-cart');
    
    // Загрузка корзины
    renderCart();
    
    // Обработчики событий
    clearCartBtn?.addEventListener('click', clearCart);
    
    function renderCart() {
        const cart = DB.Cart.getCart();
        
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Ваша корзина пуста</h3>
                    <a href="products.html" class="btn">Вернуться к покупкам</a>
                </div>
            `;
            clearCartBtn.style.display = 'none';
            return;
        }
        
        clearCartBtn.style.display = 'block';
        
        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="images/${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString()} руб.</p>
                    <button class="remove-item">Удалить</button>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus">+</button>
                </div>
                <div class="cart-item-total">
                    ${(item.price * item.quantity).toLocaleString()} руб.
                </div>
            </div>
        `).join('');
        
        // Добавляем обработчики
        addEventListeners();
        updateTotals(cart);
    }
    
    function addEventListeners() {
        // Удаление товара
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.closest('.cart-item').dataset.id);
                DB.Cart.removeFromCart(itemId);
                renderCart();
            });
        });
        
        // Изменение количества
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.closest('.cart-item').dataset.id);
                const quantityElement = this.closest('.cart-item-quantity').querySelector('.quantity');
                let quantity = parseInt(quantityElement.textContent);
                
                if (this.classList.contains('minus')) {
                    quantity = Math.max(1, quantity - 1);
                } else {
                    quantity += 1;
                }
                
                quantityElement.textContent = quantity;
                DB.Cart.updateQuantity(itemId, quantity);
                updateTotals(DB.Cart.getCart());
            });
        });
    }
    
    function updateTotals(cart) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toLocaleString() + ' руб.';
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    function clearCart() {
        localStorage.removeItem('cart');
        renderCart();
    }
});