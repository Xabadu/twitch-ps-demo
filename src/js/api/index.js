export default class TwitchAPI {
  constructor() {
    this.baseUrl = "https://api.twitch.tv/helix/";
    this.clientId = "kpjpcqhtewgqbd5sdoc0oux4zi6n2o";
    this.getStreams = this.getStreams.bind(this);
  }

  findGame(name) {
    return this.getRequest(`games?name=${name}`);
  }

  getStreams(game) {
    return this.getRequest(`streams?game_id=${game.data[0].id}`);
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
