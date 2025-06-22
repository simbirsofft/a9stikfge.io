import DB from './database.js';

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины
    updateCartCount();
    
    // Обработчик для кнопок "В корзину"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const product = {
                id: productId,
                name: e.target.dataset.name,
                price: parseInt(e.target.dataset.price),
                image: e.target.dataset.image
            };
            
            DB.Cart.addToCart(product);
            updateCartCount();
            showAddedNotification(product.name, e.target);
        }
    });
    
    // Обновление счетчика корзины
    function updateCartCount() {
        const count = DB.Cart.getTotalCount();
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
        });
    }
    
    // Показ уведомления
    function showAddedNotification(productName, button) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <p>${productName} добавлен в корзину</p>
            <a href="cart.html">Перейти в корзину</a>
        `;
        document.body.appendChild(notification);
        
        // Анимация кнопки
        button.innerHTML = '<i class="fas fa-check"></i> Добавлено';
        button.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            notification.remove();
            button.innerHTML = 'В корзину';
            button.style.backgroundColor = '';
        }, 2000);
    }
});