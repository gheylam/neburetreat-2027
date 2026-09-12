import "./style.css";
import { paintLocators } from "./locator.js";
import { paintScores, setupVotes } from "./vote.js";

paintScores();
paintLocators();
setupVotes({
  storageKey: "committee-voter-name",
  mode: "committee",
});
