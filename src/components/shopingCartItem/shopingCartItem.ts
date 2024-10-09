class ShoppingCart extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    };
    connectedCallback(){
        this.render();
    };
    render(){
        if(this.shadowRoot) this.shadowRoot.innerHTML = '';
    };
};
customElements.define('shopping-cart', ShoppingCart);