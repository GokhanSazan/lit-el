import { LitElement, html, css } from "lit-element";
import "../utilities/getApi-app";
import "../utilities/getImageUrl-app";

export class MoviePageApp extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    * {
      box-sizing: border-box;
    }
    .pagecolor {
      width: 100%;
      background-color: #fffff0;
      justify-content: center;
      align-items: center;
      min-height: 1300px;
      margin-top: -40;
    }
    .container {
      width: 80%;
      justify-content: center;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
      background-color: #fffff0;
      min-height: 1000px;
    }

    .album {
      width: 31%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
    }

    .albums-block {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }

    .album_img {
      width: 300px;
      height: 600px;
      position: relative;
      background-size: cover !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
      border: 3px solid #072146;
      border-radius: 4px;
    }

    .album_id {
      position: absolute;
      top: 8px;
      left: 8px;
      font-size: 19px;
      border-radius: 17px;
      font-weight: 700;
      padding: 5px;
      font-family: "Montserrat", sans-serif;

      color: rgb(1, 566, 1);
      background-color: #072146;
      /* background-color: rgb(44, 1, 66); */
    }

    h2 {
      font-size: 36px;
      line-height: 40px;
      color: #121212;
      margin-bottom: 34px;
    }

    .album-info {
      display: flex;
      justify-content: "center";
      align-items: "center";
      flex-direction: column;
    }
    .title {
      font-size: 15px;
      line-height: 24px;
      color: #fffff0;
      border-radius: 5px;
      justify-content: "center";
      align-items: "center";
      padding: 2px;
      background-color: #072146;

      font-weight: 700;
    }

    @media screen and (max-width: 1024px) {
      .container {
        padding: 0px 30px 25px;
        margin-bottom: 15px;
      }
    }

    @media screen and (max-width: 767px) {
      h2 {
        font-size: 24px;
        line-height: 20px;
        margin-top: 30px;
      }

      .container {
        margin-bottom: 0;
        padding-bottom: 15px;
      }

      .album {
        width: 100%;
        align-items: flex-start;
      }
    }
  `;

  static get properties() {
    return {
      albums: {
        title: String,
        year: Number,
        rating: Number,
        genre: String,
        url: String,
      },
      numAlbums: { type: Number },
      imageUrl: { type: String },
      count: Number(0),
      genre: String,
      loginId: Number,
    };
  }

  constructor() {
    super();
    this.count = 0;

    this.numAlbums;
    this.albums = [];
    this.addEventListener("ApiData", (event) => {
      this.albums = event.detail.data;
    });
    this.addEventListener("ImageData", (event) => {
      this.imageUrl = event.detail.data;
      this.albums[this.count].url = event.detail.data;
      this.count++;
    });
  }

  paintAlbums() {
    return this.albums.map((album, index) => {
      return this.albums.length >= 1 && this.imageUrl != ""
        ? html`
            <get-image
              url="https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${album.title}"
            >
              method='GET'></get-image
            >

            <div class="album">
              <div
                class="album_img"
                style="background: url(http://image.tmdb.org/t/p/w500/${album.url})"
              >
                <span class="album_id">${album.rating}</span>
                <span class="album_id">${album.rating}</span>
              </div>
              <div class="album-info">
                <p class="title">${album.title}</p>
                <p class="year">${album.year} - ${album.genre}</p>
              </div>
            </div>
          `
        : "";
    });
  }

  render() {
    return html`
      <div class="pagecolor">
        <div class="container">
          <h2>Movies For You</h2>
          <get-api url="http://localhost:8080/user/${this.loginId}">
            method='GET'>
          </get-api>

          <div class="albums-block">${this.paintAlbums()}</div>
        </div>
      </div>
    `;
  }
}

customElements.define("moviepage-app", MoviePageApp);
