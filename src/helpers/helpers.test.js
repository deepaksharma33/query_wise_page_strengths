import Page from '../classes/page.js';
import Query from '../classes/query.js';

import { getKeywordWeights, calculatePageStrength, classifyInputs, displayPageStrengthsAsPerQueries, formatOutput, displayError } from './helpers.js';

import { matching, notMatching } from '../fixtures/keywords.js';
import {
  pageMissingInput,
  queryMissingInput,
  invalidType as invalidTypeInput,
  valid as validInput
} from '../fixtures/inputs.js';

import { MAX_KEYWORD_WEIGHT, QUERY_OR_PAGE_MISSING, TEST, WRONG_INPUT } from '../constants/constants.js';
import { validInputClasses } from '../fixtures/classInputArrays.js';

describe("helpers", () => {
  let processEnvObj = process.env;

  beforeAll(() => {
    process.env = {};
    process.env.NODE_ENV = TEST;
  });

  afterAll(() => {
    process.env = processEnvObj;
  });

  describe('calculatePageStrength fn', () => {
    test('returns positive page strength if matching keywords are foundin page and query', () => {
      const pageKeywordWeights = getKeywordWeights(matching.pageKeywords);
      const queryKeywordWeigths = getKeywordWeights(matching.queryKeywords);

      expect(
        calculatePageStrength(pageKeywordWeights, queryKeywordWeigths)
      ).toBeGreaterThan(0);
    });

    test('returns zero if no keyword match found in page and query', () => {
      const pageKeywordWeights = getKeywordWeights(notMatching.pageKeywords);
      const queryKeywordWeigths = getKeywordWeights(notMatching.queryKeywords);

      expect(
        calculatePageStrength(pageKeywordWeights, queryKeywordWeigths)
      ).toEqual(0);
    });

    test('returns zero if no arguments are passed', () => {
      expect(
        calculatePageStrength()
      ).toEqual(0);
    });
  });

  describe('classifyInputs fn', () => {
    test('returns an object of pages and query class arrays, if valid input array is passed', () => {
      const obj = classifyInputs(validInput);

      expect(obj.pages.length).toBeGreaterThan(0);
      expect(obj.pages[0] instanceof Page).toEqual(true);

      expect(obj.queries.length).toBeGreaterThan(0);
      expect(obj.queries[0] instanceof Query).toEqual(true);
    });

    test('returns empty array of page or query if anyone of them is missing', () => {
      const missingPageObj = classifyInputs(pageMissingInput);

      const missingQueryObj = classifyInputs(queryMissingInput);

      expect(missingPageObj.pages.length).toEqual(0);

      expect(missingQueryObj.queries.length).toEqual(0);
    });

    test('returns an object of empty page and query arrays, if empty input array is passed', () => {
      const obj = classifyInputs([]);

      expect(obj.pages).toEqual([]);
      expect(obj.queries).toEqual([]);
    });

    test('returns an object of empty page and query arrays, if no argument is passed', () => {
      const obj = classifyInputs();

      expect(obj.pages).toEqual([]);
      expect(obj.queries).toEqual([]);
    });

    test('displays input error if invalid type in input is passed', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error');
      classifyInputs(invalidTypeInput);

      expect(consoleErrorSpy).toHaveBeenCalledWith(`ERROR: ${WRONG_INPUT}`);
    });
  });

  describe('displayPageStrengthsAsPerQueries fn', () => {
    test('displays page strengths for queries if valid class inputs are passed', () => {
      const consoleLogSpy = jest.spyOn(console, 'log');
      const { pages, queries } = validInputClasses;

      displayPageStrengthsAsPerQueries(pages, queries);

      let expectedOutputStr = '';

      queries.forEach(q => {
        const sortedPages = q.sortPagesAsPerStrength(pages);
        expectedOutputStr += formatOutput(q, sortedPages);
      });

      expect(consoleLogSpy).toHaveBeenCalledWith(expectedOutputStr);
    });

    test('displays query or page missing error if any one of them is missing from input', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error');
      displayPageStrengthsAsPerQueries();

      expect(consoleErrorSpy).toHaveBeenCalledWith(`ERROR: ${QUERY_OR_PAGE_MISSING}`);
    });
  });

  describe('formatOutput fn', () => {
    const queryObj = new Query(1, matching.queryKeywords);
    const pageObj1 = new Page(1, matching.pageKeywords);
    const pageObj2 = new Page(2, matching.pageKeywords);

    const notMatchingQueryObj = new Query(2, notMatching.queryKeywords);
    const notMatchingPageObj = new Page(3, notMatching.pageKeywords);

    test('displays output in the format - (Qn: P1 P2 P4 ... Pn)', () => {
      const pages = [pageObj1, pageObj2];

      const expectedOutput = 'Q1: P1 P2';
      const output = formatOutput(queryObj, pages);

      expect(output).toEqual(expectedOutput);
    });
  });

  describe('getKeywordWeights fn', () => {
    test('returns object of keywords with descending weights (max weight = MAX_KEYWORD_WEIGHT)', () => {
      const keywordWeights = getKeywordWeights(matching.pageKeywords);
      const keywords = Object.keys(keywordWeights);
      const weights = Object.values(keywordWeights);

      const allKeywordsArePresent = keywords.every(k =>
        matching.pageKeywords.map(key => key.toLowerCase()).includes(k));

      expect(allKeywordsArePresent).toEqual(true);
      expect(weights[0]).toEqual(MAX_KEYWORD_WEIGHT);
      expect(weights[1]).toEqual(MAX_KEYWORD_WEIGHT - 1);
    });

    test('returns empty obj if no keywords are passed', () => {
      expect(getKeywordWeights()).toEqual({});
    });
  });

  describe('displayError', () => {
    test('displays error message passed', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error');
      const message = 'Test error message';
      displayError(message);

      expect(consoleErrorSpy).toHaveBeenCalledWith(`ERROR: ${message}`);
    });
  });
});
