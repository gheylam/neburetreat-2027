import "./style.css";
import { paintScores, setupVotes } from "./vote.js";

paintScores();
setupVotes({
  storageKey: "group-voter-name",
  pool: "group",
  mode: "group",
});
