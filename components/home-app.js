import { LitElement, html, css } from "lit-element";
export class HomeApp extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .container {
      width: 1176px;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
      min-height: 1000px;
    }

    h3,
    h1 {
      color: red;
    }

    #footer {
      margin-top: 400px;
    }
  `;

  static get properties() {
    return {
      id: Number,
      username: String,
      password: String,
      login: String,
      urlSelected: {},
      success: { type: Boolean },
    };
  }

  constructor() {
    super(), (this.urlSelected = "user-profile");
    this.success = false;
    this.id = -1;
    this.username = "";
    this.password = "";
    this.login = "login";
  }

  urlChanged(e) {
    this.urlSelected = e.detail;
  }

  registerRequested() {
    this.login = "register";
  }
  loginRequested() {
    this.login = "login";
  }

  startApp(e) {
    this.id = e.detail.loginId;
    this.success = e.detail.login;
    localStorage.setItem('userId',  this.id);
  }
  stopApp(e) {
    this.id = -1;
    this.success = false;
    this.urlSelected = "user-profile"
  }

  goWorks() {
    this.dispatchEvent(
      new CustomEvent("work", {
        detail: {
          login: true,
          loginId: this.id,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  paintLandingPage() {
    return this.login == "login"
      ? html`<login-app
          @registerreq=${this.registerRequested}
          @sign=${this.startApp}
        ></login-app> `
      : html` <register-app
          @loginreq=${this.loginRequested}
          @sign=${this.startApp}
        ></register-app>`;
  }
  render() {
    return html`
      <div id="home">
        ${
          !this.success
          ? html`<div>${this.paintLandingPage()}</div> `
          : html` 
            <nav-bar
                 urlSelected=${this.urlSelected}
                 @change=${this.urlChanged}
                  @logout=${this.stopApp}>
            </nav-bar>
            ${this.urlSelected === "works-list"
            ? html` <todo-works-app .loginId="${this.id}">
                    </todo-works-app>
                    <footer-app></footer-app>
                  `
            : this.urlSelected === "work-add"
              ? html` <add-works-app .loginId="${this.id}"></add-works-app>
                      <footer-app></footer-app>
                    `
              : html`<user-form></user-form>
                      <footer-app></footer-app>
                    `}
            `
        }
      </div>
    `;
  }
}

customElements.define("home-app", HomeApp);
