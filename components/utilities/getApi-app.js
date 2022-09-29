import { LitElement, html } from "lit-element";

export class GetApi extends LitElement {
  static get properties() {
    return {
      url: { type: String },
      method: { type: String },
    };
  }

  firstUpdated() {
    this.getData();
  }

  constructor() {
    super();
  }

  sendResponse(data) {
    this.dispatchEvent(
      new CustomEvent("ApiData", {
        detail: { data },
        bubbles: true,
        composed: true,
      })
    );
  }

  getData() {
    fetch(this.url, { method: this.method })
      .then((reponse) => {
        return reponse.json();
      })
      .then((data) => this.sendResponse(data))
      .catch((err) => console.error("Ha ocurrido un error", err));
  }
}

customElements.define("get-api", GetApi);
