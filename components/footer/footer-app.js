import { LitElement, html, css } from "lit-element";

export class FooterApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: rgb(7, 33, 70);
    }

    .container {
      justify-content: center;
      align-items: center;
      flex: display;
    }
    .logo {
      display: block;
      height: 120px;
      padding: 10px 0;
      margin: 0 auto;
    }
    #info {
      margin-top: 20px;
      margin-left: 20px;
    }

    @media screen and (max-width: 767px) {
      .logo {
        height: 25px;
        padding: 25px 0px;
      }
    }
  `;

  render() {
    return html`
      <div class="container">
        <img
          src="https://www.bbva.com/wp-content/uploads/2019/04/Logo-BBVA-1024x576.jpg"
          alt="logo"
          class="logo"
        />
      </div>
    `;
  }
}
customElements.define("footer-app", FooterApp);
