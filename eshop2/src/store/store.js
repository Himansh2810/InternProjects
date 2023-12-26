import reducer from "./storeCombiner";
import { createStore } from "redux";

export const store = createStore(reducer);
