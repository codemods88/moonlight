import { i18n } from "@lingui/core";
import type { ModelCatalogEntry } from "@moonlight/contracts";

export function localizeModelEntry<
  T extends Pick<ModelCatalogEntry, "provider" | "subscriptionName" | "subscriptionNameId">,
>(entry: T): T {
  return entry.subscriptionName
    ? {
        ...entry,
        subscriptionName: /* lingui-extract-ignore */ i18n._({
          id: entry.subscriptionNameId ?? entry.subscriptionName,
          message: entry.subscriptionName,
        }),
      }
    : entry;
}
