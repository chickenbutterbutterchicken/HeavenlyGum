// =======================
// ORIGINAL CODE
// =======================
console.warn(
  "%cHello!!",
  "color: red; font-weight: 600; background: yellow; padding: 0 5px; border-radius: 5px",
  "Feel free to use anything you find here for your projects; credit is appreciated but not required! Visit my website at https://3kh0.net for more information."
);

// this setting controls if ads are shown,
// more info on the README.md file
var adStatus = localStorage.getItem("adConsent") === "true"; // default: true

if (!adStatus) {
  (function () {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5756835229788588";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
    console.log("Ads enabled, thank you for your support!");
  })();
}

const script = document.createElement("script");
script.src = "https://data.3kh0.net/script.js";
script.defer = true;
script.setAttribute("data-website-id", "47d72bde-ba44-4125-b161-00e0c2f5b7f0");
document.head.appendChild(script);
script.onload = function() {
  console.log("Data script loaded");
  umami.track([location.hostname, "pageview"].join("/"));
};

const local_title = localStorage.getItem("title");
const local_icon = localStorage.getItem("icon");
if (window.localStorage.hasOwnProperty("title")) {
  document.title = local_title;
  console.log("Title set to: " + local_title);
}
if (window.localStorage.hasOwnProperty("icon")) {
  document.querySelector("link[rel=icon]").href = local_icon;
  console.log("Icon set to: " + local_icon);
}

// =======================
// HEAVENLY GUM GAME FETCH + UI
// =======================
let games = [];

function initGames() {
  fetch("./config/games.json")
    .then((response) => response.json())
    .then((data) => {
      games = data;
      const container = document.getElementById("game-container");
      container.innerHTML = ""; // clear any previous content
      data.forEach((project) => {
        const game = document.createElement("a");
        game.href = project.link;
        game.className = "game-link container";
        game.innerHTML = `
          <div class="game-tile">
            <img class="game-icon" src="${project.imgSrc}" alt="icon" />
            <p class="game-title">${project.title}</p>
          </div>`;
        container.appendChild(game);
      });
      document.getElementById("loader").style.display = "none";
    })
    .catch((error) => {
      console.error("Error loading games.json:", error);
      document.getElementById("loader").style.display = "none"; // hide loader even if fetch fails
    });
}

function searchGames() {
  const input = document.getElementById("search");
  const filter = input.value.toUpperCase();
  const container = document.getElementById("game-container");
  container.innerHTML = "";
  games
    .filter((game) => game.title.toUpperCase().includes(filter))
    .forEach((project) => {
      const game = document.createElement("a");
      game.href = project.link;
      game.className = "game-link container";
      game.innerHTML = `
        <div class="game-tile">
          <img class="game-icon" src="${project.imgSrc}" alt="icon" loading="lazy" />
          <p class="game-title">${project.title}</p>
        </div>`;
      container.appendChild(game);
    });
}

// Initialize game list when page loads
window.addEventListener("DOMContentLoaded", initGames);

// Back-to-top button logic
const backToTopButton = document.getElementById("back-to-top");
window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.

