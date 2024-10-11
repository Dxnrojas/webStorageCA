export interface Product {
    uid: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
  }


class ShoppingCart extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    };
    connectedCallback(){
        this.render();
    };
    render(){
        if(this.shadowRoot)
            {this.shadowRoot.innerHTML = ''

            };
    };
};
customElements.define('shopping-cart', ShoppingCart);
export default ShoppingCart;