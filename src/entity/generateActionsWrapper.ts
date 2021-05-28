import {
  EntitySchema,
  getRepository,
  DeleteResult,
  UpdateResult,
  ILike
} from 'typeorm';
import { Field } from '../validations/validations-d';

type OperatorFunction = (field: Field) => any;
export const operators: { [key: string]: OperatorFunction } = {
  ilike: ILike
};

export type AllowedRelations = 'currency' | 'account' | 'category' | 'vendor';

export interface Actions<T> {
  create: (modelObject: T) => Promise<T>;
  findAll: (options?: {
    where?: Partial<T>;
    relations?: AllowedRelations[];
  }) => Promise<T[]>;
  delete: (id: number) => Promise<DeleteResult>;
  edit: (updatedObject: T) => Promise<UpdateResult>;
  findOne: (
    id?: number,
    options?: {
      where?: Partial<T> & { [key in keyof T]: ReturnType<OperatorFunction> };
      relations?: AllowedRelations[];
    }
  ) => Promise<T | undefined>;
  findOneOrFail: (
    id?: number,
    options?: {
      where?: Partial<T>;
      relations?: AllowedRelations[];
    }
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
    async delete(id: number) {
      return getRepository(entitySchema).delete(id);
    },
    async edit(updatedObject: T): Promise<any> {
      return getRepository(entitySchema).save(updatedObject);
    },
    async findOne(
      id?: number,
      options?: {
        where?: Partial<T> & { [key in keyof T]: ReturnType<OperatorFunction> };
        relations?: AllowedRelations[];
      }
    ) {
      return getRepository(entitySchema).findOne(id, options);
    },
    async findOneOrFail(
      id?: number,
      options?: {
        where?: Partial<T>;
        relations?: AllowedRelations[];
      }
    ) {
      return getRepository(entitySchema).findOneOrFail(id, options);
    }
  };
}
