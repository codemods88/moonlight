import type { BillingProvider } from "@moonlight/adapter-kit";
import { StripeBillingProvider, stripeBillingConfigFromEnv } from "@moonlight/adapters";
import type { AppEnv } from "../../env.js";

export function adminBillingProvider(env: AppEnv): BillingProvider | undefined {
  const config = stripeBillingConfigFromEnv(env);
  return config ? new StripeBillingProvider(config) : undefined;
}
