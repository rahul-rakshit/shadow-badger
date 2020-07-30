import {
  EntitySchema,
  getRepository,
  DeleteResult,
  UpdateResult
} from 'typeorm';

type AllowedRelations = 'currency' | 'account';

export interface Actions<T> {
  create: (modelObject: T) => Promise<T>;
  findAll: (options?: {
    where?: Partial<T>;
    relations?: AllowedRelations[];
  }) => Promise<T[]>;
  delete: (id: number | string) => Promise<DeleteResult>;
  edit: (id: number | string, modelObject: T) => Promise<UpdateResult>;
  findOne: (
    id?: number | string,
    options?: { where: Partial<T> & { id?: number | string } }
  ) => Promise<T | undefined>;
  findOneOrFail: (
    id?: number | string,
    options?: { where: Partial<T> & { id?: number | string } }
  ) => Promise<T>;
}

export function generateActionsWrapper<T>(
  entitySchema: EntitySchema<T>
): Actions<T> {
  return {
    async create(modelObject: T) {
      return getRepository(entitySchema).save(modelObject);
    },
    async findAll(options?: {
      where?: Partial<T>;
      relations?: AllowedRelations[];
    }) {
      return getRepository(entitySchema).find(options);
    },
    async delete(id: number | string) {
      return getRepository(entitySchema).delete(id);
    },
    async edit(id: number | string, modelObject: T) {
      return getRepository(entitySchema).update(id, modelObject);
    },
    async findOne(id?: number | string, options?: { where: Partial<T> }) {
      return getRepository(entitySchema).findOne(id, options);
    },
    async findOneOrFail(id?: number | string, options?: { where: Partial<T> }) {
      return getRepository(entitySchema).findOneOrFail(id, options);
    }
  };
}
