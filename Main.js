let mainInput = document.querySelector("#mainInput");
let resultDiv = document.querySelector("#resultDiv");
let searchIcon = document.querySelector("#searchIcon");
let searchValue = "";

let searchMovies = async () => {
  mainInput.classList.remove("rounded-pill");
  searchIcon.classList.add("hideElement");
  try {
    if (mainInput.value === "") {
      resultDiv.innerHTML = "";
      searchIcon.classList.remove("hideElement");
      mainInput.classList.add("rounded-pill");
    }

    searchValue = mainInput.value;
    if (!searchValue) return (resultDiv.innerHTML = "");

    //Movie ID's API.................
    movieIDParams = {
      method: "GET",
      params: {
        query: searchValue,
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmZkZTRkNWNmMzFlYjI2OTNmZTg2MDQ1OTZjNTgzYSIsInN1YiI6IjY0Y2U2MTAxNTQ5ZGRhMDBmZmEzYWE4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VGY5tbEn74RlPTLhWzcQDGdHCXKtdB_xGxQ3db1hgzQ",
      },
    };

    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1",
      movieIDParams
    );
    makeMovieTitles(response.data.results);
  } catch (err) {
    console.log("getting unknown error", err);
  }
};

//Function debounce.................
let debounce = function (callBack, delay) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callBack();
    }, delay);
  };
};

let delaySearchMovies = debounce(searchMovies, 400);
mainInput.addEventListener("input", delaySearchMovies);

const makeMovieTitles = (allMovies) => {
     if(allMovies.length === 0) {
        resultDiv.classList.remove("hideElement");
        resultDiv.innerHTML = `<a class="newParaCSS">No Movies Found</a>`;
        return;
      }

  let newHtml = "";
  
  for (let movies of allMovies) {
    if (movies.poster_path !== null) { 
      let movieName = movies.title;
      let movieId = movies.id;
      let htmlTemplate = `<a href="./movieDetails.html?movie_id=${movieId}" class="newParaCSS" target="_next"> ${movieName} </a>`;
      newHtml += htmlTemplate;
    }
  }

  resultDiv.classList.remove("hideElement");
  resultDiv.innerHTML = newHtml;
};

const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const loginContainer = document.querySelector("#loginContainer");
const signupContainer = document.querySelector("#signupContainer");
const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");
const loginClosingButton = document.querySelector("#closingButton");
const signupClosingButton = document.querySelector("#signupClosingButton");

function loginModal() {
  loginContainer.classList.remove("hideElement");
  loginContainer.classList.add("loginContainer");
  loginForm.classList.add("loginFormCSS");
}

login.addEventListener("click", loginModal);

function closeLoginForm() {
  loginContainer.classList.add("hideElement");
  loginContainer.classList.remove("loginContainer");
  loginForm.classList.remove("loginFormCSS");
}

loginClosingButton.addEventListener("click", closeLoginForm);

function signupModal() {
  signupContainer.classList.remove("hideElement");
  signupContainer.classList.add("signupContainer");
  signupForm.classList.add("signupFormCSS");
}

signup.addEventListener("click", signupModal);

function closeSignupForm() {
  signupContainer.classList.add("hideElement");
  signupContainer.classList.remove("signupContainer");
  signupForm.classList.remove("signupFormCSS");
}

signupClosingButton.addEventListener("click", closeSignupForm);

//Trending Movies API............
let loader = document.querySelector("#loader");
let trendingMovieDetails = document.querySelector("#trendingMovieDetails");
let top3Movies = document.querySelector("#carousel-top-3");
let movieIDParams = {};
async function makeTrendingMoviesDetails() {
  params = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmZkZTRkNWNmMzFlYjI2OTNmZTg2MDQ1OTZjNTgzYSIsInN1YiI6IjY0Y2U2MTAxNTQ5ZGRhMDBmZmEzYWE4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VGY5tbEn74RlPTLhWzcQDGdHCXKtdB_xGxQ3db1hgzQ",
    },
  };

  //Trending Movie API.................
  const trendingMovieData = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    params
  );
  makeTrendingMovies(trendingMovieData.data.results);
}

const makeTrendingMovies = (trendingDetails) => {
  let newSkeleton = "";
  let top3Skeleton = "";
  let top3Trending = trendingDetails.slice(0, 3);
  top3Trending.forEach((top) => {
    let topTrending = `<div class="col item d-flex justify-content-center">
      <a href="./movieDetails.html?movie_id=${top.id}">
      <img src="https://image.tmdb.org/t/p/original${
        top.backdrop_path
      }" class="topTrendingImages border-rounded">
      <div class="text-white imgText">
      <p class= "d-none d-md-block mb-0 mt-2" id="imgTextHeading">${
        top.title
      }</p> 
      <p class="my-1 my-lg-3 d-none d-md-block imgTextOver">${top.overview}</p>
      <p class="mt-2 d-none d-md-block imgTextOver">IMDb: ${top.vote_average.toFixed(
        1
      )}/10</p>  
      </div> 
      </a>
      </div>`;
    top3Skeleton += topTrending;
  });
  top3Movies.innerHTML = top3Skeleton;

 top3Owl()

  let restTrendingMovies = trendingDetails.slice(3);
  restTrendingMovies.forEach((similar) => {
    let myTrendingMovies = `
        <div class="trending_card_container text-center col-6 col-md-4 col-xl-3 p-0" style="border-radius:15px;">
    <div style="width: 90%;" class="ms-4">
    <a class="trending_cards" href="./movieDetails.html?movie_id=${similar.id}">
    <img src="https://image.tmdb.org/t/p/original${
      similar.poster_path
    }" class="trendingMovieImages mt-3 mb-0">
    <div id="trendingMetric" class="text-center text-white bottomRadius pt-3 pb-1" style="background-color: #451c1c;">
    <p class="mb-0"><i class="fa-solid fa-star" style="color: #fde33a;"></i> ${Math.round(
      (similar.vote_average * 100) / 10
    )}%</p>
    <p><i class="fa-regular fa-calendar-check" style="color: #55d930;"></i>  ${
      similar.release_date
    }</p>
    </div>
  </a>
    </div>
        </div>`;
    newSkeleton += myTrendingMovies;
  });
  trendingMovieDetails.innerHTML = newSkeleton;
  loader.classList.add("hideElement");
};

makeTrendingMoviesDetails();
