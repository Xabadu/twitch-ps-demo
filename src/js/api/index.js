export default class TwitchAPI {
  constructor() {
    this.baseUrl = "https://api.twitch.tv/helix/";
    this.clientId = "kpjpcqhtewgqbd5sdoc0oux4zi6n2o";
    this.getStreams = this.getStreams.bind(this);
  }

  findGame(name) {
    return this.getRequest(`games?name=${encodeURIComponent(name)}`);
  }

  getStreams(game) {
    if (game.data.length > 0) {
      localStorage.setItem("gameId", game.data[0].id);
      localStorage.setItem("gameName", game.data[0].name);
      return this.getRequest(`streams?game_id=${game.data[0].id}`);
    }
    throw new Error(
      "No streams found for that game. Please try a different one.",
    );
  }

  getRequest(endpoint) {
    return fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Client-ID": this.clientId,
      },
    })
      .then(res => res.json())
      .catch(err => {
        throw new Error(err);
      });
  }

  prefetchPreviousPage(cursor) {
    const gameId = localStorage.getItem("gameId");
    if (!gameId || !cursor) {
      return false;
    }
    return this.getRequest(`streams?game_id=${gameId}&before=${cursor}`);
  }

  prefetchNextPage(cursor) {
    const gameId = localStorage.getItem("gameId");
    if (!gameId || !cursor) {
      return false;
    }
    return this.getRequest(`streams?game_id=${gameId}&after=${cursor}`);
  }
}
