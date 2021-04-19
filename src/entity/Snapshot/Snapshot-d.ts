import { DbCoreFields } from '../DbCoreFields-d';
import { Account } from '../Account/Account-d';

interface SnapshotFields {
  dateTime?: Date;
  balance?: string;
  description?: string;
}

interface SnapshotRelationFields {
  account?: Account;
  accountId?: number;
}

export type Snapshot = { id?: number } & SnapshotFields &
  SnapshotRelationFields &
  DbCoreFields;
