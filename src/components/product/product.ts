export enum Attribute {
  "uid" = "uid",
  "button" = "button",
  "image" = "image",
  "ptitle" = "ptitle", 
  "description" = "description",
  "category" = "category",
  "price" = "price",
  "rating" = "rating",
}

class Product extends HTMLElement {
  uid?: number;
  button?: string;
  image?: string;
  ptitle?: string;  
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
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <div style="border: 1px solid #ddd; padding: 10px; margin: 10px; width: 200px;">
            <h2>${this.ptitle ? this.ptitle : 'No title available'}</h2> <!-- Renderiza el título -->
            <img src="${this.image}" alt="Product image" style="max-width: 100%;"/>
            <p>Description: ${this.description ? this.description : 'No description available'}</p>
            <p>Category: ${this.category ? this.category : 'Unknown'}</p>
            <p>Price: ${this.price ? '$' + this.price : 'N/A'}</p>
            <p>Rating: ${this.rating ? this.rating + ' stars' : 'Not rated yet'}</p>
            <button style="padding: 10px; background-color: #007BFF; color: white;">${this.button ? this.button : 'Add to cart'}</button>
        </div>
      `;
    }
  }
}

customElements.define("product-card", Product);
export default Product;
