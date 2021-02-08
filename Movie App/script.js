// tmdb URL 
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7c1d6176633c95f5ec59edb956adff5f";
// tmdb image path 
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  // search url for tmbd 
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=7c1d6176633c95f5ec59edb956adff5f&query="';

  // tmdb has 500 pages 
let currentPage = 1;
// async function to get movies 
function getMovies(url) {
  let res = fetch(url);
  res
    .then(function (data) {
      return data.json();
    })
    .then(function (movieData) {
      showMovies(movieData.results);
    });
}

getMovies(API_URL);
const section = document.querySelector("section");
// Rendering Movies - DOM
function showMovies(movies) {
  section.innerHTML = "";
  movies.forEach((movie) => {
    const movieTitle = movie.title;
    const poster_path = movie.poster_path;
    const vote_average = movie.vote_average;
    const overview = movie.overview;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `<img
    src="${IMAGE_PATH + poster_path}"
    alt="${movieTitle}"
  />
  <div class="movie-info">
    <h3>${movieTitle}</h3>
    <span class="${getRatingColor(vote_average)}">${vote_average}</span>
  </div>
  <div class="overview">
    <i class="fas fa-times"></i>
    <h3>Overview</h3>
    ${overview}
  </div>`;

    section.appendChild(movieEl);
  });
  eventListeners();
}
function getRatingColor(voteAverage) {
  if (voteAverage >= 8) {
    return "green";
  } else if (voteAverage >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
const form = document.getElementById("form");
const search = document.getElementById("search");
// Search Function 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchTerm = search.value;
  searchTerm = searchTerm.trim();
  if (searchTerm !== "") {
    getMovies(SEARCH_URL + searchTerm);
  } else {
    window.location.reload();
  }
  search.value = "";
});

// Pagination 

const pagination = document.querySelector(".pagination");
function eventListeners() {
  pagination.innerHTML = "";
  const prevButton = document.createElement("button");
  prevButton.innerHTML = "Prev";
  prevButton.style.color = "#fff";
  prevButton.classList.add("btn", "prev");
  pagination.appendChild(prevButton);
  const nextButton = document.createElement("button");
  nextButton.innerHTML = "Next";
  nextButton.style.color = "#fff";
  nextButton.classList.add("btn", "next");
  pagination.appendChild(nextButton);

  prevButton.addEventListener("click", () => {
    currentPage--;
    if (currentPage < 1) {
      currentPage = 1;
    }
    getMovies(API_URL + "&page=" + currentPage);
    window.scrollTo({top:0, behavior:'smooth'});
  });

  nextButton.addEventListener("click", () => {
    currentPage++;
    if (currentPage > 500) {
      currentPage = 500;
    }
    getMovies(API_URL + "&page=" + currentPage);
    window.scrollTo({top:0, behavior:'smooth'});
  });
  const movieInfo = document.querySelectorAll(".movie-info");
  const movieImage = document.querySelectorAll(".movie img");
  const overview = document.querySelectorAll(".overview");
  const closeIcons = document.querySelectorAll(".overview i");
  // Displaying Overview 
  movieImage.forEach((movie, idx) => {
    movie.addEventListener("click", () => {
      closeAllOverViews();
      overview[idx].classList.add("show");
    });
  });

  movieInfo.forEach((movie, idx) => {
    movie.addEventListener("click", () => {
      closeAllOverViews();
      overview[idx].classList.add("show");
    });
  });

  // Closing Overview 
  closeIcons.forEach((icon, idx) => {
    icon.addEventListener("click", () => {
      overview[idx].classList.remove("show");
    });
  });

  function closeAllOverViews() {
    overview.forEach((ov) => {
      ov.classList.remove("show");
    });
  }

  closeAllOverViews();
}
