import {
  EntitySchema,
  getRepository,
  DeleteResult,
  UpdateResult,
  FindManyOptions,
  FindOneOptions
} from 'typeorm';

export interface Actions<T> {
  create: (modelObject: T) => Promise<T>;
  findAll: (options?: FindManyOptions) => Promise<T[]>;
  delete: (id: number) => Promise<DeleteResult>;
  edit: (id: number, modelObject: T) => Promise<UpdateResult>;
  findById: (id: number, options?: FindOneOptions) => Promise<T>;
}

export function generateActionsWrapper<T>(
  entitySchema: EntitySchema<T>
): Actions<T> {
  return {
    async create(modelObject: T) {
      return getRepository(entitySchema).save(modelObject);
    },
    async findAll() {
      return getRepository(entitySchema).find();
    },
    async delete(id: number) {
      return getRepository(entitySchema).delete(id);
    },
    async edit(id: number, modelObject: T) {
      return getRepository(entitySchema).update(id, modelObject);
    },
    async findById(id: number) {
      return getRepository(entitySchema).findOneOrFail(id);
    }
  };
}
