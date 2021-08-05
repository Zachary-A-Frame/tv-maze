/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  let res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)

  const id = res.data[0].show.id
  const name = res.data[0].show.name
  const summary = res.data[0].show.summary
  const image = res.data[0].show.image.medium

  return [
    {
      id,
      name,
      summary,
      image
    }
  ]
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();
  $("#search-query").val("")

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src="${show.image}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  // $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
  populateEpisodes(shows[0].id)
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {

  const url = `https://api.tvmaze.com/shows/${id}/episodes`
  const res = await axios.get(url)
    return [
      res.data
    ]
}

async function populateEpisodes(id) {
  const $episodesList = $("#episodes-list");
  // $episodesList.empty()

  const episodes = await getEpisodes(id)
  console.log(episodes)

  for (let episode of episodes) {
    for (let show of episode) {
      let $item = $(
        `<p>Episode ${show.number} Season ${show.season}: ${show.name}</p>
      `);

      $episodesList.append($item);
    }
  }
}
