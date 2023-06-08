$(document).ready(function() {
  //ccc
  const searchInput = $('#searchInput');
  const searchButton = $('#searchButton');
  const resultsDiv = $('#results');

  const API_ENDPOINT_URL = 'https://imdb-api.com/en/API/SearchMovie/';
  const API_KEY = 'k_aaaaaaaa';

  searchButton.click(getMovies);

  async function getMovies() {
    console.log('getMovies called')
    const searchTerm = searchInput.val().trim();
    if (searchTerm !== '') {
      try {
        // const response = await fetch(`${API_ENDPOINT_URL}${API_KEY}/${searchTerm}`);

        const url = `https://imdb_api4.p.rapidapi.com/get_movies_by_name?Movie_name=${searchTerm}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '8e6b52bd9fmsh674f96edc1feb97p1117c5jsn7d6ea4c48259',
            'X-RapidAPI-Host': 'imdb_api4.p.rapidapi.com'
          }
        };

        
        const response = await fetch(url, options);
        const data = await response.text();
        console.log(data);

        // const data = await response.json();
        // console.log(data)

        if (data && data.length > 0) {
          displayResults(JSON.parse(data));
        } else {
          resultsDiv.html('No results found.');
        }
      } catch (error) {
        console.log('An error occurred:', error);
        resultsDiv.html('An error occurred. Please try again later.');
      }
    }


  }

  
  function displayResults(results) {
    resultsDiv.empty();
    
    // for (let i = 0; i < results.length(); i++) {
    //   console.log(results[i])
    // }
    
    results.forEach(result => {
      const { id, title, image, cast, year, rating } = result;

      const resultElement = $('<div>').addClass('col-md-4 col-lg-3 mb-4');
      const cardElement = $('<div>').addClass('card h-100');
      // const imgElement = $('<img>').addClass('card-img-top').attr('src', image).attr('alt', title);
      const cardBodyElement = $('<div>').addClass('card-body');
      const titleElement = $('<h5>').addClass('card-title').text(title);
      const yearElement = $('<p>').addClass('card-text').text(`Year: ${year}`);
      const descriptionElement = $('<p>').addClass('card-text').text(cast);
      const ratingElement = $('<h3>').addClass('card-text').text(rating);

      cardBodyElement.append(titleElement, yearElement, descriptionElement, ratingElement);
      cardElement.append(cardBodyElement);
      resultElement.append(cardElement);
      resultsDiv.append(resultElement);
    });
  }
});
