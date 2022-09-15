const matching = {
  pageKeywords: ['Ford', 'Car', 'Review'],
  queryKeywords: ['Ford', 'Car']
};

const notMatching = {
  pageKeywords: ['Car', 'Ford'],
  queryKeywords: ['Tesla', 'Review']
};

export {
  matching,
  notMatching
};