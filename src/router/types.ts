import { ReactNode } from 'react';

export interface PermissionType {
  auth: string[];
}

export interface RouteType {
  path?: string;
  index?: boolean;
  redirection?: ReactNode;
  children?: RouteType[];
  caseSensitive?: boolean;
  id?: string;
  element?: ReactNode | null;
  permissions?: PermissionType;
  hide?: boolean;
}
