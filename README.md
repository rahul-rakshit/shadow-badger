# Shadow Badger CLI

This is a command line tool to manage a shadow budget. It is currently in active development and doesn't yet have a beta version.

## Domain Model Diagram

This is the planned domain model.

```plantuml
class Currency << (1, yellow) >> {
  {field} +id: number;
  {field} +created_at: Date;
  {field} +updated_at: Date;
  {field} +version: number;
  ..
  {field} +code: string; (unique)
  {field} +name: string; (unique)
  {field} +symbol: string;
  {field} +description?: string;
}

class Category << (1, yellow) >> {
  {field} +id: number;
  {field} +created_at: Date;
  {field} +updated_at: Date;
  {field} +version: number;
  ..
  {field} +code: string; (unique)
  {field} +name: string; (unique)
  {field} +description?: string;
}

class Account << (1, yellow) >> {
  {field} #id: number;
  {field} -created_at: Date;
  {field} -updated_at: Date;
  {field} -version: number;
  ..
  {field} #code: string; (unique)
  {field} #name: string;
  {field} -opened?: Date;
  {field} -closed?: Date;
  {field} -description?: string;
  ..
  {field} -currencyId: number;
}

class Vendor << (1, yellow) >> {
  {field} -id: number;
  {field} -created_at: Date;
  {field} -updated_at: Date;
  {field} -version: number;
  ..
  {field} -name: string;
  {field} -address?: string;
  {field} -coordinates?: string;
  {field} -description?: string;
}

class Transaction << (1, yellow) >> {
  {field} -id: number;
  {field} -created_at: Date;
  {field} -updated_at: Date;
  {field} -version: number;
  ..
  {field} -dateTime: Date;
  {field} -amount: number;
  {field} -description?: string;
  ..
  {field} -accountId: number;
  {field} -categoryId: number;
  {field} -vendorId: number;
}

class Snapshot << (2, orange )>> {
  {field} -id: number;
  {field} -created_at: Date;
  {field} -updated_at: Date;
  {field} -version: number;
  ..
  {field} -dateTime: Date;
  {field} -balance: number;
  ..
  {field} -accountId: number;
}

class VendorGroup << (3, fuchsia) >> {
  {field} -id: number;
  {field} -created_at: Date;
  {field} -updated_at: Date;
  {field} -version: number;
  ..
  {field} -name: string;
  {field} -description?: string;
  ..
  {field} -vendorIds: number[];
}

class TransactionGroup << (3, fuchsia) >> {
  {field} -id: number;
  {field} -created_at: Date;
  {field} -updated_at: Date;
  {field} -version: number;
  ..
  {field} -name: string;
  {field} -description?: string;
  ..
  {field} -transactionIds: number[];
}

Currency --|> Account: 1:n
Account --|> Transaction: 1:n
Category --|> Transaction: 1:n
Vendor --|> Transaction: 1:n
Account --|> Snapshot: 1:n
Vendor --|> VendorGroup: n:n
Transaction --|> TransactionGroup: n:n
```

**Legend**:

- green circles: already implemented fields
- yellow diamond: implemented but not yet tested field
- red squares: yet to be implemented fields
- "1" in a yellow circle: stage 1 plans
- "2" in an orange circle: stage 2 plans
- "3" in a fuchsia circle: stage 3 plans
