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
      return this.getRequest(`streams?game_id=${game.data[0].id}`);
    }
    throw new Error(
      "No games were found with your search. Please try a different one.",
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
      .catch(err => console.log(err));
  }
}
