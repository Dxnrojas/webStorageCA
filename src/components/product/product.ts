export enum Attribute {
  "uid" = "uid",
  "button" = "button",
  "image" = "image",
  "description" = "description",
  "category" = "category",
  "price" = "price",
  "rating" = "rating",
}

class Product extends HTMLElement {
  uid?: number;
  button?: string;
  image?: string;
  description?: string;
  category?: string;
  price?: number;
  rating?: number;

  static get observedAttributes() {
    return Object.keys(Attribute);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
    switch (propName){
        case Attribute.price:
            this[propName] = Number(newValue);
            break;

        case Attribute.rating:
            this[propName] = Number(newValue);
            break;
        
        case Attribute.uid:
            this[propName] = Number(newValue);
            break;

        default:
            this[propName] = newValue;
            break;
    }
}

  render() {
    if (this.shadowRoot){
        this.shadowRoot.innerHTML = `
            <div>
                <h2>${this.description}</h2>
                <img src="${this.image} />
                <p>Category: ${this.category}</p>
                <p>Price: ${this.price}</p>
                <p>Rating: ${this.rating}</p>
                <button>Add to cart${this.button}</button>
            </div>
        `;
    };

    
  }
}

customElements.define("my-product", Product);
export default Product;
