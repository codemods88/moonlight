import { t } from "@lingui/core/macro";
import type { UserDeviceRequest } from "@moonlight/core";
import { listUserDevicesWith, removeUserDeviceWith } from "@moonlight/core";
import { fetchAuthenticatedAccountJson } from "../api/api";

const request: UserDeviceRequest = async (path, method) => {
  const { response, body } = await fetchAuthenticatedAccountJson<unknown>(
    path,
    method === "DELETE" ? { method } : {},
    method === "DELETE" ? null : {},
  );
  return { ok: response.ok, status: response.status, readBody: async () => body };
};

export function listUserDevices() {
  return listUserDevicesWith(request, t`Could not load`);
}

export function removeUserDevice(deviceId: string) {
  return removeUserDeviceWith(request, deviceId, t`Could not remove`);
}
