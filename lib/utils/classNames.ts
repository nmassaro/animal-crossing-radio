export const classNames = (...classes: (string | boolean)[]) => {
  return classes.filter((className) => !!className).join(' ')
}