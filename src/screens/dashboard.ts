import { apiProducts } from "../services/getProducts";
import ProductCard, { Attribute as ProductCardAttribute } from "../components/product/product";
import '../components/product/product';

import ShoppingCart, { Attribute as CartProductAttribute } from "../components/product/product"; 
import '../components/shopingCartItem/shopingCartItem';

import { addToCart, getProductsRedux, deleteCart, deleteCartProduct } from '../store/actions'; 
import { addObserver, appState, dispatch } from '../store/index';

import {setLocalStorage, getLocalStorage} from '../utils/storage';

class Dashboard extends HTMLElement {
    products: ProductCard[] = [];
    cartProducts: ShoppingCart[] = [];

    constructor()  {
        super();
        this.attachShadow({ mode: 'open' });
    }

    getProducts() {

        console.log('RENDER PRODUCTS');
        const data = appState.products;
        console.log('DATA', data);

        data.forEach((product: any) => {
            const productCard = document.createElement('product-card') as ProductCard;


            productCard.setAttribute(ProductCardAttribute.uid, String(product.uid));
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
            const cartProduct = document.createElement('shopping-cart-item') as ShoppingCart;
            cartProduct.setAttribute(CartProductAttribute.uid, String(product.uid));
            cartProduct.setAttribute(CartProductAttribute.image, product.image);
            cartProduct.setAttribute(CartProductAttribute.price, String(product.price));

            cartProduct.addEventListener('delete-product', () => {
                dispatch(deleteCartProduct(product.uid));
                this.updateCart();
            });

            this.cartProducts.push(cartProduct);
        });
    }

   
    async connectedCallback() {
        this.render();

     
        // if (appState.products.length === 0) {
        //     const action = await getProductsRedux();
        //     dispatch(action);
        // }

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
