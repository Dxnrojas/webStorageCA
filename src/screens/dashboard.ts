import { apiProducts } from "../services/getProducts";
import ProductCard, { Attribute as ProductCardAttribute } from "../components/product/product";
import '../components/product/product';

import { addToCart, getProductsRedux, deleteCart } from '../store/actions';
import { appState, dispatch } from '../store/index';
import storage from '../utils/storage';

class Dashboard extends HTMLElement {
    products: ProductCard[] = [];
    cartProducts: HTMLElement[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async getProducts() {
        const data = appState.products;
        console.log('Data fetched from state:', data);

        data.forEach((product: any) => {
            const productCard = document.createElement('product-card') as ProductCard;

            productCard.setAttribute(ProductCardAttribute.uid, String(product.id));
            productCard.setAttribute(ProductCardAttribute.ptitle, product.ptitle);
            productCard.setAttribute(ProductCardAttribute.image, product.image);
            productCard.setAttribute(ProductCardAttribute.description, product.description);
            productCard.setAttribute(ProductCardAttribute.category, product.category);
            productCard.setAttribute(ProductCardAttribute.price, String(product.price));
            productCard.setAttribute(ProductCardAttribute.rating, String(product.rating.rate));

            // Manejar el evento de clic en el botón de la tarjeta de producto
            productCard.addEventListener('add-to-cart', (event: Event) => {
                const customEvent = event as CustomEvent;
                const productDetails = customEvent.detail;
                dispatch(addToCart(productDetails));
                this.updateCart();

                // Guardar en localStorage
                const cartItems = storage.get('CART_ITEMS', []);
                const existingProductIndex = cartItems.findIndex((item: any) => item.uid === productDetails.uid);
                if (existingProductIndex === -1) {
                    cartItems.push(productDetails);
                    storage.set('CART_ITEMS', cartItems);
                } else {
                    console.log('El producto ya está en el carrito.');
                }
            });

            this.products.push(productCard);
        });

        this.renderProducts();
    }

    getCartProducts() {
        const data = appState.cart;
        this.cartProducts = [];

        data.forEach((product: any) => {
            const cartProduct = document.createElement('div');
            cartProduct.innerHTML = `
                <div style="border: 1px solid #ddd; padding: 10px; margin: 10px;">
                    <h3>${product.ptitle}</h3>
                    <img src="${product.image}" alt="Product image" style="max-width: 50px;"/>
                    <p>Price: ${product.price}</p>
                </div>
            `;
            this.cartProducts.push(cartProduct);
        });
    }

    async connectedCallback() {
        this.render();

        if (appState.products.length === 0) {
            const action = await getProductsRedux();
            dispatch(action);
        }

        this.getProducts();
        this.updateCart();
    }

    updateCart() {
        this.getCartProducts();

        const cartContainer = this.shadowRoot?.querySelector('.cart-items');
        if (cartContainer) {
            cartContainer.innerHTML = '';
            this.cartProducts.forEach((product) => {
                cartContainer?.appendChild(product);
            });
        }
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <section class="store-container">
                <main class="products-container"></main>
                <aside class="cart-container">
                    <h1>CART</h1>
                    <div class="cart-items"></div>
                    <button class="clear-cart">Clear Cart</button>
                </aside>
            </section>
        `;

        const clearCartBtn = this.shadowRoot?.querySelector('.clear-cart');
        clearCartBtn?.addEventListener('click', () => {
            dispatch(deleteCart());
            this.updateCart();
        });

        this.renderProducts();
    }

    renderProducts() {
        const productsContainer = this.shadowRoot?.querySelector('.products-container');
        if (productsContainer) {
            productsContainer.innerHTML = ''; 
            this.products.forEach((product) => {
                productsContainer.appendChild(product);
            });
        }
    }
}

customElements.define('dashboard-component', Dashboard);
