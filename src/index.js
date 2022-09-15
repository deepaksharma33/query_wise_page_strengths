import { classifyInputs, displayPageStrengthsAsPerQueries } from "./helpers/helpers.js";

import { PREDEFINED_INPUT } from './constants/constants.js';

const handler = () => {
  const inputsArr = PREDEFINED_INPUT.split('\n').filter(i => i);
  
  const { pages, queries } = classifyInputs(inputsArr);
  
  displayPageStrengthsAsPerQueries(pages, queries);
};

handler();
