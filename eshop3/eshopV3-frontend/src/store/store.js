import { createStore } from "redux";
import reducer from "./storeCombiner";

const store = createStore(reducer);
export default store;
