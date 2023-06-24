import env from '@sponge/env/node.js';

export class UberduckHandler {
	static readonly key = Buffer.from(`${env.UBERDUCK_KEY}:${env.UBERDUCK_SECRET}`).toString('base64');

	static readonly url = 'https://api.uberduck.ai';

	private static fetch(options: RequestInit) {
		const headers = new Headers();

		headers.append('Authorization', `Basic ${this.key}`);
		headers.append('content-type', 'audio/wav');

		return fetch(`${this.url.toString()}/speak-synchronous`, {
			method: 'POST',
			headers,
			...options
		});
	}

	voiceSync({ voice, speech }: { voice: string; speech: string }) {
		return UberduckHandler.fetch({
			body: JSON.stringify({
				speech: speech,
				voice: voice.trim().toLowerCase()
			})
		});
	}
}
