// PWA Service Worker registration and silent update checks.

import { DB } from './db.js';
import { safeLocalGet, safeLocalRemove } from './storageSafe.js';
import { fetchVersionInfo, getBootVersionInfo, normalizeVersionInfo } from './versioning.js';

const UPDATE_ACK_VERSION_KEY = 'update_ack_version';
const LEGACY_PENDING_KEY = 'update_ack_pending';
const UPDATE_CHECK_THROTTLE_MS = 30000;

const updateState = {
  acknowledgedVersion: null,
  registration: null,
  waitingWorker: null,
  lastUpdateCheckAt: 0
};

async function getAcknowledgedVersion() {
  try {
    const storedVersion = await DB.getSetting(UPDATE_ACK_VERSION_KEY);
    if (storedVersion != null) return storedVersion;

    const legacyVersion = safeLocalGet(UPDATE_ACK_VERSION_KEY);
    if (legacyVersion) {
      await DB.setSetting(UPDATE_ACK_VERSION_KEY, legacyVersion);
      safeLocalRemove(UPDATE_ACK_VERSION_KEY);
      return legacyVersion;
    }
  } catch {
    return safeLocalGet(UPDATE_ACK_VERSION_KEY);
  }
  return null;
}

async function setAcknowledgedVersion(version) {
  await DB.setSetting(UPDATE_ACK_VERSION_KEY, version);
  safeLocalRemove(UPDATE_ACK_VERSION_KEY);
}

function migrateLegacyPendingKey() {
  safeLocalRemove(LEGACY_PENDING_KEY);
}

async function resolveLatestVersionInfo({ preferNetwork = true } = {}) {
  let info = getBootVersionInfo();
  if (!preferNetwork) return normalizeVersionInfo(info);

  try {
    const networkInfo = await fetchVersionInfo(true);
    if (networkInfo) info = networkInfo;
  } catch {
    /* use boot-only */
  }

  return normalizeVersionInfo(info);
}

function getWaitingWorker(registration = updateState.registration) {
  if (!registration) return null;
  return registration.waiting || null;
}

function autoActivate(worker) {
  if (worker) worker.postMessage('skipWaiting');
}

async function acknowledgeVersionSilently(info) {
  const normalized = normalizeVersionInfo(info);
  if (!normalized?.version) return null;

  try {
    await setAcknowledgedVersion(normalized.version);
    updateState.acknowledgedVersion = normalized.version;
  } catch (err) {
    console.warn('Failed to store latest version acknowledgement:', err);
  }

  return normalized;
}

async function syncLatestVersionSilently({ preferNetwork = true } = {}) {
  migrateLegacyPendingKey();

  const acknowledgedVersion = await getAcknowledgedVersion();
  updateState.acknowledgedVersion = acknowledgedVersion;

  const latestInfo = await resolveLatestVersionInfo({ preferNetwork });
  if (!latestInfo) return null;

  if (latestInfo.version !== acknowledgedVersion) {
    await acknowledgeVersionSilently(latestInfo);
  }

  updateState.waitingWorker = getWaitingWorker();
  if (updateState.waitingWorker) autoActivate(updateState.waitingWorker);

  return latestInfo;
}

export function scheduleUpdateNoticeAfterAppReady() {
  window.addEventListener(
    'toeic-app-ready',
    () => {
      const runWhenRevealed = () => {
        if (document.documentElement.classList.contains('app-booting')) {
          requestAnimationFrame(runWhenRevealed);
          return;
        }
        syncLatestVersionSilently().catch(() => {});
      };
      requestAnimationFrame(runWhenRevealed);
    },
    { once: true }
  );
}

async function triggerUpdateCheck({ force = false } = {}) {
  const now = Date.now();
  if (!force && now - updateState.lastUpdateCheckAt < UPDATE_CHECK_THROTTLE_MS) return;
  updateState.lastUpdateCheckAt = now;

  try {
    await updateState.registration?.update();
  } catch {
    /* keep update checks resilient */
  }

  syncLatestVersionSilently({ preferNetwork: true }).catch(() => {});
}

export async function registerServiceWorkerUpdater() {
  if (!('serviceWorker' in navigator) || updateState.registration) return;

  try {
    const reg = await navigator.serviceWorker.register('./sw.js');
    updateState.registration = reg;
    updateState.waitingWorker = getWaitingWorker(reg);
    if (updateState.waitingWorker) autoActivate(updateState.waitingWorker);

    triggerUpdateCheck({ force: true }).catch(() => {});

    reg.addEventListener('updatefound', () => {
      const installing = reg.installing;
      if (!installing) return;

      installing.addEventListener('statechange', () => {
        if (installing.state === 'installed') {
          updateState.waitingWorker = getWaitingWorker(reg);
          if (updateState.waitingWorker) autoActivate(updateState.waitingWorker);
          syncLatestVersionSilently({ preferNetwork: true }).catch(() => {});
        }
      });
    });

    const triggerUpdate = () => {
      triggerUpdateCheck().catch(() => {});
    };

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') triggerUpdate();
    });

    window.addEventListener('pageshow', (event) => {
      if (event.persisted) triggerUpdate();
    });
  } catch (err) {
    console.warn('SW registration failed:', err);
  }
}
