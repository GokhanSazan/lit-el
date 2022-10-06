import { LitElement, html, css } from "lit-element";
export class UsersFormApp extends LitElement {
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
      min-height: 530px;
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
      width: 90%;
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
      width: 90%;
      display: flex;
      justify-content: flex-start;
      color: black;
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
     background-color:#6FA6AE;
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
      users: {
        id: Number,
        userName: String,
        password: String, // sileriz sonra
      },
    };
  }
  constructor() {
    super();
    this.users = {};
    this.getUsersResponse("http://localhost:8081/todo/getAllUsers",-1); // -1 hepsine cek

  }
  $get = (elem) => this.shadowRoot.querySelector(elem);
  async getUsersResponse(url,id) {
	const response = await fetch(
		url+'?id='+id,
		{
			method: 'GET',
			headers: {
                "Content-Type": "application/json",
              },
		}
	);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
  console.log(data);
  this.users = data;
}
  render() {
    return html`
      <div class="container">
        <div id="login">
          <div class="login-block">
            <h2>User List</h2>
            <table style="width: 100%;">
                    <tr>
                    <td>
                        User ID
                    </td>
                    <td>
                        User Name
                    </td>
                    <td>
                        Password
                    </td>
              </tr>
            ${this.users && this.users.length > 0 && this.users.map((user) => 
            html `<tr>
                 <td>
                 ${user.id}
                 </td>
                 <td>
                 ${user.userName}
                 </td>
                 <td>
                 ${user.password}
                 </td>
                </tr>`
            )}
            </table>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("user-form", UsersFormApp);
