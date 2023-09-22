// function for Login and Signup Button........................

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

let searchIcon = document.querySelector("#searchIcon");
// function for mainInput Event.........
let mainInput = document.querySelector("#mainInput");
let resultDiv = document.querySelector("#resultDiv");

//Trending MovieDetails function...................
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

//Main input Function...............
let searchMovies = async () => {
  mainInput.classList.remove("rounded-pill");
  searchIcon.classList.add("hideElement");

  try {
    if (mainInput.value === "") {
      resultDiv.innerHTML = "";
      searchIcon.classList.remove("hideElement");
      mainInput.classList.add("rounded-pill");
    }

    let searchValue = mainInput.value;
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

// Function for making MovieTitles and result Div..........
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

let movieDetailsParams = {};
let similarMovieParams = {};
let creditParams = {};

let allCastData = [];
let allCrewData = [];

let similarMoviesData = [];

// collecting the Movie ID from redirected link.........
let params = new URL(document.location).searchParams;
let movieId = params.get("movie_id");

// function for Making Movies Data........................
let loader = document.querySelector("#loader");
makeMoviesData();
async function makeMoviesData() {
  // moviesID details API.................
  movieDetailsParams = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmZkZTRkNWNmMzFlYjI2OTNmZTg2MDQ1OTZjNTgzYSIsInN1YiI6IjY0Y2U2MTAxNTQ5ZGRhMDBmZmEzYWE4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VGY5tbEn74RlPTLhWzcQDGdHCXKtdB_xGxQ3db1hgzQ",
    },
  };

  const myMovieData = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    movieDetailsParams
  );
  makeMovieDetails(myMovieData.data);

  // Cast and Crew API.................
  creditParams = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmZkZTRkNWNmMzFlYjI2OTNmZTg2MDQ1OTZjNTgzYSIsInN1YiI6IjY0Y2U2MTAxNTQ5ZGRhMDBmZmEzYWE4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VGY5tbEn74RlPTLhWzcQDGdHCXKtdB_xGxQ3db1hgzQ",
    },
  };

  const myCreditsData = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    creditParams
  );

  allCastData = myCreditsData.data.cast;
  makeCastDetails();

  allCrewData = myCreditsData.data.crew;
  makeCrewDetails();

  //recommended movies API.................
  similarMovieParams = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmZkZTRkNWNmMzFlYjI2OTNmZTg2MDQ1OTZjNTgzYSIsInN1YiI6IjY0Y2U2MTAxNTQ5ZGRhMDBmZmEzYWE4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VGY5tbEn74RlPTLhWzcQDGdHCXKtdB_xGxQ3db1hgzQ",
    },
  };

  const similarMovieData = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
    similarMovieParams
  );
  loader.classList.add("hideElement");
  if (similarMovieData.data.total_results !== 0) {
    similarMoviesData = similarMovieData.data.results;
    makeSimilarMovies();
  } else {
    makeTrendingMoviesDetails()
  }
}

let movieDetails = document.querySelector("#movieDetails");
let movieData = document.querySelector("#movieData");

let genre = "";
let productionCountries = "";
let spokenLanguages = "";

// function for Making Movies Details........................
let makeMovieDetails = (details) => {
  let myGenre = details.genres;
  myGenre.forEach((g) => {
    genre += `${g.name} `;
  });

  let myProductionCountries = details.production_countries;
  myProductionCountries.forEach((country) => {
    productionCountries += `${country.name}, `;
  });

  let myLanguage = details.spoken_languages;
  myLanguage.forEach((language) => {
    spokenLanguages += `${language.english_name}, `;
  });

  if (details.status === "Released") {
    let budget = details.budget;
    let revenue = details.revenue;
    let homepage = details.homepage;

    let movieDuration = () => {
      if (details.runtime < 60) {
        return `${details.runtime}min`;
      } else if (
        details.runtime > 60 &&
        !Number.isInteger(details.runtime / 60)
      ) {
        let stringNumber = String(details.runtime / 60);
        let completeNumber = stringNumber.slice(0, 1);
        let decimalNumber = Math.round((stringNumber.slice(2, 4) / 100) * 60);
        if(stringNumber.length===3){
          return `${completeNumber}h ${decimalNumber*10}m`;
        }
        return `${completeNumber}h ${decimalNumber}m`;

      } else if (
        details.runtime > 60 &&
        Number.isInteger(details.runtime / 60)
      ) {
        return `${details.runtime / 60}h`;
      }
    };

    let myMovieDetails = `
        <div class="row d-flex justify-content-center">
        <div class="col-10 col-md-12 text-white">
        <div id="mainImageContainer" class="mb-3 mb-md-1"><img src="https://image.tmdb.org/t/p/original${
          details.poster_path
        }" class="movieImage img ms-2"></img>
        </div>
        <div>
          <h4 class="mb-3 headingCSS text-info fw-bold"><i class="fa-solid fa-clapperboard" style="color: #419bd2;"></i> ${
            details.title
          }</h4>
          <p><i class="fa-regular fa-clock fa-xl" style="color: #e5de1f;"></i> :- ${movieDuration()}</p>
          <p><i class="fa-regular fa-calendar-check fa-xl" style="color: #37eb43;"></i> :- ${
            details.release_date
          }</p> 
          <p><i class="fa-solid fa-wallet fa-xl" style="color: #ee822b;"></i> :- ${
            budget !== 0 ? `US $ ${budget}` : "N/A"
          } </p> 
          <p><i class="fa-solid fa-coins fa-xl" style="color: #e6df1e;"></i>  :- ${
            revenue !== 0 ? `US $ ${revenue}` : "N/A"
          }</p> 
          <p><b> 
          Genre</b>:- ${
            genre.length !== 0 ? genre : "N/A"}
           </p> 
          <p><i class="fa-solid fa-globe fa-xl" style="color: #4584f2;"></i> :- ${
            productionCountries.length !== 0 ? productionCountries : "N/A"}
           </p>
          <p><i class="fa-solid fa-language fa-xl" style="color: #3ce2c1;"></i> :- ${
            spokenLanguages.length !== 0 ? spokenLanguages : "N/A"}
           </p>
          <p><span style="
          background-color: yellow;
          color: black;
          font-size: 20px;
      "><i class="fa-brands fa-imdb fa-2xl"></i></span> :-
          ${details.vote_average.toFixed(1)}/10
          </p>
          <p id="movieOverview"><b> About the movie
          </b>:- ${details.overview}</p>
          ${
            homepage !== ""
              ? `<p><a href ="${homepage}" target =_nextPage class="text-decoration-none btn btn-primary px-2 py-1"> Watch </a></p>`
              : `<p>HomePage: N/A</p>`
          }
          </div>
        </div>
        </div>
        `;
    movieDetails.innerHTML = myMovieDetails;
    movieData.append(movieDetails);
  } else {
    alert("Only Released Movie Will be Displayed");
    similarMovieHeading.style.display = "none";
  }
};

let castData = document.querySelector("#castData");
let castDetails = document.querySelector("#castDetails");
let castHeading = document.querySelector("#castHeading");
let allCast = []

// Function for Movie Cast............................
const makeCastDetails = () => {
  castHeading.innerText = "Cast";

  allCast = allCastData
    .filter((myCast) => myCast.known_for_department === 'Acting' && myCast.profile_path !== null)
    .slice(0, 12);

  let castSkeleton = "";

  allCast.forEach((cast) => {
    let myCastDetails = `<div class="item text-center text-white cast_card_container" id="castOwlData"
">
       <img src="https://image.tmdb.org/t/p/original${cast.profile_path}" class="creditImage mt-3 mb-0">
      <p class="mb-0 mt-2">${cast.original_name}</p>
      <p class="text-secondary mb-0">${cast.character !== "" ? `as ${cast.character}` : "N/A" }</p>
      </div>`;
    castSkeleton += myCastDetails;

  });

  castDetails.innerHTML = castSkeleton;
  castData.append(castHeading, castDetails);

  castOwl()
};

let crewData = document.querySelector("#crewData");
let crewDetails = document.querySelector("#crewDetails");
let crewHeading = document.querySelector("#crewHeading");
let allCrew = []

// Function for Movie Crew............................
  const makeCrewDetails = () => {
  
    console.log(allCrewData)
    allCrew = allCrewData
      .filter((myCrew) => myCrew.profile_path !== null && (myCrew.job === "Original Music Composer" || myCrew.job === 'Director' || myCrew.job === 'Writer' || myCrew.job === 'Producer')) ;
  
    if(allCrew.length !== 0){
      crewHeading.innerText = "Crew"; 
    }else{
      crewHeading.innerText = ""
    }

    let crewSkeleton = "";
    allCrew.forEach((crew, index) => {  
    
        let myCrewDetails = `<div class="item text-center text-white crew_card_container" id="crewOwlData"> 
      <img src="https://image.tmdb.org/t/p/original${crew.profile_path}"
        class="creditImage mt-3 mb-0"></img>
       <p class="mb-0 mt-2">${crew.original_name}</p>
      <p class="text-secondary mb-0"> ${crew.job} </p>
       </div>`;
     crewSkeleton += myCrewDetails;
      
    })
    
    crewDetails.innerHTML = crewSkeleton;
    crewData.append(crewHeading, crewDetails);
  
    crewOwl()
  };

let similarMoviesContainer = document.querySelector("#similarMoviesContainer");
let similarMovieDetails = document.querySelector("#similarMovieDetails");
let similarMovieHeading = document.querySelector("#similarMovieHeading");
let similarMovies = [];

//Function for Trending Movie Details.......................
const makeTrendingMovies = (trendingDetails) => {
  similarMovieHeading.innerText = "Trending Movies:-";

  let trendingSkeleton = "";
  let Trending = trendingDetails.slice(0, 10);
  Trending.forEach((top) => {
    let myTrending =  `
          <div class="text-center item similar_card_container" style="border-radius:15px">
          <div style="width: 90%;">
            <a href="/movieDetails.html?movie_id=${
              top.id
            }" class="similar_cards">
              <img src="https://image.tmdb.org/t/p/original${
                top.poster_path
              }" class="similarMovieImage mt-3 mb-0">
              <div class="text-white pt-3 pb-1 px-2 bottomRadius" style="background-color: #451c1c;">
                <p class="mb-0"><i class="fa-solid fa-star" style="color: #fde33a;"></i>
                ${Math.round((top.vote_average * 100) / 10)}%</p>
                <p class="mb-1"><i class="fa-regular fa-calendar-check" style="color: #55d930;"></i> ${
                  top.release_date
                }</p>
              </div>
            </a>
            </div>
          </div>
          `;
          trendingSkeleton += myTrending;
  });
  similarMovieDetails.innerHTML = trendingSkeleton;
  similarMoviesContainer.append(similarMovieHeading, similarMovieDetails)
  similarMoviesOwl()
}

// function for Making Similar Movies Details........................
const makeSimilarMovies = () => {
  similarMovieHeading.innerText = "Recommended Movies:-";

  similarMovies = similarMoviesData
    .filter((movie) => movie.poster_path !== null && movie.popularity >= 2)
    .slice(0, 10);

  let newSkeleton = "";
  similarMovies.forEach((similar) => {
    let mySimilarMovies = `
          <div class="text-center item similar_card_container" style="border-radius:15px">
          <div style="width: 90%;">
            <a href="/movieDetails.html?movie_id=${
              similar.id
            }" class="similar_cards">
              <img src="https://image.tmdb.org/t/p/original${
                similar.poster_path
              }" class="similarMovieImage mt-3 mb-0">
              <div class="text-white pt-3 pb-1 px-2 bottomRadius" style="background-color: #451c1c;">
                <p class="mb-0"><i class="fa-solid fa-star" style="color: #fde33a;"></i>
                ${Math.round((similar.vote_average * 100) / 10)}%</p>
                <p class="mb-1"><i class="fa-regular fa-calendar-check" style="color: #55d930;"></i> ${
                  similar.release_date
                }</p>
              </div>
            </a>
            </div>
          </div>
          `;
    newSkeleton += mySimilarMovies;
  });

  similarMovieDetails.innerHTML = newSkeleton;
  similarMoviesContainer.append(similarMovieHeading, similarMovieDetails);

  similarMoviesOwl()
};
