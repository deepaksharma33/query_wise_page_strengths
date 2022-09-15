import { getKeywordWeights, sortPagesInDescendingStrength } from '../helpers/helpers.js';

import { MAX_PAGE_STRENGTHS_TO_BE_DISPLAYED } from '../constants/constants.js';

class Query {
  constructor(queryNo, keywords) {
    this.queryNo = queryNo;
    this.keywordWeights = getKeywordWeights(keywords);
  }
  
  sortPagesAsPerStrength(pages) {
    let maxSortedPages = [];

    const positiveStrengthPages = pages.filter(p => p.strengthAsPerQuery(this));
    
    if(positiveStrengthPages.length) {
      maxSortedPages =
        sortPagesInDescendingStrength(positiveStrengthPages, this).splice(0, MAX_PAGE_STRENGTHS_TO_BE_DISPLAYED);
    }
    
    return maxSortedPages;
  }
}

export default Query;
