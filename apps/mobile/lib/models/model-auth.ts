import type { ModelOAuthBegin } from "@moonlight/contracts";
import { waitForModelOAuthCompletion } from "@moonlight/core";
import { rpc } from "../api/api";

export { cancelModelOAuthAttempt, finishModelOAuthAttempt } from "@moonlight/core";

/** Polls with the caller's calls, which go to the Space that began the sign-in. */
export async function waitForModelOAuth(
  { loginId, expiresInSeconds }: Pick<ModelOAuthBegin, "loginId" | "expiresInSeconds">,
  signal?: AbortSignal,
  call = rpc,
) {
  return waitForModelOAuthCompletion(() => call("models/completeOAuth", { loginId }, { signal }), {
    expiresInSeconds,
    signal,
  });
}
