import { PAGE, QUERY } from '../constants/constants.js';
import { matching, notMatching } from './keywords.js';

const valid = [
  [PAGE, ...matching.pageKeywords].join(' '),
  [QUERY, ...matching.queryKeywords].join(' '),
];

const queryMissingInput = [
  [PAGE, ...matching.pageKeywords].join(' '),
  [PAGE, ...notMatching.pageKeywords].join(' ')
];

const pageMissingInput = [
  [QUERY, ...matching.queryKeywords].join(' '),
  [QUERY, ...notMatching.queryKeywords].join(' ')
];

const invalidType = [
  [PAGE, ...matching.pageKeywords].join(' '),
  [QUERY, ...matching.queryKeywords].join(' '),
  ['I', []].join(' ')
];

export { valid, pageMissingInput, queryMissingInput, invalidType };
