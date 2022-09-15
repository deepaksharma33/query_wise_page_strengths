const PAGE = 'P';
const QUERY = 'Q';

const MAX_KEYWORD_LIMIT = 'MAX_KEYWORD_LIMIT';

const DEFAULT_KEYWORD_LIMIT = 100;
const MAX_PAGE_STRENGTHS_TO_BE_DISPLAYED = 5;

const MAX_KEYWORD_WEIGHT = DEFAULT_KEYWORD_LIMIT;

const PREDEFINED_INPUT = `
P Ford Car Review
P Review Car
P Review Ford
P Toyota Car
P Honda Car
P Car
Q Ford
Q Car
Q Review
Q Ford Review
Q Ford Car
Q cooking French`;

const TEST = 'test';

const WRONG_INPUT = "You've entered a wrong input type.";
const QUERY_OR_PAGE_MISSING = 'Page or Query is missing in input.';

export {
  MAX_KEYWORD_LIMIT,
  MAX_KEYWORD_WEIGHT,
  MAX_PAGE_STRENGTHS_TO_BE_DISPLAYED,
  PAGE,
  PREDEFINED_INPUT,
  QUERY,
  QUERY_OR_PAGE_MISSING,
  TEST,
  WRONG_INPUT
};
