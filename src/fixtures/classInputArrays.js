import { classifyInputs } from "../helpers/helpers";
import { queryMissingInput, pageMissingInput, valid as validInput } from "./inputs";

const validInputClasses = classifyInputs(validInput);

const pageMissingInputClasses = classifyInputs(pageMissingInput);

const queryMissingInputClasses = classifyInputs(queryMissingInput);

export {
  validInputClasses,
  pageMissingInputClasses,
  queryMissingInputClasses,
};
