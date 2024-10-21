export function formatSystemInfo(uptime, totalMemory) {
  return {
    uptime: `${uptime} seconds`,
    totalMemory: `${totalMemory.toFixed(2)} MB`
  };
}