import "whatwg-fetch";
import TwitchAPI from "./api";
import initListeners from "./dom/listeners";

const twitchClient = new TwitchAPI();
initListeners(twitchClient);
