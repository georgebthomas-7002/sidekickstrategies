/**
 * Simple classname utility that filters out falsy values and joins class names.
 * Similar to clsx/classnames but without the dependency.
 */
export function cn(
  ...inputs: (string | undefined | null | false | 0)[]
): string {
  return inputs
    .filter((input): input is string => Boolean(input))
    .join(' ')
    .trim()
}
