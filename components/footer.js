// header.js
class Footer extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <style>
        :root {
            --brand-green: #093f26;
            --hoover-green : #0c5f38;
            --dark-background :#202020;
            --dark-accent : #161616;
            --dark-header : #000;
            --light-text-color : #ddd;
            --background-color : #f8f8f8;
            --dark-link-color : #60ae8a;
            --dark-link-hover : #8edbb0;
            --text-color : #333;
            --shdadows-box : rgba(0, 0, 0, 0.3);
            --hero-bg : #eee;
            }

            header {
            background: var(--brand-green);
            color: var(--light-text-color);
            padding: 1rem;
            position: sticky;
            top: 0;
            }

            footer {
            text-align: center;
            padding: 1rem;
            background: var(--brand-green);
            color: var(--light-text-color);
            }

            body.dark header,
            body.dark footer {
            background: var(--dark-header);
            }
      </style>
        <footer>
        <p>&copy; 2025 Chloé Boireau-Devier</p>
        </footer>
    `;
  }
}
customElements.define("footer-component", Footer);
