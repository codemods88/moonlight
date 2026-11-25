import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { UI_LOCALES } from "../i18n/ui-locale";

const resources = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "modules/moonlight-notifications/android/src/main/res",
);
const keys = [
  "moonlight_channel_live",
  "moonlight_channel_messages",
  "moonlight_channel_scheduled",
  "moonlight_channel_attention",
  "moonlight_live_one",
  "moonlight_live_many",
  "moonlight_live_working",
  "moonlight_scheduled_title",
  "moonlight_replied_group",
  "moonlight_replied",
  "moonlight_attention_failed",
  "moonlight_attention_takeover",
  "moonlight_attention_input",
];

const resourceDirectories = {
  en: "values",
  "zh-CN": "values-zh-rCN",
  "zh-TW": "values-zh-rTW",
  ru: "values-ru",
  de: "values-de",
  nl: "values-nl",
  ja: "values-ja",
  es: "values-es",
  pl: "values-pl",
  fr: "values-fr",
  he: "values-iw",
  hi: "values-hi",
  ko: "values-ko",
  "pt-BR": "values-pt-rBR",
  th: "values-th",
  tr: "values-tr",
} as const satisfies Record<(typeof UI_LOCALES)[number], string>;

function strings(locale: (typeof UI_LOCALES)[number]) {
  return readFileSync(resolve(resources, resourceDirectories[locale], "strings.xml"), "utf8");
}

describe("Android notification resources", () => {
  it("provides every notification string in each shipped mobile locale", () => {
    for (const locale of UI_LOCALES) {
      const xml = strings(locale);
      for (const key of keys) expect(xml).toContain(`name="${key}"`);
    }
  });

  it("preserves every Polish notification format argument", () => {
    const entries = (xml: string) =>
      new Map(
        [...xml.matchAll(/<string name="([^"]+)">([^<]*)<\/string>/g)].map((match) => [
          match[1],
          match[2],
        ]),
      );
    const source = entries(strings("en"));
    const polish = entries(strings("pl"));
    for (const key of keys) {
      const argumentsOf = (value: string) => value.match(/%\d+\$[sd]/g)?.sort() ?? [];
      expect(argumentsOf(polish.get(key) ?? ""), key).toEqual(argumentsOf(source.get(key) ?? ""));
    }
  });

  it("keeps positional format arguments in translated strings", () => {
    expect(strings("de")).toContain("%1$s und %2$d");
    expect(strings("ru")).toContain("%1$s и ещё %2$d");
    expect(strings("zh-CN")).toContain("%1$s 和另外 %2$d");
    expect(strings("nl")).toContain("%1$s en %2$d anderen");
    expect(strings("ja")).toContain("%1$sとほか%2$d件");
    expect(strings("es")).toContain("%1$s y %2$d más");
    expect(strings("pl")).toContain("%1$s i jeszcze %2$d");
  });
});
