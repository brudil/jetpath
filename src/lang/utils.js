// eslint-disable-next-line
export function generateFromConstants(langMap, constantIds) {
  const list = [];

  constantIds.forEach(id => {
    list.push(id.toString());
    list.push(langMap[id]);
  });

  return list;
}
