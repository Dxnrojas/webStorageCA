import { apiProducts } from "../services/getProducts";
import ProductCard, { Attribute as ProductCardAttribute } from "../components/product/product";
import '../components/product/product';

import { addToCart, getProductsRedux, deleteCart, deleteCartProduct } from '../store/actions';
import { addObserver, appState, dispatch } from '../store/index';

import { setLocalStorage, getLocalStorage } from '../utils/storage';

class Dashboard extends HTMLElement {
    products: ProductCard[] = [];
    cartProducts: ProductCard[] = [];

    constructor()  {
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

            productCard.addEventListener('add-to-cart', () => {
                dispatch(addToCart(product));
                this.updateCart();
            });

            this.products.push(productCard);
        });

        this.renderProducts();
    }

    getCartProducts() {
        const data = appState.cart;
        this.cartProducts = [];

        data.forEach((product: any) => {
            const cartProduct = document.createElement('product-card') as ProductCard;
            cartProduct.setAttribute(ProductCardAttribute.uid, String(product.id));
            cartProduct.setAttribute(ProductCardAttribute.ptitle, product.ptitle);
            cartProduct.setAttribute(ProductCardAttribute.image, product.image);
            cartProduct.setAttribute(ProductCardAttribute.description, product.description);
            cartProduct.setAttribute(ProductCardAttribute.price, String(product.price));

            cartProduct.addEventListener('delete-product', () => {
                dispatch(deleteCartProduct(product.id));
                this.updateCart();
            });

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

        const cartContainer = this.shadowRoot?.querySelector('.cart-container');
        if (cartContainer) {
            cartContainer.innerHTML = '<h1>CART</h1>';
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
