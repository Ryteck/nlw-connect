import { redis } from "../redis/client";

interface GetSubscriberRankingPositionParams {
	subscriberId: string;
}

export async function getSubscriberRankingPosition({
	subscriberId,
}: GetSubscriberRankingPositionParams) {
	const rank = await redis.zrevrank("referral:ranking", subscriberId);

	return {
		position: rank === null ? null : rank + 1,
	};
}
