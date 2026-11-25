import { installConsoleLogger } from "@moonlight/logging/console-logger";
import { installEarlyErrorReporting, startMonitoring } from "./lib/platform/monitoring";

// So failures handed to `bestEffort` show in the console instead of vanishing.
installConsoleLogger("web");
installEarlyErrorReporting();
void startMonitoring();
