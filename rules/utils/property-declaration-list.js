class PropertyDeclarationList {
  declarations = {};

  addDeclaration(declaration) {
    this.declarations[declaration.property] = { ...declaration };
  }

  findPropertyValueDeclaration({ property, value, selector }) {
    const declaration = this.declarations[property];
    if (declaration?.selector !== selector) {
      return null;
    }
    if (declaration?.value === value) {
      return declaration;
    }
    return null;
  }
}

module.exports = {
  PropertyDeclarationList,
};
