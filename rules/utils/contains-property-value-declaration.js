function containsPropertyValueDeclaration(declarationsObj, property, value, selector) {
  if (!declarationsObj) {
    return false;
  }
  const declaration = declarationsObj[property];
  if (declaration?.parent?.selector !== selector) {
    return false;
  }
  return (declaration.value === value);
}

module.exports = {
  containsPropertyValueDeclaration,
};
