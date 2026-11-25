import { errorHelpUrl } from "@moonlight/core";
import { errorText } from "@moonlight/i18n/user-error";

export { errorCode } from "@moonlight/core";
export {
  authErrorText,
  credentialIssueText,
  errorText,
  voiceAccountErrorText,
} from "@moonlight/i18n/user-error";

/** Keep the documented error code's help link when turning a failure into UI copy. */
export function errorDetails(error: unknown, fallback?: string) {
  return { message: errorText(error, fallback), helpUrl: errorHelpUrl(error) };
}

export type ErrorDetails = ReturnType<typeof errorDetails>;
