import { EntitySchemaColumnOptions } from 'typeorm';

export const schemaCoreColumns = {
  createdAt: {
    name: 'created_at',
    type: Date,
    createDate: true
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updated_at',
    type: Date,
    updateDate: true
  } as EntitySchemaColumnOptions,
  version: {
    name: 'version',
    type: Number,
    version: true
  } as EntitySchemaColumnOptions
};

export const idColumn = {
  id: {
    type: Number,
    primary: true,
    generated: true
  } as EntitySchemaColumnOptions
};
