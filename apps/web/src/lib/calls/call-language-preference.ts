import { callAutoLanguagePreference } from "@moonlight/core";
import { createStoredPreference } from "../preferences/stored-preference";

export const callAutoLanguage = createStoredPreference(callAutoLanguagePreference);
