import Page from '../classes/page.js';
import Query from '../classes/query.js';

import {
  MAX_KEYWORD_WEIGHT,
  PAGE,
  QUERY,
  QUERY_OR_PAGE_MISSING,
  TEST,
  WRONG_INPUT
} from '../constants/constants.js';

/**
 * @param {object} pageKeywordWeights Weights of keywords for a page.
 * @param {number} queryKeywordWeigths Weights of keywords for a query.
 * @return {totalStrength} Total strength of a page with respect to a query.
 */
const calculatePageStrength = (pageKeywordWeights = {}, queryKeywordWeigths = {}) => {
  let totalStrength = 0;
  
  for(let keyword in pageKeywordWeights) {
    if(queryKeywordWeigths[keyword]) {
      const strength = pageKeywordWeights[keyword] * queryKeywordWeigths[keyword];

      totalStrength += strength;
    }
  }
  
  return totalStrength;
};

/**
 * @param {array} inputs input array of page/query type and keyword strings.
 * @return {object} Object of arrays of Page and Query class objects.
 */
const classifyInputs = (inputs = []) => {
  const pages = [];
  const queries = [];
  
  let pageNo = 0;
  let queryNo = 0;
  
  inputs.forEach((input) => {
    const [type, ...keywords] = input.split(' ');

    switch(type) {
      case PAGE:
          pages.push(new Page(++pageNo, keywords));
          break;

      case QUERY:
          queries.push(new Query(++queryNo, keywords));
          break;

      default:
        displayError(WRONG_INPUT);
    }
  });
  
  return { pages, queries };
};

/**
 * @param {array} pages array of page objects to be reviewed.
 * @param {array} queries array of query objects with repect to which the page strength has to be calculated.
 * @return {undefined} Displays the page strengths with respect to a Query, or displays an error on the screen if occurred.
 */
const displayPageStrengthsAsPerQueries = (pages, queries) => {
  if((queries && queries.length) && (pages && pages.length)) {
    queries.forEach((query) => {
      const sortedPages = query.sortPagesAsPerStrength(pages);
      
      console.log(formatOutput(query, sortedPages));
    });
  } else {
    displayError(QUERY_OR_PAGE_MISSING);
  }
}

/**
 * @param {object} query the query object with repect to which the page strength has to be calculated.
 * @param {array} pages the array of page objects whose strength has to be calculated.
 * @return {string} a string in format: Qn: P1 P2 ... Pn
 */
const formatOutput = (query, pages) => {
  const queryStr = `${QUERY}${query.queryNo}`;
  const pageStr = pages.map(page => PAGE + page.pageNo).join(' ');
  
  return `${queryStr}: ${pageStr}`;
};


/**
 * @param {array} keywords array of keyword for which the weights has to be calculated.
 * @return {object} object with keywords as keys and weights as values.
 */
const getKeywordWeights = (keywords = []) =>
  keywords.reduce((weights, keyword, index) => {
    weights[
      keyword.toLowerCase()
    ] = MAX_KEYWORD_WEIGHT - index;
      
    return weights;
  }, {});


/**
 * @param {array} pages array of page objects.
 * @param {object} query object with repect to which the strength of the pages has to calculated.
 * @return {aray} sorted page objects array in descending order with respect to page strengths.
 */
const sortPagesInDescendingStrength = (pages, query) =>
  pages.sort((page1, page2) => page2.strengthAsPerQuery(query) - page1.strengthAsPerQuery(query));


/**
 * @param {string} message the error message to be displayed
 * @return {undefined}
 */
const displayError = (message) => {
  console.error(`ERROR: ${message}`);

  if(process.env.NODE_ENV !== TEST) {
    process.exit();
  }
};

export {
  calculatePageStrength,
  classifyInputs,
  displayError,
  displayPageStrengthsAsPerQueries,
  formatOutput,
  getKeywordWeights,
  sortPagesInDescendingStrength
};
