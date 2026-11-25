import type { ModelOAuthBegin } from "@moonlight/contracts";
import { waitForModelOAuthCompletion } from "@moonlight/core";
import type { RpcClient } from "../query/rpc";
import { rpc } from "../query/rpc";

export type { ModelCatalogEntry, ModelCredential, ModelOAuthBegin } from "@moonlight/contracts";
export { cancelModelOAuthAttempt, finishModelOAuthAttempt } from "@moonlight/core";

/** `client` must be the one that began the sign-in: the login belongs to its space. */
export async function waitForModelOAuth(
  { loginId, expiresInSeconds }: Pick<ModelOAuthBegin, "loginId" | "expiresInSeconds">,
  signal?: AbortSignal,
  client: RpcClient = rpc,
) {
  return waitForModelOAuthCompletion(() => client.models.completeOAuth({ loginId }, { signal }), {
    expiresInSeconds,
    signal,
  });
}
