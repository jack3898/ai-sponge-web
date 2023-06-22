/**
 * Sanitise interpolated class strings for react components.
 *
 * NOTE: Dynamic values will be moved to the end of the string and will override the hard-coded values!
 *
 * @example classList`  border rounded  mb-4      bg-green    ${variable} ` // input
 * @example "border rounded mb-4 bg-green variableValue" // output
 */
export function classList(lists: TemplateStringsArray, ...values: (string | undefined)[]): string {
	const hardCodedValues = lists.join(' ').replace(/\s+/g, ' ');
	const dynamicValues = values.filter(Boolean).join(' ');

	return `${hardCodedValues} ${dynamicValues}`.trim();
}
