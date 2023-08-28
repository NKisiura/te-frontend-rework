import { YesNoFlag } from '@shared/types/yes-no-flag.type';

export interface CpOption {
  readonly optionId?: number;
  readonly editable?: YesNoFlag;
  readonly optionType?: CpOptionType;
  readonly optionName?: string;
  readonly value?: string;
  readonly valueId?: number;
  readonly visibleToClient?: YesNoFlag;
  readonly visibleToClientValue?: YesNoFlag;
  readonly orgId?: number;
}

export type CpOptionType = 'ui' | 'system' | 'report' | 'api';
