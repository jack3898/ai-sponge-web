import { publicProcedure, router } from '../../trpc';
import { ConversationHandler } from '../services';

export const conversationRouter = router({
	getLine: publicProcedure.mutation(async () => {
		const conversationHandler = new ConversationHandler();

		return conversationHandler.getNextLine();
	})
});
