const productsData = [
    {id: 1, name: "Windows 11 Pro", price: 12990, image: "windows11.jpg"},
    {id: 2, name: "Microsoft Office 2021", price: 8990, image: "office2021.jpg"},
    {id: 3, name: "Adobe Photoshop 2023", price: 14990, image: "photoshop.jpg"},
    {id: 4, name: "Kaspersky Total Security", price: 3490, image: "kaspersky.jpg"},
    {id: 5, name: "JetBrains WebStorm", price: 6990, image: "webstorm.jpg"},
    {id: 6, name: "CorelDRAW Graphics Suite", price: 7990, image: "coreldraw.jpg"},
    {id: 7, name: "Windows Server 2022", price: 24990, image: "windowsserver.jpg"},
    {id: 8, name: "Microsoft 365 Personal", price: 3990, image: "office365.jpg"},
    {id: 9, name: "Adobe Illustrator 2023", price: 13990, image: "illustrator.jpg"},
    {id: 10, name: "Dr.Web Security Space", price: 2990, image: "drweb.jpg"},
    {id: 11, name: "JetBrains IntelliJ IDEA", price: 7990, image: "intellij.jpg"},
    {id: 12, name: "Corel PaintShop Pro", price: 5990, image: "paintshop.jpg"}
];

const DB = {
    Cart: {
        getCart: () => JSON.parse(localStorage.getItem('cart')) || [],
        
        addToCart: function(product) {
            let cart = this.getCart();
            const existingItem = cart.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({...product, quantity: 1});
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            return cart;
        },
        
        removeFromCart: function(productId) {
            let cart = this.getCart().filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            return cart;
        },
        
        updateQuantity: function(productId, quantity) {
            let cart = this.getCart();
            const item = cart.find(item => item.id === productId);
            if (item) item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            return cart;
        },
        
        getTotalCount: function() {
            return this.getCart().reduce((total, item) => total + item.quantity, 0);
        }
    },
    
    Product: {
        findById: (id) => productsData.find(p => p.id === id),
        findAll: () => productsData
    }
};

export default DB;