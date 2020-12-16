import { DbCoreFields } from '../DbCoreFields-d';

export interface VendorDomainFields {
  name?: string;
  coordinates?: string;
  address?: string;
  description?: string;
}

export type Vendor = { id?: number } & VendorDomainFields & DbCoreFields;
