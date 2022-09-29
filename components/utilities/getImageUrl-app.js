import { LitElement, html } from "lit-element";

export class GetImageUrlApp extends LitElement {
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
      new CustomEvent("ImageData", {
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
      .then((data) => {
        this.sendResponse(data.results[0].poster_path);
      })
      .catch((err) => console.error("Ha ocurrido un error", err));
  }
}

customElements.define("get-image", GetImageUrlApp);
