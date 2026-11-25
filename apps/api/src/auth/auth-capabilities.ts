import type { TransactionalEmailProvider } from "@moonlight/adapter-kit";
import type { Auth } from "@moonlight/auth";
import { publicSignInProviders } from "@moonlight/auth";
import type { AuthCapabilities } from "@moonlight/contracts";
import type { Hono } from "hono";
import type { BillingService } from "../billing/billing.js";
import type { AppEnv } from "../env.js";
import { nativePasskeys } from "../http/app-association.js";

/** `GET /api/auth/capabilities`: the sign-in options this deployment offers. */
export function mountAuthCapabilities(
  app: Hono,
  {
    env,
    auth,
    email,
    billing,
  }: {
    env: AppEnv;
    auth: Auth;
    email: TransactionalEmailProvider | undefined;
    billing: BillingService | undefined;
  },
) {
  app.get("/api/auth/capabilities", (c) => {
    const registrationOpen = env.desktopStackToken
      ? auth.registrationOpen(c.req.raw.headers)
      : undefined;
    return c.json({
      sso: env.oidc
        ? { name: env.oidc.name, availability: auth.ssoAvailability() ?? "checking" }
        : null,
      providers: publicSignInProviders(env.social, env.oidc),
      passwordAuth: env.passwordAuth !== false,
      passwordReset: env.passwordAuth !== false && Boolean(email),
      resetUrl:
        env.passwordAuth !== false && email ? new URL("/reset-password", env.webOrigin).href : null,
      emailCode: auth.emailCodeSignIn,
      registrationOpen,
      billing: Boolean(billing),
      passkeyRpId: auth.passkeyRpId,
      nativePasskeys: nativePasskeys(env, auth.passkeyRpId),
      crispWebsiteId: billing ? (env.crispWebsiteId ?? null) : null,
      demoAccount: env.demoAccount ?? null,
    } satisfies AuthCapabilities);
  });
}
