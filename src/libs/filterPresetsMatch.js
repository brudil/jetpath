export default function filterMatch(query, presetsMap, fallback) {
  const res = Object.keys(presetsMap).filter(presetName => {
    const preset = presetsMap[presetName];

    return Object.keys(preset).every(presetKey => {
      return preset[presetKey] === query[presetKey];
    });
  });

  if (res.length > 0) {
    return res[0];
  }
  return fallback;
}
