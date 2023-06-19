/**
 * Promise wrapper over setTimeout.
 */
export function sleep(ms: number): Promise<void> {
	return new Promise<void>((res) => {
		setTimeout(() => {
			res();
		}, ms);
	});
}
