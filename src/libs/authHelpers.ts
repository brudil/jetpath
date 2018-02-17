import {RootState} from "../types";

export function hasPermission(state: RootState, codename: string) {
  const permissions = state.auth.getIn(['auth', 'permissions']).map((perm: any) => perm.key);

  return permissions.indexOf(codename) !== -1;
}
