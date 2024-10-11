import { apiProducts } from "../services/getProducts";
import ProductCard, { Attribute as ProductCardAttribute } from "../components/product/product";
import '../components/product/product';

import ShoppingCart, { Attribute as CartProductAttribute } from "../components/product/product"; // Corrige el import
import '../components/shopingCartItem/shopingCartItem';

import { addToCart, setProducts, deleteCart, deleteCartProduct } from '../store/actions'; // Importa las acciones que usaremos
import { addObserver, appState, dispatch } from '../store/index';

import {setLocalStorage, getLocalStorage} from '../utils/storage';

class Dashboard extends HTMLElement {
    products: ProductCard[] = [];
    cartProducts: ShoppingCart[] = [];

    constructor()  {
        super();
        this.attachShadow({ mode: 'open' });
    }

    // Función para renderizar los productos en pantalla
    getProducts() {
        const data = appState.products;

        data.forEach((product: any) => {
            const productCard = document.createElement('product-card') as ProductCard;

            // Asignamos los atributos al componente ProductCard
            productCard.setAttribute(ProductCardAttribute.uid, String(product.uid));
            productCard.setAttribute(ProductCardAttribute.image, product.image);
            productCard.setAttribute(ProductCardAttribute.description, product.description);
            productCard.setAttribute(ProductCardAttribute.category, product.category);
            productCard.setAttribute(ProductCardAttribute.price, String(product.price));
            productCard.setAttribute(ProductCardAttribute.rating, String(product.rating.rate));

            // Escuchar el evento de "añadir al carrito"
            productCard.addEventListener('add-to-cart', () => {
                dispatch(addToCart(product));
                this.updateCart();
            });

            this.products.push(productCard);
        });

        this.renderProducts();
    }

    // Función para renderizar los productos en el carrito
    getCartProducts() {
        const data = appState.cart;

        this.cartProducts = []; // Reseteamos el array de productos en el carrito antes de renderizar

        data.forEach((product: any) => {
            const cartProduct = document.createElement('shopping-cart-item') as ShoppingCart;
            cartProduct.setAttribute(CartProductAttribute.uid, String(product.uid));
            cartProduct.setAttribute(CartProductAttribute.image, product.image);
            cartProduct.setAttribute(CartProductAttribute.price, String(product.price));

            // Añadir un evento para eliminar productos del carrito
            cartProduct.addEventListener('delete-product', () => {
                dispatch(deleteCartProduct(product.uid));
                this.updateCart();
            });

            this.cartProducts.push(cartProduct);
        });
    }

    // Llamada inicial cuando el componente se conecta al DOM
    async connectedCallback() {
        this.render();

        // Si no hay productos en el estado, hacer el dispatch para obtenerlos
        if (appState.products.length === 0) {
            const action = await this.getProducts();
            dispatch(action);
        }

        this.getProducts(); // Llamamos a la función para renderizar los productos
        this.updateCart();  // Actualizamos el carrito
    }

    // Función para actualizar y re-renderizar el carrito
    updateCart() {
        this.getCartProducts(); // Obtén los productos actualizados en el carrito

        const cartContainer = this.shadowRoot?.querySelector('.cart-container');
        if (cartContainer) {
            cartContainer.innerHTML = '<h1>CART</h1>'; // Reinicia el HTML para evitar duplicación
            this.cartProducts.forEach((product) => {
                cartContainer?.appendChild(product);
            });
        }
    }

    // Renderizado principal de la pantalla
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

        // Botón para vaciar el carrito
        const clearCartBtn = this.shadowRoot?.querySelector('.clear-cart');
        clearCartBtn?.addEventListener('click', () => {
            dispatch(deleteCart());
            this.updateCart();
        });

        // Renderizamos los productos del carrito y de la tienda
        this.renderProducts();
    }

    // Función que renderiza los productos en la tienda
    renderProducts() {
        const productsContainer = this.shadowRoot?.querySelector('.products-container');
        if (productsContainer) {
            productsContainer.innerHTML = ''; // Limpia el contenedor antes de agregar nuevos productos
            this.products.forEach((product) => {
                productsContainer.appendChild(product);
            });
        }
    }
}

customElements.define('dashboard-component', Dashboard);
