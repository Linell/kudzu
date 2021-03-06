// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import { Socket } from "phoenix"
import LiveSocket from "phoenix_live_view"
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {params: {_csrf_token: csrfToken}})

// Connect if there are any LiveViews on the page
liveSocket.connect()

// Expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)
// The latency simulator is enabled for the duration of the browser session.
// Call disableLatencySim() to disable:
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket

// Deal with dates on the client side, based on tomekowal's code here:
// https://elixirforum.com/t/displaying-utc-datetime-in-users-browser-timezone/28361/4
let convert_dates = function() {
  $(".utc_to_local").text(function(index, utc_date) {
    return moment.utc(utc_date).local().format('LLLL');
  });
};

// for live views
$(document).on("phx:update", convert_dates);
// for regular views
$(document).ready(convert_dates);
