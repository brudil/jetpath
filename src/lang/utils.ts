// eslint-disable-next-line
export function generateFromConstants(
  langMap: { [key: string]: string },
  constantIds: Array<number>
) {
  const list: Array<string | number> = [];

  constantIds.forEach(id => {
    list.push(id.toString());
    list.push(langMap[id]);
  });

  return list;
}
