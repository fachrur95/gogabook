
type PermissionType = {
  id: string;
  parent_id?: number;
  masterrole_description: string;
  masterrole_descriptioneng: string | null;
  masterrole_favourite: boolean | null;
  masterrole_url: string;
  masterrole_alias: string;
}

export type RoleType = PermissionType & {
  allow: boolean;
}
export interface IRole extends RoleType {
  children: RoleType[];
}