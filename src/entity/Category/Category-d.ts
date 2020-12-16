import { DbCoreFields } from '../DbCoreFields-d';

export interface CategoryDomainFields {
  name?: string;
  code?: string;
  description?: string;
}

export type Category = { id?: number } & CategoryDomainFields & DbCoreFields;
