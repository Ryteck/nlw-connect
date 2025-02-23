import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { env } from "../env";
import { asccessInviteLink } from "../functions/access-invite-link";

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/invites/:subscriberId",
		{
			schema: {
				summary: "Access invite link and redirects user",
				tags: ["referral"],
				params: z.object({
					subscriberId: z.string().uuid(),
				}),
				response: {
					201: z.object({
						subscriberId: z.string().uuid(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { subscriberId } = request.params;

			await asccessInviteLink({ subscriberId });

			const redirectUrl = new URL(env.WEB_URL);

			redirectUrl.searchParams.set("referrer", subscriberId);

			return reply.redirect(redirectUrl.toString(), 302);
		},
	);
};
