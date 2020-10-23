import initModel from "./Model";
import view from "./View";
import update from "./Update";
import app from "./App";

const node = document.getElementById('app');

app(initModel, view, update, node);