export function classNames(classSet) {
  return Object.keys(classSet)
    .filter((key) => classSet[key]).join(' ');
}
