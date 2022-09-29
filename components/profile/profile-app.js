import { LitElement, html, css } from "lit-element";

export class ProfileFormApp extends LitElement {
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
      min-height: 1000px;
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

    button:hover {
      background-position: 0 center;
    }

    @media screen and (max-width: 767px) {
      h2 {
        font-size: 13px;
        margin-bottom: 13px;
      }
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
        id: Number,
        userid: Number,
        name: String,
        priority: Number,
        explanation: String,
      },
    };
  }
  constructor() {
    super();
    this.works = {};
  }
  $get = (elem) => this.shadowRoot.querySelector(elem);

  _update() {
    this.works.id = this.$get("#id").value;
    this.works.userid = this.$get("#userid").value;
    this.works.name = this.$get("#name").value;
    this.works.priority = this.$get("#priority").value;
    this.works.explanation = this.$get("#explanation").value;
    const error = this.$get("#error");

    if (this.works.id && this.works.userid && this.works.name && this.works.priority && this.works.explanation) {
      this.postData("http://localhost:8081/todo/updateWork", this.works);
    } else {
      error.style.display = "block";
    }
  }
  async postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
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
        console.log("Update Success!");
      }
    }).catch(function (error) {
      console.log(error);
  })
  }
  render() {
    return html`
      <div class="container">
        <div id="login">
          <div class="login-block">
            <h2>Update Works</h2>
            <input
              id="id"
              type="number"
              name="id"
              placeholder="id"
              value=""
            />
            <input
              id="userid"
              type="number"
              name="userid"
              placeholder="User ID"
              value=""
            />
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

            <p id="error">Check The Work!</p>
            <button @click=${this._update}>Update Work</button>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("profile-form", ProfileFormApp);
