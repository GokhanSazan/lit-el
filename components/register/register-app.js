import { LitElement, html, css } from "lit-element";
import 'lit-toast/lit-toast.js';
export class RegisterApp extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    * {
      box-sizing: border-box;
    }

    #login {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100vw;
      height: 100vh;
      background: #072146;
    }

    .logo {
      width: 150px;
    }

    h2 {
      color: #fff;
      font-size: 16px;
      font-weight: 400;
    }

    .login-block {
      width: 350px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 15px;
      border: 1px solid #fff;
      border-radius: 4px;
    }

    #error {
      display: none;
      color: red;
      font-size: 14px;
    }

    .container {
      width: 1176px;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
    }

    input,
    button {
      width: 100%;
      margin-bottom: 10px;
      padding: 10px 15px;
      outline: none;
    }

    button {
      width: 100%;
      display: block;
      font-size: 15px;
      line-height: 24px;
      will-change: background-position;
      background-size: 210% 100%;
      background-position: 99% center;
      background-repeat: no-repeat;
      -webkit-transition: background-position 0.66667s
        cubic-bezier(0.24, 0.22, 0.31, 1.07);
      transition: background-position 0.66667s
        cubic-bezier(0.24, 0.22, 0.31, 1.07);
      background-color: #028484;
      background-image: linear-gradient(100deg, #02a5a5 50%, #028484 50%);
      color: #fff;
      text-align: center;
      padding: 16px 32px;
      background-color: #028484;
      cursor: pointer;
      margin-right: 25px;
      text-decoration: none;
      font-weight: 700;
      border: none;
      margin: 0;
    }

    button:hover {
      background-position: 0 center;
    }

    @media screen and (max-width: 767px) {
      h2 {
        font-size: 13px;
        margin-bottom: 13px;
      }

      .login-block {
        width: 310px;
        padding-top: 10px;
      }

      .logo {
        width: 80px;
      }
    }
  `;
  $get = (elem) => this.shadowRoot.querySelector(elem);
  static get properties() {
    return {
      user: {userName: String, password: String },
    };
  }

  constructor() {
    super(), (this.user = {});
  }
  _showToast(msg) {
    this.shadowRoot.querySelector('lit-toast').show(msg, 3000);
  }
  async register() {
    this.user.userName = this.$get("#username").value;
    this.user.password = this.$get("#password").value;

    const error = this.$get("#error");

    console.log(JSON.stringify(this.user));
    if (this.user.userName && this.user.password) {
      this.postData("http://localhost:8081/todo/register", this.user);
    } else {
      error.style.display = "block";
    }

  }
  async postData(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.status == 200){
        this.getResponse("http://localhost:8081/todo/login", this.user.userName,this.user.password);
      }
    }).catch((err)=>{
      console.log(err);
    });
  }
  async getResponse(url, userName, password) {
    const response = await fetch(
      url+'?userName='+userName+'&password='+password,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data !== -1){
      this._showToast("Register Success!");
      //this.goHome(data);
    }else {
      this._showToast("Register Failed!");
    }
  }
  goHome(id) {
    this.dispatchEvent(
      new CustomEvent("loginreq", {
        detail: {
          login: true,
          loginId: id,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
  loginRequested() {
    this.dispatchEvent(new CustomEvent("loginreq", {}));
  }
  render() {
    return html`
      <div id="login">
        <div class="login-block">
          <img
            src="https://www.bbva.com/wp-content/uploads/2019/04/Logo-BBVA-1024x576.jpg"
            alt="logo"
            class="logo"
          />
          <h2>Welcome, Please Save Your Credentials</h2>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="username"
            value=""
          />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            value=""
          />
          <p id="error">Check The Rules!</p>
          <button @click=${this.register}>Registers</button>
          <h2 @click=${this.loginRequested}>Login</h2>
          <lit-toast></lit-toast>
        </div>
      </div>
    `;
  }
}
customElements.define("register-app", RegisterApp);
