import type { ModelCatalogEntry, ModelCredential } from "@moonlight/contracts";
import type { ConnectedModelChoice } from "@moonlight/core";
import { connectedModelChoices } from "@moonlight/core";
import { localizeModelEntry } from "@moonlight/i18n/model-provider";

export { modelOptionKey, parseModelOptionKey } from "@moonlight/core";

/** The models the connected credentials can run, as one list for a picker. */
export function connectedModelOptions(
  credentials: ModelCredential[],
  catalog: ModelCatalogEntry[],
): ConnectedModelChoice[] {
  return connectedModelChoices(credentials, catalog.map(localizeModelEntry));
}
