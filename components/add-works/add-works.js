import { LitElement, html, css } from "lit-element";
import 'lit-toast/lit-toast.js';
export class AddWorksApp extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    * {
      box-sizing: border-box;
    }
    .container {
      display: flex;
      background-color: #fffff0;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
      min-height: 500px;
      width: 100%;
    }
    #login {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      background: #2f4f4f;
      min-width: 100%;
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
      width: 450px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 40px;
      margin: 45px;
      background-color: #072146;
      padding-top: 40px;
    }
    .login-block-p {
      width: 50%;
      display: flex;
      justify-content: flex-start;
      color: white;
      align-items: flex-start;
      flex-direction: column;
      padding: 50px;
      font-family: "Montserrat", sans-serif;
      margin: 45px;
      background-color: #072146;
    }
    #error {
      display: none;
      color: red;
      font-size: 14px;
    }

    #instructions {
      font-size: 26px;
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
    table, tr, td {
     border: 1px solid black;
     background-color:grey;
    }
    button:hover {
      background-position: 0 center;
    }

    @media screen and (max-width: 767px) {
      h2 {
        font-size: 13px;
        margin-bottom: 13px;
      }
      #instructions {
        font-size: 12px;
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

  static get properties() {
    return {
        works: {
          userid: Number,
          name: String,
          priority: Number,
          explanation: String,
        },
      };
  }
  constructor() {
    super();
    this.todoworks = {};
  }
  $get = (elem) => this.shadowRoot.querySelector(elem);
  _showToast(msg) {
    this.shadowRoot.querySelector('lit-toast').show(msg, 3000);
  }
  _saveworks() {
    if (this.$get("#priority").value > 10 || this.$get("#priority").value < 1){
        this._showToast("Please select priority in (1-10)");
    } else {
        this.todoworks.userid = localStorage.getItem("userId");
        this.todoworks.name = this.$get("#name").value;
        this.todoworks.priority = this.$get("#priority").value;
        this.todoworks.explanation = this.$get("#explanation").value;
        const error = this.$get("#error");
        if ( this.todoworks.userid && this.todoworks.name && this.todoworks.priority && this.todoworks.explanation) {
        this.postData("http://localhost:8081/todo/saveWork", this.todoworks);
        } else {
        error.style.display = "block";
        }
    }
  }
  async postData(url = "", data = {}) {

    const response = await fetch(url, {
      method: "POST",
      mode: "cors", 
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    }).then((response) => {
        if (response.status == 200){
            this._showToast("Work is '" + this.todoworks.name + "' saved!");
        }
      }).catch(function (error) {
        this._showToast("Work is '" + this.todoworks.name + "' not saved!" + error);
    })
  }
  render() {
    return html`
      <div class="container">
        <div id="login">
          <div class="login-block">
            <h2>Add New Work to The System</h2>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Work Name"
              value=""
            />
            <input
              id="priority"
              type="number"
              name="priority"
              max="10"
              min="1"
              placeholder="Priority (1-10)"
              value=""
            />
            <input
              id="explanation"
              type="text"
              name="explanation"
              placeholder="Explanation"
              value=""
            />
            <button @click=${this._saveworks}>SAVE WORKS</button>
            <lit-toast></lit-toast>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("add-works-app", AddWorksApp);
