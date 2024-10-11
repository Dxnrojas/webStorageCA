import './screens/dashboard'
import { addObserver } from './store/index';
import { appState } from './store/index';

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
    }

    connectedCallback() {
        this.render();
        console.log(appState);
    }

    render() {
        if(this.shadowRoot) this.shadowRoot.innerHTML = '';
        switch(appState.screen){
            case 'DASHBOARD':
                const dashboard = this.ownerDocument.createElement('dashboard-component');
                this.shadowRoot?.appendChild(dashboard);
                break;
            default:
                if(this.shadowRoot){
                    this.shadowRoot.innerHTML = `<h1>404</h1>`;
                }
                break;
                
        }
    }
}

customElements.define('app-container', AppContainer);