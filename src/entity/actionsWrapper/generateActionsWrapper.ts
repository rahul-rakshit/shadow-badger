import {
  EntitySchema,
  getRepository,
  DeleteResult,
  UpdateResult
} from 'typeorm';

export interface Actions<T> {
  create: (modelObject: T) => Promise<T>;
  findAll: (options?: { where: Partial<T> & { id?: number } }) => Promise<T[]>;
  delete: (id: number) => Promise<DeleteResult>;
  edit: (id: number, modelObject: T) => Promise<UpdateResult>;
  findById: (id: number) => Promise<T | undefined>;
  findByIdOrFail: (id: number) => Promise<T>;
}

export function generateActionsWrapper<T>(
  entitySchema: EntitySchema<T>
): Actions<T> {
  return {
    async create(modelObject: T) {
      return getRepository(entitySchema).save(modelObject);
    },
    async findAll(options?: { where: Partial<T> & { id?: number } }) {
      return getRepository(entitySchema).find(options);
    },
    async delete(id: number) {
      return getRepository(entitySchema).delete(id);
    },
    async edit(id: number, modelObject: T) {
      return getRepository(entitySchema).update(id, modelObject);
    },
    async findById(id: number) {
      return getRepository(entitySchema).findOne(id);
    },
    async findByIdOrFail(id: number) {
      return getRepository(entitySchema).findOneOrFail(id);
    }
  };
}
