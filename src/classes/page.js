import { getKeywordWeights, calculatePageStrength } from '../helpers/helpers.js';

class Page {
  constructor(pageNo, keywords) {
    this.pageNo = pageNo;
    this.keywordWeights = getKeywordWeights(keywords);
  }
  
  strengthAsPerQuery(query) {
    const { keywordWeights: queryKW } = query;
    const { keywordWeights: pageKW } = this;
    
    const strength = calculatePageStrength(pageKW, queryKW);
    
    return strength;
  }
}

export default Page;
