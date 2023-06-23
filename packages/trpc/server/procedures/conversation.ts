import { publicProcedure, router } from '../../trpc.js';
import { ConversationHandler } from '../services/index.js';

export const conversationRouter = router({
	getLine: publicProcedure.mutation(async () => {
		const conversationHandler = new ConversationHandler();

		return conversationHandler.getNextLine();
	})
});
