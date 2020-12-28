import { DbCoreFields } from '../DbCoreFields-d';
import { Category } from '../Category/Category-d';
import { Vendor } from '../Vendor/Vendor-d';
import { Account } from '../Account/Account-d';

interface TransactionFields {
  dateTime?: Date;
  amount?: number;
  description?: string;
}

interface TransactionRelationFields {
  account?: Account;
  accountId?: number;

  category?: Category;
  categoryId?: number;

  vendor?: Vendor;
  vendorId?: number;
}

export type Transaction = { id?: number } & TransactionFields &
  TransactionRelationFields &
  DbCoreFields;
