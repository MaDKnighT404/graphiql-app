import { useSyncExternalStore } from 'react';

export function useWindowDimensions() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getSnapshot() {
  const { innerWidth: width, innerHeight: height } = window;
  return width;
}
