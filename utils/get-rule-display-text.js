function getRuleDisplayText(rule) {
  // https://postcss.org/api/
  // Rule#type
  // Possible values are root, atrule, rule, decl, or comment.
  if (rule?.parent?.type === 'root') {
    return rule.selector;
  }
  /* istanbul ignore next */
  if (rule?.parent?.type === 'atrule') {
    return `@${rule.parent?.name} ${rule.parent?.params}`;
  }
  /* istanbul ignore next */
  return 'unknown';
}

module.exports = {
  getRuleDisplayText,
};
