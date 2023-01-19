function getDeclarationDisplayText(decl) {
  // https://postcss.org/api/
  // Declaration#toString()
  return decl.toString();
}

module.exports = {
  getDeclarationDisplayText,
};
