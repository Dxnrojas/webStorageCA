class Dashboard extends HTMLElement {
    
    constructor() {
       super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        await this.render();
    }


    async render() {
        
    }
}

customElements.define('app-dashboard', Dashboard);
export default Dashboard;
