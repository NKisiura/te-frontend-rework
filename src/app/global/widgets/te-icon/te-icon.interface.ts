export interface TeIcon {
  readonly name: TeIconName;
  readonly data: string;
}

export type TeIconName =
  | 'notification-new-message'
  | 'notification-trip-update'
  | 'notification-trip-alert';
