// header.js
class Footer extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <link rel="stylesheet" href="css/style.css">
      <footer>
      <p>&copy; 2025 Chloé Boireau-Devier</p>
      </footer>
    `;
  }
}
customElements.define("footer-component", Footer);
