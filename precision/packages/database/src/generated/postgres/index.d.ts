
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Employee
 * 
 */
export type Employee = $Result.DefaultSelection<Prisma.$EmployeePayload>
/**
 * Model TimeRecord
 * 
 */
export type TimeRecord = $Result.DefaultSelection<Prisma.$TimeRecordPayload>
/**
 * Model TimeAdjustment
 * 
 */
export type TimeAdjustment = $Result.DefaultSelection<Prisma.$TimeAdjustmentPayload>
/**
 * Model Team
 * 
 */
export type Team = $Result.DefaultSelection<Prisma.$TeamPayload>
/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model JobRole
 * 
 */
export type JobRole = $Result.DefaultSelection<Prisma.$JobRolePayload>
/**
 * Model WorkBlockage
 * 
 */
export type WorkBlockage = $Result.DefaultSelection<Prisma.$WorkBlockagePayload>
/**
 * Model SupportMessage
 * 
 */
export type SupportMessage = $Result.DefaultSelection<Prisma.$SupportMessagePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Employees
 * const employees = await prisma.employee.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Employees
   * const employees = await prisma.employee.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timeRecord`: Exposes CRUD operations for the **TimeRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimeRecords
    * const timeRecords = await prisma.timeRecord.findMany()
    * ```
    */
  get timeRecord(): Prisma.TimeRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timeAdjustment`: Exposes CRUD operations for the **TimeAdjustment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimeAdjustments
    * const timeAdjustments = await prisma.timeAdjustment.findMany()
    * ```
    */
  get timeAdjustment(): Prisma.TimeAdjustmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.team.findMany()
    * ```
    */
  get team(): Prisma.TeamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobRole`: Exposes CRUD operations for the **JobRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobRoles
    * const jobRoles = await prisma.jobRole.findMany()
    * ```
    */
  get jobRole(): Prisma.JobRoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workBlockage`: Exposes CRUD operations for the **WorkBlockage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkBlockages
    * const workBlockages = await prisma.workBlockage.findMany()
    * ```
    */
  get workBlockage(): Prisma.WorkBlockageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supportMessage`: Exposes CRUD operations for the **SupportMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupportMessages
    * const supportMessages = await prisma.supportMessage.findMany()
    * ```
    */
  get supportMessage(): Prisma.SupportMessageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Employee: 'Employee',
    TimeRecord: 'TimeRecord',
    TimeAdjustment: 'TimeAdjustment',
    Team: 'Team',
    Company: 'Company',
    JobRole: 'JobRole',
    WorkBlockage: 'WorkBlockage',
    SupportMessage: 'SupportMessage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "employee" | "timeRecord" | "timeAdjustment" | "team" | "company" | "jobRole" | "workBlockage" | "supportMessage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Employee: {
        payload: Prisma.$EmployeePayload<ExtArgs>
        fields: Prisma.EmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findFirst: {
            args: Prisma.EmployeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findMany: {
            args: Prisma.EmployeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          create: {
            args: Prisma.EmployeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          createMany: {
            args: Prisma.EmployeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          delete: {
            args: Prisma.EmployeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          update: {
            args: Prisma.EmployeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          upsert: {
            args: Prisma.EmployeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.EmployeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      TimeRecord: {
        payload: Prisma.$TimeRecordPayload<ExtArgs>
        fields: Prisma.TimeRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimeRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimeRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeRecordPayload>
          }
          findFirst: {
            args: Prisma.TimeRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimeRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeRecordPayload>
          }
          findMany: {
            args: Prisma.TimeRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeRecordPayload>[]
          }
          create: {
            args: Prisma.TimeRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeRecordPayload>
          }
          createMany: {
            args: Prisma.TimeRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimeRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeRecordPayload>[]
          }
          delete: {
            args: Prisma.TimeRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeRecordPayload>
          }
          update: {
            args: Prisma.TimeRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeRecordPayload>
          }
          deleteMany: {
            args: Prisma.TimeRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimeRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimeRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeRecordPayload>[]
          }
          upsert: {
            args: Prisma.TimeRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeRecordPayload>
          }
          aggregate: {
            args: Prisma.TimeRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimeRecord>
          }
          groupBy: {
            args: Prisma.TimeRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimeRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimeRecordCountArgs<ExtArgs>
            result: $Utils.Optional<TimeRecordCountAggregateOutputType> | number
          }
        }
      }
      TimeAdjustment: {
        payload: Prisma.$TimeAdjustmentPayload<ExtArgs>
        fields: Prisma.TimeAdjustmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimeAdjustmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeAdjustmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimeAdjustmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeAdjustmentPayload>
          }
          findFirst: {
            args: Prisma.TimeAdjustmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeAdjustmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimeAdjustmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeAdjustmentPayload>
          }
          findMany: {
            args: Prisma.TimeAdjustmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeAdjustmentPayload>[]
          }
          create: {
            args: Prisma.TimeAdjustmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeAdjustmentPayload>
          }
          createMany: {
            args: Prisma.TimeAdjustmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimeAdjustmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeAdjustmentPayload>[]
          }
          delete: {
            args: Prisma.TimeAdjustmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeAdjustmentPayload>
          }
          update: {
            args: Prisma.TimeAdjustmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeAdjustmentPayload>
          }
          deleteMany: {
            args: Prisma.TimeAdjustmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimeAdjustmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimeAdjustmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeAdjustmentPayload>[]
          }
          upsert: {
            args: Prisma.TimeAdjustmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeAdjustmentPayload>
          }
          aggregate: {
            args: Prisma.TimeAdjustmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimeAdjustment>
          }
          groupBy: {
            args: Prisma.TimeAdjustmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimeAdjustmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimeAdjustmentCountArgs<ExtArgs>
            result: $Utils.Optional<TimeAdjustmentCountAggregateOutputType> | number
          }
        }
      }
      Team: {
        payload: Prisma.$TeamPayload<ExtArgs>
        fields: Prisma.TeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findFirst: {
            args: Prisma.TeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findMany: {
            args: Prisma.TeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          create: {
            args: Prisma.TeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          createMany: {
            args: Prisma.TeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          delete: {
            args: Prisma.TeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          update: {
            args: Prisma.TeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          deleteMany: {
            args: Prisma.TeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          upsert: {
            args: Prisma.TeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          aggregate: {
            args: Prisma.TeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeam>
          }
          groupBy: {
            args: Prisma.TeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamCountArgs<ExtArgs>
            result: $Utils.Optional<TeamCountAggregateOutputType> | number
          }
        }
      }
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      JobRole: {
        payload: Prisma.$JobRolePayload<ExtArgs>
        fields: Prisma.JobRoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobRoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobRoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRolePayload>
          }
          findFirst: {
            args: Prisma.JobRoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobRoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRolePayload>
          }
          findMany: {
            args: Prisma.JobRoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRolePayload>[]
          }
          create: {
            args: Prisma.JobRoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRolePayload>
          }
          createMany: {
            args: Prisma.JobRoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobRoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRolePayload>[]
          }
          delete: {
            args: Prisma.JobRoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRolePayload>
          }
          update: {
            args: Prisma.JobRoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRolePayload>
          }
          deleteMany: {
            args: Prisma.JobRoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobRoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobRoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRolePayload>[]
          }
          upsert: {
            args: Prisma.JobRoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRolePayload>
          }
          aggregate: {
            args: Prisma.JobRoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobRole>
          }
          groupBy: {
            args: Prisma.JobRoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobRoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobRoleCountArgs<ExtArgs>
            result: $Utils.Optional<JobRoleCountAggregateOutputType> | number
          }
        }
      }
      WorkBlockage: {
        payload: Prisma.$WorkBlockagePayload<ExtArgs>
        fields: Prisma.WorkBlockageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkBlockageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkBlockagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkBlockageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkBlockagePayload>
          }
          findFirst: {
            args: Prisma.WorkBlockageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkBlockagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkBlockageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkBlockagePayload>
          }
          findMany: {
            args: Prisma.WorkBlockageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkBlockagePayload>[]
          }
          create: {
            args: Prisma.WorkBlockageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkBlockagePayload>
          }
          createMany: {
            args: Prisma.WorkBlockageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkBlockageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkBlockagePayload>[]
          }
          delete: {
            args: Prisma.WorkBlockageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkBlockagePayload>
          }
          update: {
            args: Prisma.WorkBlockageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkBlockagePayload>
          }
          deleteMany: {
            args: Prisma.WorkBlockageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkBlockageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkBlockageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkBlockagePayload>[]
          }
          upsert: {
            args: Prisma.WorkBlockageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkBlockagePayload>
          }
          aggregate: {
            args: Prisma.WorkBlockageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkBlockage>
          }
          groupBy: {
            args: Prisma.WorkBlockageGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkBlockageGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkBlockageCountArgs<ExtArgs>
            result: $Utils.Optional<WorkBlockageCountAggregateOutputType> | number
          }
        }
      }
      SupportMessage: {
        payload: Prisma.$SupportMessagePayload<ExtArgs>
        fields: Prisma.SupportMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupportMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupportMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          findFirst: {
            args: Prisma.SupportMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupportMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          findMany: {
            args: Prisma.SupportMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>[]
          }
          create: {
            args: Prisma.SupportMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          createMany: {
            args: Prisma.SupportMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupportMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>[]
          }
          delete: {
            args: Prisma.SupportMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          update: {
            args: Prisma.SupportMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          deleteMany: {
            args: Prisma.SupportMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupportMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SupportMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>[]
          }
          upsert: {
            args: Prisma.SupportMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          aggregate: {
            args: Prisma.SupportMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupportMessage>
          }
          groupBy: {
            args: Prisma.SupportMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupportMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupportMessageCountArgs<ExtArgs>
            result: $Utils.Optional<SupportMessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    employee?: EmployeeOmit
    timeRecord?: TimeRecordOmit
    timeAdjustment?: TimeAdjustmentOmit
    team?: TeamOmit
    company?: CompanyOmit
    jobRole?: JobRoleOmit
    workBlockage?: WorkBlockageOmit
    supportMessage?: SupportMessageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EmployeeCountOutputType
   */

  export type EmployeeCountOutputType = {
    subordinates: number
    adjustments: number
    records: number
  }

  export type EmployeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subordinates?: boolean | EmployeeCountOutputTypeCountSubordinatesArgs
    adjustments?: boolean | EmployeeCountOutputTypeCountAdjustmentsArgs
    records?: boolean | EmployeeCountOutputTypeCountRecordsArgs
  }

  // Custom InputTypes
  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     */
    select?: EmployeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountSubordinatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountAdjustmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeAdjustmentWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeRecordWhereInput
  }


  /**
   * Count Type TeamCountOutputType
   */

  export type TeamCountOutputType = {
    employees: number
  }

  export type TeamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | TeamCountOutputTypeCountEmployeesArgs
  }

  // Custom InputTypes
  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    employees: number
    teams: number
    jobRoles: number
    blockages: number
    supportMessages: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | CompanyCountOutputTypeCountEmployeesArgs
    teams?: boolean | CompanyCountOutputTypeCountTeamsArgs
    jobRoles?: boolean | CompanyCountOutputTypeCountJobRolesArgs
    blockages?: boolean | CompanyCountOutputTypeCountBlockagesArgs
    supportMessages?: boolean | CompanyCountOutputTypeCountSupportMessagesArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountJobRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobRoleWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountBlockagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkBlockageWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountSupportMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportMessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    isPasswordTemp: boolean | null
    tempPassword: string | null
    userRole: string | null
    role: string | null
    workStart: string | null
    lunchStart: string | null
    lunchEnd: string | null
    workEnd: string | null
    createdAt: Date | null
    isActive: boolean | null
    contractNumber: string | null
    phone: string | null
    address: string | null
    isTeamLeader: boolean | null
    teamId: string | null
    managerId: string | null
    companyId: string | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    isPasswordTemp: boolean | null
    tempPassword: string | null
    userRole: string | null
    role: string | null
    workStart: string | null
    lunchStart: string | null
    lunchEnd: string | null
    workEnd: string | null
    createdAt: Date | null
    isActive: boolean | null
    contractNumber: string | null
    phone: string | null
    address: string | null
    isTeamLeader: boolean | null
    teamId: string | null
    managerId: string | null
    companyId: string | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    isPasswordTemp: number
    tempPassword: number
    userRole: number
    role: number
    workStart: number
    lunchStart: number
    lunchEnd: number
    workEnd: number
    createdAt: number
    isActive: number
    contractNumber: number
    phone: number
    address: number
    isTeamLeader: number
    teamId: number
    managerId: number
    companyId: number
    _all: number
  }


  export type EmployeeMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    isPasswordTemp?: true
    tempPassword?: true
    userRole?: true
    role?: true
    workStart?: true
    lunchStart?: true
    lunchEnd?: true
    workEnd?: true
    createdAt?: true
    isActive?: true
    contractNumber?: true
    phone?: true
    address?: true
    isTeamLeader?: true
    teamId?: true
    managerId?: true
    companyId?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    isPasswordTemp?: true
    tempPassword?: true
    userRole?: true
    role?: true
    workStart?: true
    lunchStart?: true
    lunchEnd?: true
    workEnd?: true
    createdAt?: true
    isActive?: true
    contractNumber?: true
    phone?: true
    address?: true
    isTeamLeader?: true
    teamId?: true
    managerId?: true
    companyId?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    isPasswordTemp?: true
    tempPassword?: true
    userRole?: true
    role?: true
    workStart?: true
    lunchStart?: true
    lunchEnd?: true
    workEnd?: true
    createdAt?: true
    isActive?: true
    contractNumber?: true
    phone?: true
    address?: true
    isTeamLeader?: true
    teamId?: true
    managerId?: true
    companyId?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employee to aggregate.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithAggregationInput | EmployeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    isPasswordTemp: boolean
    tempPassword: string | null
    userRole: string
    role: string
    workStart: string
    lunchStart: string
    lunchEnd: string
    workEnd: string
    createdAt: Date
    isActive: boolean
    contractNumber: string | null
    phone: string | null
    address: string | null
    isTeamLeader: boolean
    teamId: string | null
    managerId: string | null
    companyId: string | null
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    isPasswordTemp?: boolean
    tempPassword?: boolean
    userRole?: boolean
    role?: boolean
    workStart?: boolean
    lunchStart?: boolean
    lunchEnd?: boolean
    workEnd?: boolean
    createdAt?: boolean
    isActive?: boolean
    contractNumber?: boolean
    phone?: boolean
    address?: boolean
    isTeamLeader?: boolean
    teamId?: boolean
    managerId?: boolean
    companyId?: boolean
    team?: boolean | Employee$teamArgs<ExtArgs>
    manager?: boolean | Employee$managerArgs<ExtArgs>
    subordinates?: boolean | Employee$subordinatesArgs<ExtArgs>
    company?: boolean | Employee$companyArgs<ExtArgs>
    adjustments?: boolean | Employee$adjustmentsArgs<ExtArgs>
    records?: boolean | Employee$recordsArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    isPasswordTemp?: boolean
    tempPassword?: boolean
    userRole?: boolean
    role?: boolean
    workStart?: boolean
    lunchStart?: boolean
    lunchEnd?: boolean
    workEnd?: boolean
    createdAt?: boolean
    isActive?: boolean
    contractNumber?: boolean
    phone?: boolean
    address?: boolean
    isTeamLeader?: boolean
    teamId?: boolean
    managerId?: boolean
    companyId?: boolean
    team?: boolean | Employee$teamArgs<ExtArgs>
    manager?: boolean | Employee$managerArgs<ExtArgs>
    company?: boolean | Employee$companyArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    isPasswordTemp?: boolean
    tempPassword?: boolean
    userRole?: boolean
    role?: boolean
    workStart?: boolean
    lunchStart?: boolean
    lunchEnd?: boolean
    workEnd?: boolean
    createdAt?: boolean
    isActive?: boolean
    contractNumber?: boolean
    phone?: boolean
    address?: boolean
    isTeamLeader?: boolean
    teamId?: boolean
    managerId?: boolean
    companyId?: boolean
    team?: boolean | Employee$teamArgs<ExtArgs>
    manager?: boolean | Employee$managerArgs<ExtArgs>
    company?: boolean | Employee$companyArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    isPasswordTemp?: boolean
    tempPassword?: boolean
    userRole?: boolean
    role?: boolean
    workStart?: boolean
    lunchStart?: boolean
    lunchEnd?: boolean
    workEnd?: boolean
    createdAt?: boolean
    isActive?: boolean
    contractNumber?: boolean
    phone?: boolean
    address?: boolean
    isTeamLeader?: boolean
    teamId?: boolean
    managerId?: boolean
    companyId?: boolean
  }

  export type EmployeeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "isPasswordTemp" | "tempPassword" | "userRole" | "role" | "workStart" | "lunchStart" | "lunchEnd" | "workEnd" | "createdAt" | "isActive" | "contractNumber" | "phone" | "address" | "isTeamLeader" | "teamId" | "managerId" | "companyId", ExtArgs["result"]["employee"]>
  export type EmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | Employee$teamArgs<ExtArgs>
    manager?: boolean | Employee$managerArgs<ExtArgs>
    subordinates?: boolean | Employee$subordinatesArgs<ExtArgs>
    company?: boolean | Employee$companyArgs<ExtArgs>
    adjustments?: boolean | Employee$adjustmentsArgs<ExtArgs>
    records?: boolean | Employee$recordsArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmployeeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | Employee$teamArgs<ExtArgs>
    manager?: boolean | Employee$managerArgs<ExtArgs>
    company?: boolean | Employee$companyArgs<ExtArgs>
  }
  export type EmployeeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | Employee$teamArgs<ExtArgs>
    manager?: boolean | Employee$managerArgs<ExtArgs>
    company?: boolean | Employee$companyArgs<ExtArgs>
  }

  export type $EmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employee"
    objects: {
      team: Prisma.$TeamPayload<ExtArgs> | null
      manager: Prisma.$EmployeePayload<ExtArgs> | null
      subordinates: Prisma.$EmployeePayload<ExtArgs>[]
      company: Prisma.$CompanyPayload<ExtArgs> | null
      adjustments: Prisma.$TimeAdjustmentPayload<ExtArgs>[]
      records: Prisma.$TimeRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      isPasswordTemp: boolean
      tempPassword: string | null
      userRole: string
      role: string
      workStart: string
      lunchStart: string
      lunchEnd: string
      workEnd: string
      createdAt: Date
      isActive: boolean
      contractNumber: string | null
      phone: string | null
      address: string | null
      isTeamLeader: boolean
      teamId: string | null
      managerId: string | null
      companyId: string | null
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  type EmployeeGetPayload<S extends boolean | null | undefined | EmployeeDefaultArgs> = $Result.GetResult<Prisma.$EmployeePayload, S>

  type EmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface EmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employee'], meta: { name: 'Employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeFindUniqueArgs>(args: SelectSubset<T, EmployeeFindUniqueArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeFindFirstArgs>(args?: SelectSubset<T, EmployeeFindFirstArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeFindManyArgs>(args?: SelectSubset<T, EmployeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends EmployeeCreateArgs>(args: SelectSubset<T, EmployeeCreateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employees.
     * @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeCreateManyArgs>(args?: SelectSubset<T, EmployeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employees and returns the data saved in the database.
     * @param {EmployeeCreateManyAndReturnArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends EmployeeDeleteArgs>(args: SelectSubset<T, EmployeeDeleteArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeUpdateArgs>(args: SelectSubset<T, EmployeeUpdateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeDeleteManyArgs>(args?: SelectSubset<T, EmployeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeUpdateManyArgs>(args: SelectSubset<T, EmployeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees and returns the data updated in the database.
     * @param {EmployeeUpdateManyAndReturnArgs} args - Arguments to update many Employees.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployeeUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeUpsertArgs>(args: SelectSubset<T, EmployeeUpsertArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employee model
   */
  readonly fields: EmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends Employee$teamArgs<ExtArgs> = {}>(args?: Subset<T, Employee$teamArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    manager<T extends Employee$managerArgs<ExtArgs> = {}>(args?: Subset<T, Employee$managerArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    subordinates<T extends Employee$subordinatesArgs<ExtArgs> = {}>(args?: Subset<T, Employee$subordinatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    company<T extends Employee$companyArgs<ExtArgs> = {}>(args?: Subset<T, Employee$companyArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    adjustments<T extends Employee$adjustmentsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$adjustmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeAdjustmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    records<T extends Employee$recordsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Employee model
   */
  interface EmployeeFieldRefs {
    readonly id: FieldRef<"Employee", 'String'>
    readonly name: FieldRef<"Employee", 'String'>
    readonly email: FieldRef<"Employee", 'String'>
    readonly password: FieldRef<"Employee", 'String'>
    readonly isPasswordTemp: FieldRef<"Employee", 'Boolean'>
    readonly tempPassword: FieldRef<"Employee", 'String'>
    readonly userRole: FieldRef<"Employee", 'String'>
    readonly role: FieldRef<"Employee", 'String'>
    readonly workStart: FieldRef<"Employee", 'String'>
    readonly lunchStart: FieldRef<"Employee", 'String'>
    readonly lunchEnd: FieldRef<"Employee", 'String'>
    readonly workEnd: FieldRef<"Employee", 'String'>
    readonly createdAt: FieldRef<"Employee", 'DateTime'>
    readonly isActive: FieldRef<"Employee", 'Boolean'>
    readonly contractNumber: FieldRef<"Employee", 'String'>
    readonly phone: FieldRef<"Employee", 'String'>
    readonly address: FieldRef<"Employee", 'String'>
    readonly isTeamLeader: FieldRef<"Employee", 'Boolean'>
    readonly teamId: FieldRef<"Employee", 'String'>
    readonly managerId: FieldRef<"Employee", 'String'>
    readonly companyId: FieldRef<"Employee", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employees to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee create
   */
  export type EmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Employee.
     */
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }

  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employee createManyAndReturn
   */
  export type EmployeeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employee update
   */
  export type EmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Employee.
     */
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
  }

  /**
   * Employee updateManyAndReturn
   */
  export type EmployeeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Employee to update in case it exists.
     */
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     */
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }

  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter which Employee to delete.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employees to delete
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to delete.
     */
    limit?: number
  }

  /**
   * Employee.team
   */
  export type Employee$teamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
  }

  /**
   * Employee.manager
   */
  export type Employee$managerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
  }

  /**
   * Employee.subordinates
   */
  export type Employee$subordinatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    cursor?: EmployeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee.company
   */
  export type Employee$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
  }

  /**
   * Employee.adjustments
   */
  export type Employee$adjustmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeAdjustment
     */
    select?: TimeAdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeAdjustment
     */
    omit?: TimeAdjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeAdjustmentInclude<ExtArgs> | null
    where?: TimeAdjustmentWhereInput
    orderBy?: TimeAdjustmentOrderByWithRelationInput | TimeAdjustmentOrderByWithRelationInput[]
    cursor?: TimeAdjustmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimeAdjustmentScalarFieldEnum | TimeAdjustmentScalarFieldEnum[]
  }

  /**
   * Employee.records
   */
  export type Employee$recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeRecord
     */
    select?: TimeRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeRecord
     */
    omit?: TimeRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeRecordInclude<ExtArgs> | null
    where?: TimeRecordWhereInput
    orderBy?: TimeRecordOrderByWithRelationInput | TimeRecordOrderByWithRelationInput[]
    cursor?: TimeRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimeRecordScalarFieldEnum | TimeRecordScalarFieldEnum[]
  }

  /**
   * Employee without action
   */
  export type EmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
  }


  /**
   * Model TimeRecord
   */

  export type AggregateTimeRecord = {
    _count: TimeRecordCountAggregateOutputType | null
    _min: TimeRecordMinAggregateOutputType | null
    _max: TimeRecordMaxAggregateOutputType | null
  }

  export type TimeRecordMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    date: string | null
    type: string | null
    time: string | null
    confirmed: boolean | null
  }

  export type TimeRecordMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    date: string | null
    type: string | null
    time: string | null
    confirmed: boolean | null
  }

  export type TimeRecordCountAggregateOutputType = {
    id: number
    employeeId: number
    date: number
    type: number
    time: number
    confirmed: number
    _all: number
  }


  export type TimeRecordMinAggregateInputType = {
    id?: true
    employeeId?: true
    date?: true
    type?: true
    time?: true
    confirmed?: true
  }

  export type TimeRecordMaxAggregateInputType = {
    id?: true
    employeeId?: true
    date?: true
    type?: true
    time?: true
    confirmed?: true
  }

  export type TimeRecordCountAggregateInputType = {
    id?: true
    employeeId?: true
    date?: true
    type?: true
    time?: true
    confirmed?: true
    _all?: true
  }

  export type TimeRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeRecord to aggregate.
     */
    where?: TimeRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeRecords to fetch.
     */
    orderBy?: TimeRecordOrderByWithRelationInput | TimeRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimeRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimeRecords
    **/
    _count?: true | TimeRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimeRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimeRecordMaxAggregateInputType
  }

  export type GetTimeRecordAggregateType<T extends TimeRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateTimeRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimeRecord[P]>
      : GetScalarType<T[P], AggregateTimeRecord[P]>
  }




  export type TimeRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeRecordWhereInput
    orderBy?: TimeRecordOrderByWithAggregationInput | TimeRecordOrderByWithAggregationInput[]
    by: TimeRecordScalarFieldEnum[] | TimeRecordScalarFieldEnum
    having?: TimeRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimeRecordCountAggregateInputType | true
    _min?: TimeRecordMinAggregateInputType
    _max?: TimeRecordMaxAggregateInputType
  }

  export type TimeRecordGroupByOutputType = {
    id: string
    employeeId: string
    date: string
    type: string
    time: string
    confirmed: boolean
    _count: TimeRecordCountAggregateOutputType | null
    _min: TimeRecordMinAggregateOutputType | null
    _max: TimeRecordMaxAggregateOutputType | null
  }

  type GetTimeRecordGroupByPayload<T extends TimeRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimeRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimeRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimeRecordGroupByOutputType[P]>
            : GetScalarType<T[P], TimeRecordGroupByOutputType[P]>
        }
      >
    >


  export type TimeRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    date?: boolean
    type?: boolean
    time?: boolean
    confirmed?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeRecord"]>

  export type TimeRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    date?: boolean
    type?: boolean
    time?: boolean
    confirmed?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeRecord"]>

  export type TimeRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    date?: boolean
    type?: boolean
    time?: boolean
    confirmed?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeRecord"]>

  export type TimeRecordSelectScalar = {
    id?: boolean
    employeeId?: boolean
    date?: boolean
    type?: boolean
    time?: boolean
    confirmed?: boolean
  }

  export type TimeRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "date" | "type" | "time" | "confirmed", ExtArgs["result"]["timeRecord"]>
  export type TimeRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type TimeRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type TimeRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $TimeRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimeRecord"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string
      date: string
      type: string
      time: string
      confirmed: boolean
    }, ExtArgs["result"]["timeRecord"]>
    composites: {}
  }

  type TimeRecordGetPayload<S extends boolean | null | undefined | TimeRecordDefaultArgs> = $Result.GetResult<Prisma.$TimeRecordPayload, S>

  type TimeRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimeRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimeRecordCountAggregateInputType | true
    }

  export interface TimeRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimeRecord'], meta: { name: 'TimeRecord' } }
    /**
     * Find zero or one TimeRecord that matches the filter.
     * @param {TimeRecordFindUniqueArgs} args - Arguments to find a TimeRecord
     * @example
     * // Get one TimeRecord
     * const timeRecord = await prisma.timeRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimeRecordFindUniqueArgs>(args: SelectSubset<T, TimeRecordFindUniqueArgs<ExtArgs>>): Prisma__TimeRecordClient<$Result.GetResult<Prisma.$TimeRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TimeRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimeRecordFindUniqueOrThrowArgs} args - Arguments to find a TimeRecord
     * @example
     * // Get one TimeRecord
     * const timeRecord = await prisma.timeRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimeRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, TimeRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimeRecordClient<$Result.GetResult<Prisma.$TimeRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimeRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeRecordFindFirstArgs} args - Arguments to find a TimeRecord
     * @example
     * // Get one TimeRecord
     * const timeRecord = await prisma.timeRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimeRecordFindFirstArgs>(args?: SelectSubset<T, TimeRecordFindFirstArgs<ExtArgs>>): Prisma__TimeRecordClient<$Result.GetResult<Prisma.$TimeRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimeRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeRecordFindFirstOrThrowArgs} args - Arguments to find a TimeRecord
     * @example
     * // Get one TimeRecord
     * const timeRecord = await prisma.timeRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimeRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, TimeRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimeRecordClient<$Result.GetResult<Prisma.$TimeRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TimeRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimeRecords
     * const timeRecords = await prisma.timeRecord.findMany()
     * 
     * // Get first 10 TimeRecords
     * const timeRecords = await prisma.timeRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timeRecordWithIdOnly = await prisma.timeRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimeRecordFindManyArgs>(args?: SelectSubset<T, TimeRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TimeRecord.
     * @param {TimeRecordCreateArgs} args - Arguments to create a TimeRecord.
     * @example
     * // Create one TimeRecord
     * const TimeRecord = await prisma.timeRecord.create({
     *   data: {
     *     // ... data to create a TimeRecord
     *   }
     * })
     * 
     */
    create<T extends TimeRecordCreateArgs>(args: SelectSubset<T, TimeRecordCreateArgs<ExtArgs>>): Prisma__TimeRecordClient<$Result.GetResult<Prisma.$TimeRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TimeRecords.
     * @param {TimeRecordCreateManyArgs} args - Arguments to create many TimeRecords.
     * @example
     * // Create many TimeRecords
     * const timeRecord = await prisma.timeRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimeRecordCreateManyArgs>(args?: SelectSubset<T, TimeRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TimeRecords and returns the data saved in the database.
     * @param {TimeRecordCreateManyAndReturnArgs} args - Arguments to create many TimeRecords.
     * @example
     * // Create many TimeRecords
     * const timeRecord = await prisma.timeRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TimeRecords and only return the `id`
     * const timeRecordWithIdOnly = await prisma.timeRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimeRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, TimeRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TimeRecord.
     * @param {TimeRecordDeleteArgs} args - Arguments to delete one TimeRecord.
     * @example
     * // Delete one TimeRecord
     * const TimeRecord = await prisma.timeRecord.delete({
     *   where: {
     *     // ... filter to delete one TimeRecord
     *   }
     * })
     * 
     */
    delete<T extends TimeRecordDeleteArgs>(args: SelectSubset<T, TimeRecordDeleteArgs<ExtArgs>>): Prisma__TimeRecordClient<$Result.GetResult<Prisma.$TimeRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TimeRecord.
     * @param {TimeRecordUpdateArgs} args - Arguments to update one TimeRecord.
     * @example
     * // Update one TimeRecord
     * const timeRecord = await prisma.timeRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimeRecordUpdateArgs>(args: SelectSubset<T, TimeRecordUpdateArgs<ExtArgs>>): Prisma__TimeRecordClient<$Result.GetResult<Prisma.$TimeRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TimeRecords.
     * @param {TimeRecordDeleteManyArgs} args - Arguments to filter TimeRecords to delete.
     * @example
     * // Delete a few TimeRecords
     * const { count } = await prisma.timeRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimeRecordDeleteManyArgs>(args?: SelectSubset<T, TimeRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimeRecords
     * const timeRecord = await prisma.timeRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimeRecordUpdateManyArgs>(args: SelectSubset<T, TimeRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeRecords and returns the data updated in the database.
     * @param {TimeRecordUpdateManyAndReturnArgs} args - Arguments to update many TimeRecords.
     * @example
     * // Update many TimeRecords
     * const timeRecord = await prisma.timeRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TimeRecords and only return the `id`
     * const timeRecordWithIdOnly = await prisma.timeRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TimeRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, TimeRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TimeRecord.
     * @param {TimeRecordUpsertArgs} args - Arguments to update or create a TimeRecord.
     * @example
     * // Update or create a TimeRecord
     * const timeRecord = await prisma.timeRecord.upsert({
     *   create: {
     *     // ... data to create a TimeRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimeRecord we want to update
     *   }
     * })
     */
    upsert<T extends TimeRecordUpsertArgs>(args: SelectSubset<T, TimeRecordUpsertArgs<ExtArgs>>): Prisma__TimeRecordClient<$Result.GetResult<Prisma.$TimeRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TimeRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeRecordCountArgs} args - Arguments to filter TimeRecords to count.
     * @example
     * // Count the number of TimeRecords
     * const count = await prisma.timeRecord.count({
     *   where: {
     *     // ... the filter for the TimeRecords we want to count
     *   }
     * })
    **/
    count<T extends TimeRecordCountArgs>(
      args?: Subset<T, TimeRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimeRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimeRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimeRecordAggregateArgs>(args: Subset<T, TimeRecordAggregateArgs>): Prisma.PrismaPromise<GetTimeRecordAggregateType<T>>

    /**
     * Group by TimeRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimeRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimeRecordGroupByArgs['orderBy'] }
        : { orderBy?: TimeRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimeRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimeRecord model
   */
  readonly fields: TimeRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimeRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimeRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TimeRecord model
   */
  interface TimeRecordFieldRefs {
    readonly id: FieldRef<"TimeRecord", 'String'>
    readonly employeeId: FieldRef<"TimeRecord", 'String'>
    readonly date: FieldRef<"TimeRecord", 'String'>
    readonly type: FieldRef<"TimeRecord", 'String'>
    readonly time: FieldRef<"TimeRecord", 'String'>
    readonly confirmed: FieldRef<"TimeRecord", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * TimeRecord findUnique
   */
  export type TimeRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeRecord
     */
    select?: TimeRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeRecord
     */
    omit?: TimeRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeRecordInclude<ExtArgs> | null
    /**
     * Filter, which TimeRecord to fetch.
     */
    where: TimeRecordWhereUniqueInput
  }

  /**
   * TimeRecord findUniqueOrThrow
   */
  export type TimeRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeRecord
     */
    select?: TimeRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeRecord
     */
    omit?: TimeRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeRecordInclude<ExtArgs> | null
    /**
     * Filter, which TimeRecord to fetch.
     */
    where: TimeRecordWhereUniqueInput
  }

  /**
   * TimeRecord findFirst
   */
  export type TimeRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeRecord
     */
    select?: TimeRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeRecord
     */
    omit?: TimeRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeRecordInclude<ExtArgs> | null
    /**
     * Filter, which TimeRecord to fetch.
     */
    where?: TimeRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeRecords to fetch.
     */
    orderBy?: TimeRecordOrderByWithRelationInput | TimeRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeRecords.
     */
    cursor?: TimeRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeRecords.
     */
    distinct?: TimeRecordScalarFieldEnum | TimeRecordScalarFieldEnum[]
  }

  /**
   * TimeRecord findFirstOrThrow
   */
  export type TimeRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeRecord
     */
    select?: TimeRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeRecord
     */
    omit?: TimeRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeRecordInclude<ExtArgs> | null
    /**
     * Filter, which TimeRecord to fetch.
     */
    where?: TimeRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeRecords to fetch.
     */
    orderBy?: TimeRecordOrderByWithRelationInput | TimeRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeRecords.
     */
    cursor?: TimeRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeRecords.
     */
    distinct?: TimeRecordScalarFieldEnum | TimeRecordScalarFieldEnum[]
  }

  /**
   * TimeRecord findMany
   */
  export type TimeRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeRecord
     */
    select?: TimeRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeRecord
     */
    omit?: TimeRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeRecordInclude<ExtArgs> | null
    /**
     * Filter, which TimeRecords to fetch.
     */
    where?: TimeRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeRecords to fetch.
     */
    orderBy?: TimeRecordOrderByWithRelationInput | TimeRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimeRecords.
     */
    cursor?: TimeRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeRecords.
     */
    distinct?: TimeRecordScalarFieldEnum | TimeRecordScalarFieldEnum[]
  }

  /**
   * TimeRecord create
   */
  export type TimeRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeRecord
     */
    select?: TimeRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeRecord
     */
    omit?: TimeRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a TimeRecord.
     */
    data: XOR<TimeRecordCreateInput, TimeRecordUncheckedCreateInput>
  }

  /**
   * TimeRecord createMany
   */
  export type TimeRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimeRecords.
     */
    data: TimeRecordCreateManyInput | TimeRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimeRecord createManyAndReturn
   */
  export type TimeRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeRecord
     */
    select?: TimeRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimeRecord
     */
    omit?: TimeRecordOmit<ExtArgs> | null
    /**
     * The data used to create many TimeRecords.
     */
    data: TimeRecordCreateManyInput | TimeRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimeRecord update
   */
  export type TimeRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeRecord
     */
    select?: TimeRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeRecord
     */
    omit?: TimeRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a TimeRecord.
     */
    data: XOR<TimeRecordUpdateInput, TimeRecordUncheckedUpdateInput>
    /**
     * Choose, which TimeRecord to update.
     */
    where: TimeRecordWhereUniqueInput
  }

  /**
   * TimeRecord updateMany
   */
  export type TimeRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimeRecords.
     */
    data: XOR<TimeRecordUpdateManyMutationInput, TimeRecordUncheckedUpdateManyInput>
    /**
     * Filter which TimeRecords to update
     */
    where?: TimeRecordWhereInput
    /**
     * Limit how many TimeRecords to update.
     */
    limit?: number
  }

  /**
   * TimeRecord updateManyAndReturn
   */
  export type TimeRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeRecord
     */
    select?: TimeRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimeRecord
     */
    omit?: TimeRecordOmit<ExtArgs> | null
    /**
     * The data used to update TimeRecords.
     */
    data: XOR<TimeRecordUpdateManyMutationInput, TimeRecordUncheckedUpdateManyInput>
    /**
     * Filter which TimeRecords to update
     */
    where?: TimeRecordWhereInput
    /**
     * Limit how many TimeRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimeRecord upsert
   */
  export type TimeRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeRecord
     */
    select?: TimeRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeRecord
     */
    omit?: TimeRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the TimeRecord to update in case it exists.
     */
    where: TimeRecordWhereUniqueInput
    /**
     * In case the TimeRecord found by the `where` argument doesn't exist, create a new TimeRecord with this data.
     */
    create: XOR<TimeRecordCreateInput, TimeRecordUncheckedCreateInput>
    /**
     * In case the TimeRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimeRecordUpdateInput, TimeRecordUncheckedUpdateInput>
  }

  /**
   * TimeRecord delete
   */
  export type TimeRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeRecord
     */
    select?: TimeRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeRecord
     */
    omit?: TimeRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeRecordInclude<ExtArgs> | null
    /**
     * Filter which TimeRecord to delete.
     */
    where: TimeRecordWhereUniqueInput
  }

  /**
   * TimeRecord deleteMany
   */
  export type TimeRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeRecords to delete
     */
    where?: TimeRecordWhereInput
    /**
     * Limit how many TimeRecords to delete.
     */
    limit?: number
  }

  /**
   * TimeRecord without action
   */
  export type TimeRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeRecord
     */
    select?: TimeRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeRecord
     */
    omit?: TimeRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeRecordInclude<ExtArgs> | null
  }


  /**
   * Model TimeAdjustment
   */

  export type AggregateTimeAdjustment = {
    _count: TimeAdjustmentCountAggregateOutputType | null
    _min: TimeAdjustmentMinAggregateOutputType | null
    _max: TimeAdjustmentMaxAggregateOutputType | null
  }

  export type TimeAdjustmentMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    date: string | null
    type: string | null
    time: string | null
    justification: string | null
    attachment: string | null
    status: string | null
    createdAt: Date | null
  }

  export type TimeAdjustmentMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    date: string | null
    type: string | null
    time: string | null
    justification: string | null
    attachment: string | null
    status: string | null
    createdAt: Date | null
  }

  export type TimeAdjustmentCountAggregateOutputType = {
    id: number
    employeeId: number
    date: number
    type: number
    time: number
    justification: number
    attachment: number
    status: number
    createdAt: number
    _all: number
  }


  export type TimeAdjustmentMinAggregateInputType = {
    id?: true
    employeeId?: true
    date?: true
    type?: true
    time?: true
    justification?: true
    attachment?: true
    status?: true
    createdAt?: true
  }

  export type TimeAdjustmentMaxAggregateInputType = {
    id?: true
    employeeId?: true
    date?: true
    type?: true
    time?: true
    justification?: true
    attachment?: true
    status?: true
    createdAt?: true
  }

  export type TimeAdjustmentCountAggregateInputType = {
    id?: true
    employeeId?: true
    date?: true
    type?: true
    time?: true
    justification?: true
    attachment?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type TimeAdjustmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeAdjustment to aggregate.
     */
    where?: TimeAdjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeAdjustments to fetch.
     */
    orderBy?: TimeAdjustmentOrderByWithRelationInput | TimeAdjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimeAdjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeAdjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeAdjustments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimeAdjustments
    **/
    _count?: true | TimeAdjustmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimeAdjustmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimeAdjustmentMaxAggregateInputType
  }

  export type GetTimeAdjustmentAggregateType<T extends TimeAdjustmentAggregateArgs> = {
        [P in keyof T & keyof AggregateTimeAdjustment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimeAdjustment[P]>
      : GetScalarType<T[P], AggregateTimeAdjustment[P]>
  }




  export type TimeAdjustmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeAdjustmentWhereInput
    orderBy?: TimeAdjustmentOrderByWithAggregationInput | TimeAdjustmentOrderByWithAggregationInput[]
    by: TimeAdjustmentScalarFieldEnum[] | TimeAdjustmentScalarFieldEnum
    having?: TimeAdjustmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimeAdjustmentCountAggregateInputType | true
    _min?: TimeAdjustmentMinAggregateInputType
    _max?: TimeAdjustmentMaxAggregateInputType
  }

  export type TimeAdjustmentGroupByOutputType = {
    id: string
    employeeId: string
    date: string
    type: string
    time: string | null
    justification: string
    attachment: string | null
    status: string
    createdAt: Date
    _count: TimeAdjustmentCountAggregateOutputType | null
    _min: TimeAdjustmentMinAggregateOutputType | null
    _max: TimeAdjustmentMaxAggregateOutputType | null
  }

  type GetTimeAdjustmentGroupByPayload<T extends TimeAdjustmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimeAdjustmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimeAdjustmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimeAdjustmentGroupByOutputType[P]>
            : GetScalarType<T[P], TimeAdjustmentGroupByOutputType[P]>
        }
      >
    >


  export type TimeAdjustmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    date?: boolean
    type?: boolean
    time?: boolean
    justification?: boolean
    attachment?: boolean
    status?: boolean
    createdAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeAdjustment"]>

  export type TimeAdjustmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    date?: boolean
    type?: boolean
    time?: boolean
    justification?: boolean
    attachment?: boolean
    status?: boolean
    createdAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeAdjustment"]>

  export type TimeAdjustmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    date?: boolean
    type?: boolean
    time?: boolean
    justification?: boolean
    attachment?: boolean
    status?: boolean
    createdAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeAdjustment"]>

  export type TimeAdjustmentSelectScalar = {
    id?: boolean
    employeeId?: boolean
    date?: boolean
    type?: boolean
    time?: boolean
    justification?: boolean
    attachment?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type TimeAdjustmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "date" | "type" | "time" | "justification" | "attachment" | "status" | "createdAt", ExtArgs["result"]["timeAdjustment"]>
  export type TimeAdjustmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type TimeAdjustmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type TimeAdjustmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $TimeAdjustmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimeAdjustment"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string
      date: string
      type: string
      time: string | null
      justification: string
      attachment: string | null
      status: string
      createdAt: Date
    }, ExtArgs["result"]["timeAdjustment"]>
    composites: {}
  }

  type TimeAdjustmentGetPayload<S extends boolean | null | undefined | TimeAdjustmentDefaultArgs> = $Result.GetResult<Prisma.$TimeAdjustmentPayload, S>

  type TimeAdjustmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimeAdjustmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimeAdjustmentCountAggregateInputType | true
    }

  export interface TimeAdjustmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimeAdjustment'], meta: { name: 'TimeAdjustment' } }
    /**
     * Find zero or one TimeAdjustment that matches the filter.
     * @param {TimeAdjustmentFindUniqueArgs} args - Arguments to find a TimeAdjustment
     * @example
     * // Get one TimeAdjustment
     * const timeAdjustment = await prisma.timeAdjustment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimeAdjustmentFindUniqueArgs>(args: SelectSubset<T, TimeAdjustmentFindUniqueArgs<ExtArgs>>): Prisma__TimeAdjustmentClient<$Result.GetResult<Prisma.$TimeAdjustmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TimeAdjustment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimeAdjustmentFindUniqueOrThrowArgs} args - Arguments to find a TimeAdjustment
     * @example
     * // Get one TimeAdjustment
     * const timeAdjustment = await prisma.timeAdjustment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimeAdjustmentFindUniqueOrThrowArgs>(args: SelectSubset<T, TimeAdjustmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimeAdjustmentClient<$Result.GetResult<Prisma.$TimeAdjustmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimeAdjustment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeAdjustmentFindFirstArgs} args - Arguments to find a TimeAdjustment
     * @example
     * // Get one TimeAdjustment
     * const timeAdjustment = await prisma.timeAdjustment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimeAdjustmentFindFirstArgs>(args?: SelectSubset<T, TimeAdjustmentFindFirstArgs<ExtArgs>>): Prisma__TimeAdjustmentClient<$Result.GetResult<Prisma.$TimeAdjustmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimeAdjustment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeAdjustmentFindFirstOrThrowArgs} args - Arguments to find a TimeAdjustment
     * @example
     * // Get one TimeAdjustment
     * const timeAdjustment = await prisma.timeAdjustment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimeAdjustmentFindFirstOrThrowArgs>(args?: SelectSubset<T, TimeAdjustmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimeAdjustmentClient<$Result.GetResult<Prisma.$TimeAdjustmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TimeAdjustments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeAdjustmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimeAdjustments
     * const timeAdjustments = await prisma.timeAdjustment.findMany()
     * 
     * // Get first 10 TimeAdjustments
     * const timeAdjustments = await prisma.timeAdjustment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timeAdjustmentWithIdOnly = await prisma.timeAdjustment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimeAdjustmentFindManyArgs>(args?: SelectSubset<T, TimeAdjustmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeAdjustmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TimeAdjustment.
     * @param {TimeAdjustmentCreateArgs} args - Arguments to create a TimeAdjustment.
     * @example
     * // Create one TimeAdjustment
     * const TimeAdjustment = await prisma.timeAdjustment.create({
     *   data: {
     *     // ... data to create a TimeAdjustment
     *   }
     * })
     * 
     */
    create<T extends TimeAdjustmentCreateArgs>(args: SelectSubset<T, TimeAdjustmentCreateArgs<ExtArgs>>): Prisma__TimeAdjustmentClient<$Result.GetResult<Prisma.$TimeAdjustmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TimeAdjustments.
     * @param {TimeAdjustmentCreateManyArgs} args - Arguments to create many TimeAdjustments.
     * @example
     * // Create many TimeAdjustments
     * const timeAdjustment = await prisma.timeAdjustment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimeAdjustmentCreateManyArgs>(args?: SelectSubset<T, TimeAdjustmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TimeAdjustments and returns the data saved in the database.
     * @param {TimeAdjustmentCreateManyAndReturnArgs} args - Arguments to create many TimeAdjustments.
     * @example
     * // Create many TimeAdjustments
     * const timeAdjustment = await prisma.timeAdjustment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TimeAdjustments and only return the `id`
     * const timeAdjustmentWithIdOnly = await prisma.timeAdjustment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimeAdjustmentCreateManyAndReturnArgs>(args?: SelectSubset<T, TimeAdjustmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeAdjustmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TimeAdjustment.
     * @param {TimeAdjustmentDeleteArgs} args - Arguments to delete one TimeAdjustment.
     * @example
     * // Delete one TimeAdjustment
     * const TimeAdjustment = await prisma.timeAdjustment.delete({
     *   where: {
     *     // ... filter to delete one TimeAdjustment
     *   }
     * })
     * 
     */
    delete<T extends TimeAdjustmentDeleteArgs>(args: SelectSubset<T, TimeAdjustmentDeleteArgs<ExtArgs>>): Prisma__TimeAdjustmentClient<$Result.GetResult<Prisma.$TimeAdjustmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TimeAdjustment.
     * @param {TimeAdjustmentUpdateArgs} args - Arguments to update one TimeAdjustment.
     * @example
     * // Update one TimeAdjustment
     * const timeAdjustment = await prisma.timeAdjustment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimeAdjustmentUpdateArgs>(args: SelectSubset<T, TimeAdjustmentUpdateArgs<ExtArgs>>): Prisma__TimeAdjustmentClient<$Result.GetResult<Prisma.$TimeAdjustmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TimeAdjustments.
     * @param {TimeAdjustmentDeleteManyArgs} args - Arguments to filter TimeAdjustments to delete.
     * @example
     * // Delete a few TimeAdjustments
     * const { count } = await prisma.timeAdjustment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimeAdjustmentDeleteManyArgs>(args?: SelectSubset<T, TimeAdjustmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeAdjustments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeAdjustmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimeAdjustments
     * const timeAdjustment = await prisma.timeAdjustment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimeAdjustmentUpdateManyArgs>(args: SelectSubset<T, TimeAdjustmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeAdjustments and returns the data updated in the database.
     * @param {TimeAdjustmentUpdateManyAndReturnArgs} args - Arguments to update many TimeAdjustments.
     * @example
     * // Update many TimeAdjustments
     * const timeAdjustment = await prisma.timeAdjustment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TimeAdjustments and only return the `id`
     * const timeAdjustmentWithIdOnly = await prisma.timeAdjustment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TimeAdjustmentUpdateManyAndReturnArgs>(args: SelectSubset<T, TimeAdjustmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeAdjustmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TimeAdjustment.
     * @param {TimeAdjustmentUpsertArgs} args - Arguments to update or create a TimeAdjustment.
     * @example
     * // Update or create a TimeAdjustment
     * const timeAdjustment = await prisma.timeAdjustment.upsert({
     *   create: {
     *     // ... data to create a TimeAdjustment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimeAdjustment we want to update
     *   }
     * })
     */
    upsert<T extends TimeAdjustmentUpsertArgs>(args: SelectSubset<T, TimeAdjustmentUpsertArgs<ExtArgs>>): Prisma__TimeAdjustmentClient<$Result.GetResult<Prisma.$TimeAdjustmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TimeAdjustments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeAdjustmentCountArgs} args - Arguments to filter TimeAdjustments to count.
     * @example
     * // Count the number of TimeAdjustments
     * const count = await prisma.timeAdjustment.count({
     *   where: {
     *     // ... the filter for the TimeAdjustments we want to count
     *   }
     * })
    **/
    count<T extends TimeAdjustmentCountArgs>(
      args?: Subset<T, TimeAdjustmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimeAdjustmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimeAdjustment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeAdjustmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimeAdjustmentAggregateArgs>(args: Subset<T, TimeAdjustmentAggregateArgs>): Prisma.PrismaPromise<GetTimeAdjustmentAggregateType<T>>

    /**
     * Group by TimeAdjustment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeAdjustmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimeAdjustmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimeAdjustmentGroupByArgs['orderBy'] }
        : { orderBy?: TimeAdjustmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimeAdjustmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeAdjustmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimeAdjustment model
   */
  readonly fields: TimeAdjustmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimeAdjustment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimeAdjustmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TimeAdjustment model
   */
  interface TimeAdjustmentFieldRefs {
    readonly id: FieldRef<"TimeAdjustment", 'String'>
    readonly employeeId: FieldRef<"TimeAdjustment", 'String'>
    readonly date: FieldRef<"TimeAdjustment", 'String'>
    readonly type: FieldRef<"TimeAdjustment", 'String'>
    readonly time: FieldRef<"TimeAdjustment", 'String'>
    readonly justification: FieldRef<"TimeAdjustment", 'String'>
    readonly attachment: FieldRef<"TimeAdjustment", 'String'>
    readonly status: FieldRef<"TimeAdjustment", 'String'>
    readonly createdAt: FieldRef<"TimeAdjustment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TimeAdjustment findUnique
   */
  export type TimeAdjustmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeAdjustment
     */
    select?: TimeAdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeAdjustment
     */
    omit?: TimeAdjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeAdjustmentInclude<ExtArgs> | null
    /**
     * Filter, which TimeAdjustment to fetch.
     */
    where: TimeAdjustmentWhereUniqueInput
  }

  /**
   * TimeAdjustment findUniqueOrThrow
   */
  export type TimeAdjustmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeAdjustment
     */
    select?: TimeAdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeAdjustment
     */
    omit?: TimeAdjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeAdjustmentInclude<ExtArgs> | null
    /**
     * Filter, which TimeAdjustment to fetch.
     */
    where: TimeAdjustmentWhereUniqueInput
  }

  /**
   * TimeAdjustment findFirst
   */
  export type TimeAdjustmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeAdjustment
     */
    select?: TimeAdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeAdjustment
     */
    omit?: TimeAdjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeAdjustmentInclude<ExtArgs> | null
    /**
     * Filter, which TimeAdjustment to fetch.
     */
    where?: TimeAdjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeAdjustments to fetch.
     */
    orderBy?: TimeAdjustmentOrderByWithRelationInput | TimeAdjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeAdjustments.
     */
    cursor?: TimeAdjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeAdjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeAdjustments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeAdjustments.
     */
    distinct?: TimeAdjustmentScalarFieldEnum | TimeAdjustmentScalarFieldEnum[]
  }

  /**
   * TimeAdjustment findFirstOrThrow
   */
  export type TimeAdjustmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeAdjustment
     */
    select?: TimeAdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeAdjustment
     */
    omit?: TimeAdjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeAdjustmentInclude<ExtArgs> | null
    /**
     * Filter, which TimeAdjustment to fetch.
     */
    where?: TimeAdjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeAdjustments to fetch.
     */
    orderBy?: TimeAdjustmentOrderByWithRelationInput | TimeAdjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeAdjustments.
     */
    cursor?: TimeAdjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeAdjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeAdjustments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeAdjustments.
     */
    distinct?: TimeAdjustmentScalarFieldEnum | TimeAdjustmentScalarFieldEnum[]
  }

  /**
   * TimeAdjustment findMany
   */
  export type TimeAdjustmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeAdjustment
     */
    select?: TimeAdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeAdjustment
     */
    omit?: TimeAdjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeAdjustmentInclude<ExtArgs> | null
    /**
     * Filter, which TimeAdjustments to fetch.
     */
    where?: TimeAdjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeAdjustments to fetch.
     */
    orderBy?: TimeAdjustmentOrderByWithRelationInput | TimeAdjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimeAdjustments.
     */
    cursor?: TimeAdjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeAdjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeAdjustments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeAdjustments.
     */
    distinct?: TimeAdjustmentScalarFieldEnum | TimeAdjustmentScalarFieldEnum[]
  }

  /**
   * TimeAdjustment create
   */
  export type TimeAdjustmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeAdjustment
     */
    select?: TimeAdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeAdjustment
     */
    omit?: TimeAdjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeAdjustmentInclude<ExtArgs> | null
    /**
     * The data needed to create a TimeAdjustment.
     */
    data: XOR<TimeAdjustmentCreateInput, TimeAdjustmentUncheckedCreateInput>
  }

  /**
   * TimeAdjustment createMany
   */
  export type TimeAdjustmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimeAdjustments.
     */
    data: TimeAdjustmentCreateManyInput | TimeAdjustmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimeAdjustment createManyAndReturn
   */
  export type TimeAdjustmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeAdjustment
     */
    select?: TimeAdjustmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimeAdjustment
     */
    omit?: TimeAdjustmentOmit<ExtArgs> | null
    /**
     * The data used to create many TimeAdjustments.
     */
    data: TimeAdjustmentCreateManyInput | TimeAdjustmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeAdjustmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimeAdjustment update
   */
  export type TimeAdjustmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeAdjustment
     */
    select?: TimeAdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeAdjustment
     */
    omit?: TimeAdjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeAdjustmentInclude<ExtArgs> | null
    /**
     * The data needed to update a TimeAdjustment.
     */
    data: XOR<TimeAdjustmentUpdateInput, TimeAdjustmentUncheckedUpdateInput>
    /**
     * Choose, which TimeAdjustment to update.
     */
    where: TimeAdjustmentWhereUniqueInput
  }

  /**
   * TimeAdjustment updateMany
   */
  export type TimeAdjustmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimeAdjustments.
     */
    data: XOR<TimeAdjustmentUpdateManyMutationInput, TimeAdjustmentUncheckedUpdateManyInput>
    /**
     * Filter which TimeAdjustments to update
     */
    where?: TimeAdjustmentWhereInput
    /**
     * Limit how many TimeAdjustments to update.
     */
    limit?: number
  }

  /**
   * TimeAdjustment updateManyAndReturn
   */
  export type TimeAdjustmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeAdjustment
     */
    select?: TimeAdjustmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimeAdjustment
     */
    omit?: TimeAdjustmentOmit<ExtArgs> | null
    /**
     * The data used to update TimeAdjustments.
     */
    data: XOR<TimeAdjustmentUpdateManyMutationInput, TimeAdjustmentUncheckedUpdateManyInput>
    /**
     * Filter which TimeAdjustments to update
     */
    where?: TimeAdjustmentWhereInput
    /**
     * Limit how many TimeAdjustments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeAdjustmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimeAdjustment upsert
   */
  export type TimeAdjustmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeAdjustment
     */
    select?: TimeAdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeAdjustment
     */
    omit?: TimeAdjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeAdjustmentInclude<ExtArgs> | null
    /**
     * The filter to search for the TimeAdjustment to update in case it exists.
     */
    where: TimeAdjustmentWhereUniqueInput
    /**
     * In case the TimeAdjustment found by the `where` argument doesn't exist, create a new TimeAdjustment with this data.
     */
    create: XOR<TimeAdjustmentCreateInput, TimeAdjustmentUncheckedCreateInput>
    /**
     * In case the TimeAdjustment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimeAdjustmentUpdateInput, TimeAdjustmentUncheckedUpdateInput>
  }

  /**
   * TimeAdjustment delete
   */
  export type TimeAdjustmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeAdjustment
     */
    select?: TimeAdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeAdjustment
     */
    omit?: TimeAdjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeAdjustmentInclude<ExtArgs> | null
    /**
     * Filter which TimeAdjustment to delete.
     */
    where: TimeAdjustmentWhereUniqueInput
  }

  /**
   * TimeAdjustment deleteMany
   */
  export type TimeAdjustmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeAdjustments to delete
     */
    where?: TimeAdjustmentWhereInput
    /**
     * Limit how many TimeAdjustments to delete.
     */
    limit?: number
  }

  /**
   * TimeAdjustment without action
   */
  export type TimeAdjustmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeAdjustment
     */
    select?: TimeAdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeAdjustment
     */
    omit?: TimeAdjustmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeAdjustmentInclude<ExtArgs> | null
  }


  /**
   * Model Team
   */

  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  export type TeamMinAggregateOutputType = {
    id: string | null
    name: string | null
    companyId: string | null
    createdAt: Date | null
  }

  export type TeamMaxAggregateOutputType = {
    id: string | null
    name: string | null
    companyId: string | null
    createdAt: Date | null
  }

  export type TeamCountAggregateOutputType = {
    id: number
    name: number
    companyId: number
    createdAt: number
    _all: number
  }


  export type TeamMinAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    createdAt?: true
  }

  export type TeamMaxAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    createdAt?: true
  }

  export type TeamCountAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    createdAt?: true
    _all?: true
  }

  export type TeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teams
    **/
    _count?: true | TeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMaxAggregateInputType
  }

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>
  }




  export type TeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithAggregationInput | TeamOrderByWithAggregationInput[]
    by: TeamScalarFieldEnum[] | TeamScalarFieldEnum
    having?: TeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamCountAggregateInputType | true
    _min?: TeamMinAggregateInputType
    _max?: TeamMaxAggregateInputType
  }

  export type TeamGroupByOutputType = {
    id: string
    name: string
    companyId: string
    createdAt: Date
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamGroupByOutputType[P]>
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
        }
      >
    >


  export type TeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    companyId?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    employees?: boolean | Team$employeesArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    companyId?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    companyId?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectScalar = {
    id?: boolean
    name?: boolean
    companyId?: boolean
    createdAt?: boolean
  }

  export type TeamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "companyId" | "createdAt", ExtArgs["result"]["team"]>
  export type TeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    employees?: boolean | Team$employeesArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type TeamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $TeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Team"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      employees: Prisma.$EmployeePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      companyId: string
      createdAt: Date
    }, ExtArgs["result"]["team"]>
    composites: {}
  }

  type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> = $Result.GetResult<Prisma.$TeamPayload, S>

  type TeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamCountAggregateInputType | true
    }

  export interface TeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Team'], meta: { name: 'Team' } }
    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamFindUniqueArgs>(args: SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Team that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamFindFirstArgs>(args?: SelectSubset<T, TeamFindFirstArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamFindManyArgs>(args?: SelectSubset<T, TeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     * 
     */
    create<T extends TeamCreateArgs>(args: SelectSubset<T, TeamCreateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teams.
     * @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamCreateManyArgs>(args?: SelectSubset<T, TeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teams and returns the data saved in the database.
     * @param {TeamCreateManyAndReturnArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     * 
     */
    delete<T extends TeamDeleteArgs>(args: SelectSubset<T, TeamDeleteArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamUpdateArgs>(args: SelectSubset<T, TeamUpdateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamDeleteManyArgs>(args?: SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamUpdateManyArgs>(args: SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams and returns the data updated in the database.
     * @param {TeamUpdateManyAndReturnArgs} args - Arguments to update many Teams.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
     */
    upsert<T extends TeamUpsertArgs>(args: SelectSubset<T, TeamUpsertArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamAggregateArgs>(args: Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamGroupByArgs['orderBy'] }
        : { orderBy?: TeamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Team model
   */
  readonly fields: TeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    employees<T extends Team$employeesArgs<ExtArgs> = {}>(args?: Subset<T, Team$employeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Team model
   */
  interface TeamFieldRefs {
    readonly id: FieldRef<"Team", 'String'>
    readonly name: FieldRef<"Team", 'String'>
    readonly companyId: FieldRef<"Team", 'String'>
    readonly createdAt: FieldRef<"Team", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Team findUnique
   */
  export type TeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findFirst
   */
  export type TeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findMany
   */
  export type TeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team create
   */
  export type TeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>
  }

  /**
   * Team createMany
   */
  export type TeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team createManyAndReturn
   */
  export type TeamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team update
   */
  export type TeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
  }

  /**
   * Team updateManyAndReturn
   */
  export type TeamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team upsert
   */
  export type TeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
  }

  /**
   * Team delete
   */
  export type TeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to delete.
     */
    limit?: number
  }

  /**
   * Team.employees
   */
  export type Team$employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    cursor?: EmployeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Team without action
   */
  export type TeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
  }


  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    number: string | null
    contact: string | null
    country: string | null
    document: string | null
    corporateName: string | null
    zip: string | null
    street: string | null
    city: string | null
    state: string | null
    email: string | null
    subscriptionPlan: string | null
    subscriptionStatus: string | null
    subscriptionEndsAt: Date | null
    createdAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    number: string | null
    contact: string | null
    country: string | null
    document: string | null
    corporateName: string | null
    zip: string | null
    street: string | null
    city: string | null
    state: string | null
    email: string | null
    subscriptionPlan: string | null
    subscriptionStatus: string | null
    subscriptionEndsAt: Date | null
    createdAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    address: number
    number: number
    contact: number
    country: number
    document: number
    corporateName: number
    zip: number
    street: number
    city: number
    state: number
    email: number
    subscriptionPlan: number
    subscriptionStatus: number
    subscriptionEndsAt: number
    createdAt: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    number?: true
    contact?: true
    country?: true
    document?: true
    corporateName?: true
    zip?: true
    street?: true
    city?: true
    state?: true
    email?: true
    subscriptionPlan?: true
    subscriptionStatus?: true
    subscriptionEndsAt?: true
    createdAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    number?: true
    contact?: true
    country?: true
    document?: true
    corporateName?: true
    zip?: true
    street?: true
    city?: true
    state?: true
    email?: true
    subscriptionPlan?: true
    subscriptionStatus?: true
    subscriptionEndsAt?: true
    createdAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    number?: true
    contact?: true
    country?: true
    document?: true
    corporateName?: true
    zip?: true
    street?: true
    city?: true
    state?: true
    email?: true
    subscriptionPlan?: true
    subscriptionStatus?: true
    subscriptionEndsAt?: true
    createdAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    name: string
    address: string
    number: string
    contact: string
    country: string | null
    document: string | null
    corporateName: string | null
    zip: string | null
    street: string | null
    city: string | null
    state: string | null
    email: string | null
    subscriptionPlan: string
    subscriptionStatus: string
    subscriptionEndsAt: Date | null
    createdAt: Date
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    number?: boolean
    contact?: boolean
    country?: boolean
    document?: boolean
    corporateName?: boolean
    zip?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    email?: boolean
    subscriptionPlan?: boolean
    subscriptionStatus?: boolean
    subscriptionEndsAt?: boolean
    createdAt?: boolean
    employees?: boolean | Company$employeesArgs<ExtArgs>
    teams?: boolean | Company$teamsArgs<ExtArgs>
    jobRoles?: boolean | Company$jobRolesArgs<ExtArgs>
    blockages?: boolean | Company$blockagesArgs<ExtArgs>
    supportMessages?: boolean | Company$supportMessagesArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    number?: boolean
    contact?: boolean
    country?: boolean
    document?: boolean
    corporateName?: boolean
    zip?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    email?: boolean
    subscriptionPlan?: boolean
    subscriptionStatus?: boolean
    subscriptionEndsAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    number?: boolean
    contact?: boolean
    country?: boolean
    document?: boolean
    corporateName?: boolean
    zip?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    email?: boolean
    subscriptionPlan?: boolean
    subscriptionStatus?: boolean
    subscriptionEndsAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    number?: boolean
    contact?: boolean
    country?: boolean
    document?: boolean
    corporateName?: boolean
    zip?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    email?: boolean
    subscriptionPlan?: boolean
    subscriptionStatus?: boolean
    subscriptionEndsAt?: boolean
    createdAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "number" | "contact" | "country" | "document" | "corporateName" | "zip" | "street" | "city" | "state" | "email" | "subscriptionPlan" | "subscriptionStatus" | "subscriptionEndsAt" | "createdAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | Company$employeesArgs<ExtArgs>
    teams?: boolean | Company$teamsArgs<ExtArgs>
    jobRoles?: boolean | Company$jobRolesArgs<ExtArgs>
    blockages?: boolean | Company$blockagesArgs<ExtArgs>
    supportMessages?: boolean | Company$supportMessagesArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      employees: Prisma.$EmployeePayload<ExtArgs>[]
      teams: Prisma.$TeamPayload<ExtArgs>[]
      jobRoles: Prisma.$JobRolePayload<ExtArgs>[]
      blockages: Prisma.$WorkBlockagePayload<ExtArgs>[]
      supportMessages: Prisma.$SupportMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string
      number: string
      contact: string
      country: string | null
      document: string | null
      corporateName: string | null
      zip: string | null
      street: string | null
      city: string | null
      state: string | null
      email: string | null
      subscriptionPlan: string
      subscriptionStatus: string
      subscriptionEndsAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employees<T extends Company$employeesArgs<ExtArgs> = {}>(args?: Subset<T, Company$employeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teams<T extends Company$teamsArgs<ExtArgs> = {}>(args?: Subset<T, Company$teamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    jobRoles<T extends Company$jobRolesArgs<ExtArgs> = {}>(args?: Subset<T, Company$jobRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    blockages<T extends Company$blockagesArgs<ExtArgs> = {}>(args?: Subset<T, Company$blockagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkBlockagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    supportMessages<T extends Company$supportMessagesArgs<ExtArgs> = {}>(args?: Subset<T, Company$supportMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'String'>
    readonly name: FieldRef<"Company", 'String'>
    readonly address: FieldRef<"Company", 'String'>
    readonly number: FieldRef<"Company", 'String'>
    readonly contact: FieldRef<"Company", 'String'>
    readonly country: FieldRef<"Company", 'String'>
    readonly document: FieldRef<"Company", 'String'>
    readonly corporateName: FieldRef<"Company", 'String'>
    readonly zip: FieldRef<"Company", 'String'>
    readonly street: FieldRef<"Company", 'String'>
    readonly city: FieldRef<"Company", 'String'>
    readonly state: FieldRef<"Company", 'String'>
    readonly email: FieldRef<"Company", 'String'>
    readonly subscriptionPlan: FieldRef<"Company", 'String'>
    readonly subscriptionStatus: FieldRef<"Company", 'String'>
    readonly subscriptionEndsAt: FieldRef<"Company", 'DateTime'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.employees
   */
  export type Company$employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    cursor?: EmployeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Company.teams
   */
  export type Company$teamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    cursor?: TeamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Company.jobRoles
   */
  export type Company$jobRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRole
     */
    select?: JobRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRole
     */
    omit?: JobRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRoleInclude<ExtArgs> | null
    where?: JobRoleWhereInput
    orderBy?: JobRoleOrderByWithRelationInput | JobRoleOrderByWithRelationInput[]
    cursor?: JobRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobRoleScalarFieldEnum | JobRoleScalarFieldEnum[]
  }

  /**
   * Company.blockages
   */
  export type Company$blockagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkBlockage
     */
    select?: WorkBlockageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkBlockage
     */
    omit?: WorkBlockageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkBlockageInclude<ExtArgs> | null
    where?: WorkBlockageWhereInput
    orderBy?: WorkBlockageOrderByWithRelationInput | WorkBlockageOrderByWithRelationInput[]
    cursor?: WorkBlockageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkBlockageScalarFieldEnum | WorkBlockageScalarFieldEnum[]
  }

  /**
   * Company.supportMessages
   */
  export type Company$supportMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    where?: SupportMessageWhereInput
    orderBy?: SupportMessageOrderByWithRelationInput | SupportMessageOrderByWithRelationInput[]
    cursor?: SupportMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupportMessageScalarFieldEnum | SupportMessageScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model JobRole
   */

  export type AggregateJobRole = {
    _count: JobRoleCountAggregateOutputType | null
    _min: JobRoleMinAggregateOutputType | null
    _max: JobRoleMaxAggregateOutputType | null
  }

  export type JobRoleMinAggregateOutputType = {
    id: string | null
    name: string | null
    companyId: string | null
    createdAt: Date | null
  }

  export type JobRoleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    companyId: string | null
    createdAt: Date | null
  }

  export type JobRoleCountAggregateOutputType = {
    id: number
    name: number
    companyId: number
    createdAt: number
    _all: number
  }


  export type JobRoleMinAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    createdAt?: true
  }

  export type JobRoleMaxAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    createdAt?: true
  }

  export type JobRoleCountAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    createdAt?: true
    _all?: true
  }

  export type JobRoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobRole to aggregate.
     */
    where?: JobRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobRoles to fetch.
     */
    orderBy?: JobRoleOrderByWithRelationInput | JobRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobRoles
    **/
    _count?: true | JobRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobRoleMaxAggregateInputType
  }

  export type GetJobRoleAggregateType<T extends JobRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateJobRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobRole[P]>
      : GetScalarType<T[P], AggregateJobRole[P]>
  }




  export type JobRoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobRoleWhereInput
    orderBy?: JobRoleOrderByWithAggregationInput | JobRoleOrderByWithAggregationInput[]
    by: JobRoleScalarFieldEnum[] | JobRoleScalarFieldEnum
    having?: JobRoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobRoleCountAggregateInputType | true
    _min?: JobRoleMinAggregateInputType
    _max?: JobRoleMaxAggregateInputType
  }

  export type JobRoleGroupByOutputType = {
    id: string
    name: string
    companyId: string
    createdAt: Date
    _count: JobRoleCountAggregateOutputType | null
    _min: JobRoleMinAggregateOutputType | null
    _max: JobRoleMaxAggregateOutputType | null
  }

  type GetJobRoleGroupByPayload<T extends JobRoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobRoleGroupByOutputType[P]>
            : GetScalarType<T[P], JobRoleGroupByOutputType[P]>
        }
      >
    >


  export type JobRoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    companyId?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobRole"]>

  export type JobRoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    companyId?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobRole"]>

  export type JobRoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    companyId?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobRole"]>

  export type JobRoleSelectScalar = {
    id?: boolean
    name?: boolean
    companyId?: boolean
    createdAt?: boolean
  }

  export type JobRoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "companyId" | "createdAt", ExtArgs["result"]["jobRole"]>
  export type JobRoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type JobRoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type JobRoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $JobRolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobRole"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      companyId: string
      createdAt: Date
    }, ExtArgs["result"]["jobRole"]>
    composites: {}
  }

  type JobRoleGetPayload<S extends boolean | null | undefined | JobRoleDefaultArgs> = $Result.GetResult<Prisma.$JobRolePayload, S>

  type JobRoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobRoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobRoleCountAggregateInputType | true
    }

  export interface JobRoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobRole'], meta: { name: 'JobRole' } }
    /**
     * Find zero or one JobRole that matches the filter.
     * @param {JobRoleFindUniqueArgs} args - Arguments to find a JobRole
     * @example
     * // Get one JobRole
     * const jobRole = await prisma.jobRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobRoleFindUniqueArgs>(args: SelectSubset<T, JobRoleFindUniqueArgs<ExtArgs>>): Prisma__JobRoleClient<$Result.GetResult<Prisma.$JobRolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobRole that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobRoleFindUniqueOrThrowArgs} args - Arguments to find a JobRole
     * @example
     * // Get one JobRole
     * const jobRole = await prisma.jobRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobRoleFindUniqueOrThrowArgs>(args: SelectSubset<T, JobRoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobRoleClient<$Result.GetResult<Prisma.$JobRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRoleFindFirstArgs} args - Arguments to find a JobRole
     * @example
     * // Get one JobRole
     * const jobRole = await prisma.jobRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobRoleFindFirstArgs>(args?: SelectSubset<T, JobRoleFindFirstArgs<ExtArgs>>): Prisma__JobRoleClient<$Result.GetResult<Prisma.$JobRolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobRole that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRoleFindFirstOrThrowArgs} args - Arguments to find a JobRole
     * @example
     * // Get one JobRole
     * const jobRole = await prisma.jobRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobRoleFindFirstOrThrowArgs>(args?: SelectSubset<T, JobRoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobRoleClient<$Result.GetResult<Prisma.$JobRolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobRoles
     * const jobRoles = await prisma.jobRole.findMany()
     * 
     * // Get first 10 JobRoles
     * const jobRoles = await prisma.jobRole.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobRoleWithIdOnly = await prisma.jobRole.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobRoleFindManyArgs>(args?: SelectSubset<T, JobRoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobRole.
     * @param {JobRoleCreateArgs} args - Arguments to create a JobRole.
     * @example
     * // Create one JobRole
     * const JobRole = await prisma.jobRole.create({
     *   data: {
     *     // ... data to create a JobRole
     *   }
     * })
     * 
     */
    create<T extends JobRoleCreateArgs>(args: SelectSubset<T, JobRoleCreateArgs<ExtArgs>>): Prisma__JobRoleClient<$Result.GetResult<Prisma.$JobRolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobRoles.
     * @param {JobRoleCreateManyArgs} args - Arguments to create many JobRoles.
     * @example
     * // Create many JobRoles
     * const jobRole = await prisma.jobRole.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobRoleCreateManyArgs>(args?: SelectSubset<T, JobRoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobRoles and returns the data saved in the database.
     * @param {JobRoleCreateManyAndReturnArgs} args - Arguments to create many JobRoles.
     * @example
     * // Create many JobRoles
     * const jobRole = await prisma.jobRole.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobRoles and only return the `id`
     * const jobRoleWithIdOnly = await prisma.jobRole.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobRoleCreateManyAndReturnArgs>(args?: SelectSubset<T, JobRoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobRolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JobRole.
     * @param {JobRoleDeleteArgs} args - Arguments to delete one JobRole.
     * @example
     * // Delete one JobRole
     * const JobRole = await prisma.jobRole.delete({
     *   where: {
     *     // ... filter to delete one JobRole
     *   }
     * })
     * 
     */
    delete<T extends JobRoleDeleteArgs>(args: SelectSubset<T, JobRoleDeleteArgs<ExtArgs>>): Prisma__JobRoleClient<$Result.GetResult<Prisma.$JobRolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobRole.
     * @param {JobRoleUpdateArgs} args - Arguments to update one JobRole.
     * @example
     * // Update one JobRole
     * const jobRole = await prisma.jobRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobRoleUpdateArgs>(args: SelectSubset<T, JobRoleUpdateArgs<ExtArgs>>): Prisma__JobRoleClient<$Result.GetResult<Prisma.$JobRolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobRoles.
     * @param {JobRoleDeleteManyArgs} args - Arguments to filter JobRoles to delete.
     * @example
     * // Delete a few JobRoles
     * const { count } = await prisma.jobRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobRoleDeleteManyArgs>(args?: SelectSubset<T, JobRoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobRoles
     * const jobRole = await prisma.jobRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobRoleUpdateManyArgs>(args: SelectSubset<T, JobRoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobRoles and returns the data updated in the database.
     * @param {JobRoleUpdateManyAndReturnArgs} args - Arguments to update many JobRoles.
     * @example
     * // Update many JobRoles
     * const jobRole = await prisma.jobRole.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JobRoles and only return the `id`
     * const jobRoleWithIdOnly = await prisma.jobRole.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JobRoleUpdateManyAndReturnArgs>(args: SelectSubset<T, JobRoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobRolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JobRole.
     * @param {JobRoleUpsertArgs} args - Arguments to update or create a JobRole.
     * @example
     * // Update or create a JobRole
     * const jobRole = await prisma.jobRole.upsert({
     *   create: {
     *     // ... data to create a JobRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobRole we want to update
     *   }
     * })
     */
    upsert<T extends JobRoleUpsertArgs>(args: SelectSubset<T, JobRoleUpsertArgs<ExtArgs>>): Prisma__JobRoleClient<$Result.GetResult<Prisma.$JobRolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRoleCountArgs} args - Arguments to filter JobRoles to count.
     * @example
     * // Count the number of JobRoles
     * const count = await prisma.jobRole.count({
     *   where: {
     *     // ... the filter for the JobRoles we want to count
     *   }
     * })
    **/
    count<T extends JobRoleCountArgs>(
      args?: Subset<T, JobRoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobRoleAggregateArgs>(args: Subset<T, JobRoleAggregateArgs>): Prisma.PrismaPromise<GetJobRoleAggregateType<T>>

    /**
     * Group by JobRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobRoleGroupByArgs['orderBy'] }
        : { orderBy?: JobRoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobRole model
   */
  readonly fields: JobRoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobRoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobRole model
   */
  interface JobRoleFieldRefs {
    readonly id: FieldRef<"JobRole", 'String'>
    readonly name: FieldRef<"JobRole", 'String'>
    readonly companyId: FieldRef<"JobRole", 'String'>
    readonly createdAt: FieldRef<"JobRole", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobRole findUnique
   */
  export type JobRoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRole
     */
    select?: JobRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRole
     */
    omit?: JobRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRoleInclude<ExtArgs> | null
    /**
     * Filter, which JobRole to fetch.
     */
    where: JobRoleWhereUniqueInput
  }

  /**
   * JobRole findUniqueOrThrow
   */
  export type JobRoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRole
     */
    select?: JobRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRole
     */
    omit?: JobRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRoleInclude<ExtArgs> | null
    /**
     * Filter, which JobRole to fetch.
     */
    where: JobRoleWhereUniqueInput
  }

  /**
   * JobRole findFirst
   */
  export type JobRoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRole
     */
    select?: JobRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRole
     */
    omit?: JobRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRoleInclude<ExtArgs> | null
    /**
     * Filter, which JobRole to fetch.
     */
    where?: JobRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobRoles to fetch.
     */
    orderBy?: JobRoleOrderByWithRelationInput | JobRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobRoles.
     */
    cursor?: JobRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobRoles.
     */
    distinct?: JobRoleScalarFieldEnum | JobRoleScalarFieldEnum[]
  }

  /**
   * JobRole findFirstOrThrow
   */
  export type JobRoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRole
     */
    select?: JobRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRole
     */
    omit?: JobRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRoleInclude<ExtArgs> | null
    /**
     * Filter, which JobRole to fetch.
     */
    where?: JobRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobRoles to fetch.
     */
    orderBy?: JobRoleOrderByWithRelationInput | JobRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobRoles.
     */
    cursor?: JobRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobRoles.
     */
    distinct?: JobRoleScalarFieldEnum | JobRoleScalarFieldEnum[]
  }

  /**
   * JobRole findMany
   */
  export type JobRoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRole
     */
    select?: JobRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRole
     */
    omit?: JobRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRoleInclude<ExtArgs> | null
    /**
     * Filter, which JobRoles to fetch.
     */
    where?: JobRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobRoles to fetch.
     */
    orderBy?: JobRoleOrderByWithRelationInput | JobRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobRoles.
     */
    cursor?: JobRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobRoles.
     */
    distinct?: JobRoleScalarFieldEnum | JobRoleScalarFieldEnum[]
  }

  /**
   * JobRole create
   */
  export type JobRoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRole
     */
    select?: JobRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRole
     */
    omit?: JobRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRoleInclude<ExtArgs> | null
    /**
     * The data needed to create a JobRole.
     */
    data: XOR<JobRoleCreateInput, JobRoleUncheckedCreateInput>
  }

  /**
   * JobRole createMany
   */
  export type JobRoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobRoles.
     */
    data: JobRoleCreateManyInput | JobRoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobRole createManyAndReturn
   */
  export type JobRoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRole
     */
    select?: JobRoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobRole
     */
    omit?: JobRoleOmit<ExtArgs> | null
    /**
     * The data used to create many JobRoles.
     */
    data: JobRoleCreateManyInput | JobRoleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRoleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobRole update
   */
  export type JobRoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRole
     */
    select?: JobRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRole
     */
    omit?: JobRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRoleInclude<ExtArgs> | null
    /**
     * The data needed to update a JobRole.
     */
    data: XOR<JobRoleUpdateInput, JobRoleUncheckedUpdateInput>
    /**
     * Choose, which JobRole to update.
     */
    where: JobRoleWhereUniqueInput
  }

  /**
   * JobRole updateMany
   */
  export type JobRoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobRoles.
     */
    data: XOR<JobRoleUpdateManyMutationInput, JobRoleUncheckedUpdateManyInput>
    /**
     * Filter which JobRoles to update
     */
    where?: JobRoleWhereInput
    /**
     * Limit how many JobRoles to update.
     */
    limit?: number
  }

  /**
   * JobRole updateManyAndReturn
   */
  export type JobRoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRole
     */
    select?: JobRoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobRole
     */
    omit?: JobRoleOmit<ExtArgs> | null
    /**
     * The data used to update JobRoles.
     */
    data: XOR<JobRoleUpdateManyMutationInput, JobRoleUncheckedUpdateManyInput>
    /**
     * Filter which JobRoles to update
     */
    where?: JobRoleWhereInput
    /**
     * Limit how many JobRoles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRoleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobRole upsert
   */
  export type JobRoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRole
     */
    select?: JobRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRole
     */
    omit?: JobRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRoleInclude<ExtArgs> | null
    /**
     * The filter to search for the JobRole to update in case it exists.
     */
    where: JobRoleWhereUniqueInput
    /**
     * In case the JobRole found by the `where` argument doesn't exist, create a new JobRole with this data.
     */
    create: XOR<JobRoleCreateInput, JobRoleUncheckedCreateInput>
    /**
     * In case the JobRole was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobRoleUpdateInput, JobRoleUncheckedUpdateInput>
  }

  /**
   * JobRole delete
   */
  export type JobRoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRole
     */
    select?: JobRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRole
     */
    omit?: JobRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRoleInclude<ExtArgs> | null
    /**
     * Filter which JobRole to delete.
     */
    where: JobRoleWhereUniqueInput
  }

  /**
   * JobRole deleteMany
   */
  export type JobRoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobRoles to delete
     */
    where?: JobRoleWhereInput
    /**
     * Limit how many JobRoles to delete.
     */
    limit?: number
  }

  /**
   * JobRole without action
   */
  export type JobRoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRole
     */
    select?: JobRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRole
     */
    omit?: JobRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRoleInclude<ExtArgs> | null
  }


  /**
   * Model WorkBlockage
   */

  export type AggregateWorkBlockage = {
    _count: WorkBlockageCountAggregateOutputType | null
    _avg: WorkBlockageAvgAggregateOutputType | null
    _sum: WorkBlockageSumAggregateOutputType | null
    _min: WorkBlockageMinAggregateOutputType | null
    _max: WorkBlockageMaxAggregateOutputType | null
  }

  export type WorkBlockageAvgAggregateOutputType = {
    dayOfWeek: number | null
  }

  export type WorkBlockageSumAggregateOutputType = {
    dayOfWeek: number | null
  }

  export type WorkBlockageMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    type: string | null
    dayOfWeek: number | null
    date: string | null
    reason: string | null
    createdAt: Date | null
  }

  export type WorkBlockageMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    type: string | null
    dayOfWeek: number | null
    date: string | null
    reason: string | null
    createdAt: Date | null
  }

  export type WorkBlockageCountAggregateOutputType = {
    id: number
    companyId: number
    type: number
    dayOfWeek: number
    date: number
    reason: number
    createdAt: number
    _all: number
  }


  export type WorkBlockageAvgAggregateInputType = {
    dayOfWeek?: true
  }

  export type WorkBlockageSumAggregateInputType = {
    dayOfWeek?: true
  }

  export type WorkBlockageMinAggregateInputType = {
    id?: true
    companyId?: true
    type?: true
    dayOfWeek?: true
    date?: true
    reason?: true
    createdAt?: true
  }

  export type WorkBlockageMaxAggregateInputType = {
    id?: true
    companyId?: true
    type?: true
    dayOfWeek?: true
    date?: true
    reason?: true
    createdAt?: true
  }

  export type WorkBlockageCountAggregateInputType = {
    id?: true
    companyId?: true
    type?: true
    dayOfWeek?: true
    date?: true
    reason?: true
    createdAt?: true
    _all?: true
  }

  export type WorkBlockageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkBlockage to aggregate.
     */
    where?: WorkBlockageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkBlockages to fetch.
     */
    orderBy?: WorkBlockageOrderByWithRelationInput | WorkBlockageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkBlockageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkBlockages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkBlockages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkBlockages
    **/
    _count?: true | WorkBlockageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkBlockageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkBlockageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkBlockageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkBlockageMaxAggregateInputType
  }

  export type GetWorkBlockageAggregateType<T extends WorkBlockageAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkBlockage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkBlockage[P]>
      : GetScalarType<T[P], AggregateWorkBlockage[P]>
  }




  export type WorkBlockageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkBlockageWhereInput
    orderBy?: WorkBlockageOrderByWithAggregationInput | WorkBlockageOrderByWithAggregationInput[]
    by: WorkBlockageScalarFieldEnum[] | WorkBlockageScalarFieldEnum
    having?: WorkBlockageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkBlockageCountAggregateInputType | true
    _avg?: WorkBlockageAvgAggregateInputType
    _sum?: WorkBlockageSumAggregateInputType
    _min?: WorkBlockageMinAggregateInputType
    _max?: WorkBlockageMaxAggregateInputType
  }

  export type WorkBlockageGroupByOutputType = {
    id: string
    companyId: string
    type: string
    dayOfWeek: number | null
    date: string | null
    reason: string | null
    createdAt: Date
    _count: WorkBlockageCountAggregateOutputType | null
    _avg: WorkBlockageAvgAggregateOutputType | null
    _sum: WorkBlockageSumAggregateOutputType | null
    _min: WorkBlockageMinAggregateOutputType | null
    _max: WorkBlockageMaxAggregateOutputType | null
  }

  type GetWorkBlockageGroupByPayload<T extends WorkBlockageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkBlockageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkBlockageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkBlockageGroupByOutputType[P]>
            : GetScalarType<T[P], WorkBlockageGroupByOutputType[P]>
        }
      >
    >


  export type WorkBlockageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    type?: boolean
    dayOfWeek?: boolean
    date?: boolean
    reason?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workBlockage"]>

  export type WorkBlockageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    type?: boolean
    dayOfWeek?: boolean
    date?: boolean
    reason?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workBlockage"]>

  export type WorkBlockageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    type?: boolean
    dayOfWeek?: boolean
    date?: boolean
    reason?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workBlockage"]>

  export type WorkBlockageSelectScalar = {
    id?: boolean
    companyId?: boolean
    type?: boolean
    dayOfWeek?: boolean
    date?: boolean
    reason?: boolean
    createdAt?: boolean
  }

  export type WorkBlockageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "type" | "dayOfWeek" | "date" | "reason" | "createdAt", ExtArgs["result"]["workBlockage"]>
  export type WorkBlockageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type WorkBlockageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type WorkBlockageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $WorkBlockagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkBlockage"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      type: string
      dayOfWeek: number | null
      date: string | null
      reason: string | null
      createdAt: Date
    }, ExtArgs["result"]["workBlockage"]>
    composites: {}
  }

  type WorkBlockageGetPayload<S extends boolean | null | undefined | WorkBlockageDefaultArgs> = $Result.GetResult<Prisma.$WorkBlockagePayload, S>

  type WorkBlockageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkBlockageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkBlockageCountAggregateInputType | true
    }

  export interface WorkBlockageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkBlockage'], meta: { name: 'WorkBlockage' } }
    /**
     * Find zero or one WorkBlockage that matches the filter.
     * @param {WorkBlockageFindUniqueArgs} args - Arguments to find a WorkBlockage
     * @example
     * // Get one WorkBlockage
     * const workBlockage = await prisma.workBlockage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkBlockageFindUniqueArgs>(args: SelectSubset<T, WorkBlockageFindUniqueArgs<ExtArgs>>): Prisma__WorkBlockageClient<$Result.GetResult<Prisma.$WorkBlockagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkBlockage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkBlockageFindUniqueOrThrowArgs} args - Arguments to find a WorkBlockage
     * @example
     * // Get one WorkBlockage
     * const workBlockage = await prisma.workBlockage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkBlockageFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkBlockageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkBlockageClient<$Result.GetResult<Prisma.$WorkBlockagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkBlockage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkBlockageFindFirstArgs} args - Arguments to find a WorkBlockage
     * @example
     * // Get one WorkBlockage
     * const workBlockage = await prisma.workBlockage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkBlockageFindFirstArgs>(args?: SelectSubset<T, WorkBlockageFindFirstArgs<ExtArgs>>): Prisma__WorkBlockageClient<$Result.GetResult<Prisma.$WorkBlockagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkBlockage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkBlockageFindFirstOrThrowArgs} args - Arguments to find a WorkBlockage
     * @example
     * // Get one WorkBlockage
     * const workBlockage = await prisma.workBlockage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkBlockageFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkBlockageFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkBlockageClient<$Result.GetResult<Prisma.$WorkBlockagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkBlockages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkBlockageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkBlockages
     * const workBlockages = await prisma.workBlockage.findMany()
     * 
     * // Get first 10 WorkBlockages
     * const workBlockages = await prisma.workBlockage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workBlockageWithIdOnly = await prisma.workBlockage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkBlockageFindManyArgs>(args?: SelectSubset<T, WorkBlockageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkBlockagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkBlockage.
     * @param {WorkBlockageCreateArgs} args - Arguments to create a WorkBlockage.
     * @example
     * // Create one WorkBlockage
     * const WorkBlockage = await prisma.workBlockage.create({
     *   data: {
     *     // ... data to create a WorkBlockage
     *   }
     * })
     * 
     */
    create<T extends WorkBlockageCreateArgs>(args: SelectSubset<T, WorkBlockageCreateArgs<ExtArgs>>): Prisma__WorkBlockageClient<$Result.GetResult<Prisma.$WorkBlockagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkBlockages.
     * @param {WorkBlockageCreateManyArgs} args - Arguments to create many WorkBlockages.
     * @example
     * // Create many WorkBlockages
     * const workBlockage = await prisma.workBlockage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkBlockageCreateManyArgs>(args?: SelectSubset<T, WorkBlockageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkBlockages and returns the data saved in the database.
     * @param {WorkBlockageCreateManyAndReturnArgs} args - Arguments to create many WorkBlockages.
     * @example
     * // Create many WorkBlockages
     * const workBlockage = await prisma.workBlockage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkBlockages and only return the `id`
     * const workBlockageWithIdOnly = await prisma.workBlockage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkBlockageCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkBlockageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkBlockagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkBlockage.
     * @param {WorkBlockageDeleteArgs} args - Arguments to delete one WorkBlockage.
     * @example
     * // Delete one WorkBlockage
     * const WorkBlockage = await prisma.workBlockage.delete({
     *   where: {
     *     // ... filter to delete one WorkBlockage
     *   }
     * })
     * 
     */
    delete<T extends WorkBlockageDeleteArgs>(args: SelectSubset<T, WorkBlockageDeleteArgs<ExtArgs>>): Prisma__WorkBlockageClient<$Result.GetResult<Prisma.$WorkBlockagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkBlockage.
     * @param {WorkBlockageUpdateArgs} args - Arguments to update one WorkBlockage.
     * @example
     * // Update one WorkBlockage
     * const workBlockage = await prisma.workBlockage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkBlockageUpdateArgs>(args: SelectSubset<T, WorkBlockageUpdateArgs<ExtArgs>>): Prisma__WorkBlockageClient<$Result.GetResult<Prisma.$WorkBlockagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkBlockages.
     * @param {WorkBlockageDeleteManyArgs} args - Arguments to filter WorkBlockages to delete.
     * @example
     * // Delete a few WorkBlockages
     * const { count } = await prisma.workBlockage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkBlockageDeleteManyArgs>(args?: SelectSubset<T, WorkBlockageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkBlockages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkBlockageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkBlockages
     * const workBlockage = await prisma.workBlockage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkBlockageUpdateManyArgs>(args: SelectSubset<T, WorkBlockageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkBlockages and returns the data updated in the database.
     * @param {WorkBlockageUpdateManyAndReturnArgs} args - Arguments to update many WorkBlockages.
     * @example
     * // Update many WorkBlockages
     * const workBlockage = await prisma.workBlockage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkBlockages and only return the `id`
     * const workBlockageWithIdOnly = await prisma.workBlockage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkBlockageUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkBlockageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkBlockagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkBlockage.
     * @param {WorkBlockageUpsertArgs} args - Arguments to update or create a WorkBlockage.
     * @example
     * // Update or create a WorkBlockage
     * const workBlockage = await prisma.workBlockage.upsert({
     *   create: {
     *     // ... data to create a WorkBlockage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkBlockage we want to update
     *   }
     * })
     */
    upsert<T extends WorkBlockageUpsertArgs>(args: SelectSubset<T, WorkBlockageUpsertArgs<ExtArgs>>): Prisma__WorkBlockageClient<$Result.GetResult<Prisma.$WorkBlockagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkBlockages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkBlockageCountArgs} args - Arguments to filter WorkBlockages to count.
     * @example
     * // Count the number of WorkBlockages
     * const count = await prisma.workBlockage.count({
     *   where: {
     *     // ... the filter for the WorkBlockages we want to count
     *   }
     * })
    **/
    count<T extends WorkBlockageCountArgs>(
      args?: Subset<T, WorkBlockageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkBlockageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkBlockage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkBlockageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkBlockageAggregateArgs>(args: Subset<T, WorkBlockageAggregateArgs>): Prisma.PrismaPromise<GetWorkBlockageAggregateType<T>>

    /**
     * Group by WorkBlockage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkBlockageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkBlockageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkBlockageGroupByArgs['orderBy'] }
        : { orderBy?: WorkBlockageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkBlockageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkBlockageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkBlockage model
   */
  readonly fields: WorkBlockageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkBlockage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkBlockageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkBlockage model
   */
  interface WorkBlockageFieldRefs {
    readonly id: FieldRef<"WorkBlockage", 'String'>
    readonly companyId: FieldRef<"WorkBlockage", 'String'>
    readonly type: FieldRef<"WorkBlockage", 'String'>
    readonly dayOfWeek: FieldRef<"WorkBlockage", 'Int'>
    readonly date: FieldRef<"WorkBlockage", 'String'>
    readonly reason: FieldRef<"WorkBlockage", 'String'>
    readonly createdAt: FieldRef<"WorkBlockage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkBlockage findUnique
   */
  export type WorkBlockageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkBlockage
     */
    select?: WorkBlockageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkBlockage
     */
    omit?: WorkBlockageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkBlockageInclude<ExtArgs> | null
    /**
     * Filter, which WorkBlockage to fetch.
     */
    where: WorkBlockageWhereUniqueInput
  }

  /**
   * WorkBlockage findUniqueOrThrow
   */
  export type WorkBlockageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkBlockage
     */
    select?: WorkBlockageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkBlockage
     */
    omit?: WorkBlockageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkBlockageInclude<ExtArgs> | null
    /**
     * Filter, which WorkBlockage to fetch.
     */
    where: WorkBlockageWhereUniqueInput
  }

  /**
   * WorkBlockage findFirst
   */
  export type WorkBlockageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkBlockage
     */
    select?: WorkBlockageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkBlockage
     */
    omit?: WorkBlockageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkBlockageInclude<ExtArgs> | null
    /**
     * Filter, which WorkBlockage to fetch.
     */
    where?: WorkBlockageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkBlockages to fetch.
     */
    orderBy?: WorkBlockageOrderByWithRelationInput | WorkBlockageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkBlockages.
     */
    cursor?: WorkBlockageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkBlockages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkBlockages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkBlockages.
     */
    distinct?: WorkBlockageScalarFieldEnum | WorkBlockageScalarFieldEnum[]
  }

  /**
   * WorkBlockage findFirstOrThrow
   */
  export type WorkBlockageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkBlockage
     */
    select?: WorkBlockageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkBlockage
     */
    omit?: WorkBlockageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkBlockageInclude<ExtArgs> | null
    /**
     * Filter, which WorkBlockage to fetch.
     */
    where?: WorkBlockageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkBlockages to fetch.
     */
    orderBy?: WorkBlockageOrderByWithRelationInput | WorkBlockageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkBlockages.
     */
    cursor?: WorkBlockageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkBlockages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkBlockages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkBlockages.
     */
    distinct?: WorkBlockageScalarFieldEnum | WorkBlockageScalarFieldEnum[]
  }

  /**
   * WorkBlockage findMany
   */
  export type WorkBlockageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkBlockage
     */
    select?: WorkBlockageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkBlockage
     */
    omit?: WorkBlockageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkBlockageInclude<ExtArgs> | null
    /**
     * Filter, which WorkBlockages to fetch.
     */
    where?: WorkBlockageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkBlockages to fetch.
     */
    orderBy?: WorkBlockageOrderByWithRelationInput | WorkBlockageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkBlockages.
     */
    cursor?: WorkBlockageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkBlockages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkBlockages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkBlockages.
     */
    distinct?: WorkBlockageScalarFieldEnum | WorkBlockageScalarFieldEnum[]
  }

  /**
   * WorkBlockage create
   */
  export type WorkBlockageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkBlockage
     */
    select?: WorkBlockageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkBlockage
     */
    omit?: WorkBlockageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkBlockageInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkBlockage.
     */
    data: XOR<WorkBlockageCreateInput, WorkBlockageUncheckedCreateInput>
  }

  /**
   * WorkBlockage createMany
   */
  export type WorkBlockageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkBlockages.
     */
    data: WorkBlockageCreateManyInput | WorkBlockageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkBlockage createManyAndReturn
   */
  export type WorkBlockageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkBlockage
     */
    select?: WorkBlockageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkBlockage
     */
    omit?: WorkBlockageOmit<ExtArgs> | null
    /**
     * The data used to create many WorkBlockages.
     */
    data: WorkBlockageCreateManyInput | WorkBlockageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkBlockageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkBlockage update
   */
  export type WorkBlockageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkBlockage
     */
    select?: WorkBlockageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkBlockage
     */
    omit?: WorkBlockageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkBlockageInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkBlockage.
     */
    data: XOR<WorkBlockageUpdateInput, WorkBlockageUncheckedUpdateInput>
    /**
     * Choose, which WorkBlockage to update.
     */
    where: WorkBlockageWhereUniqueInput
  }

  /**
   * WorkBlockage updateMany
   */
  export type WorkBlockageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkBlockages.
     */
    data: XOR<WorkBlockageUpdateManyMutationInput, WorkBlockageUncheckedUpdateManyInput>
    /**
     * Filter which WorkBlockages to update
     */
    where?: WorkBlockageWhereInput
    /**
     * Limit how many WorkBlockages to update.
     */
    limit?: number
  }

  /**
   * WorkBlockage updateManyAndReturn
   */
  export type WorkBlockageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkBlockage
     */
    select?: WorkBlockageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkBlockage
     */
    omit?: WorkBlockageOmit<ExtArgs> | null
    /**
     * The data used to update WorkBlockages.
     */
    data: XOR<WorkBlockageUpdateManyMutationInput, WorkBlockageUncheckedUpdateManyInput>
    /**
     * Filter which WorkBlockages to update
     */
    where?: WorkBlockageWhereInput
    /**
     * Limit how many WorkBlockages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkBlockageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkBlockage upsert
   */
  export type WorkBlockageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkBlockage
     */
    select?: WorkBlockageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkBlockage
     */
    omit?: WorkBlockageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkBlockageInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkBlockage to update in case it exists.
     */
    where: WorkBlockageWhereUniqueInput
    /**
     * In case the WorkBlockage found by the `where` argument doesn't exist, create a new WorkBlockage with this data.
     */
    create: XOR<WorkBlockageCreateInput, WorkBlockageUncheckedCreateInput>
    /**
     * In case the WorkBlockage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkBlockageUpdateInput, WorkBlockageUncheckedUpdateInput>
  }

  /**
   * WorkBlockage delete
   */
  export type WorkBlockageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkBlockage
     */
    select?: WorkBlockageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkBlockage
     */
    omit?: WorkBlockageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkBlockageInclude<ExtArgs> | null
    /**
     * Filter which WorkBlockage to delete.
     */
    where: WorkBlockageWhereUniqueInput
  }

  /**
   * WorkBlockage deleteMany
   */
  export type WorkBlockageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkBlockages to delete
     */
    where?: WorkBlockageWhereInput
    /**
     * Limit how many WorkBlockages to delete.
     */
    limit?: number
  }

  /**
   * WorkBlockage without action
   */
  export type WorkBlockageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkBlockage
     */
    select?: WorkBlockageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkBlockage
     */
    omit?: WorkBlockageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkBlockageInclude<ExtArgs> | null
  }


  /**
   * Model SupportMessage
   */

  export type AggregateSupportMessage = {
    _count: SupportMessageCountAggregateOutputType | null
    _min: SupportMessageMinAggregateOutputType | null
    _max: SupportMessageMaxAggregateOutputType | null
  }

  export type SupportMessageMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    senderId: string | null
    senderName: string | null
    senderRole: string | null
    text: string | null
    createdAt: Date | null
  }

  export type SupportMessageMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    senderId: string | null
    senderName: string | null
    senderRole: string | null
    text: string | null
    createdAt: Date | null
  }

  export type SupportMessageCountAggregateOutputType = {
    id: number
    companyId: number
    senderId: number
    senderName: number
    senderRole: number
    text: number
    createdAt: number
    _all: number
  }


  export type SupportMessageMinAggregateInputType = {
    id?: true
    companyId?: true
    senderId?: true
    senderName?: true
    senderRole?: true
    text?: true
    createdAt?: true
  }

  export type SupportMessageMaxAggregateInputType = {
    id?: true
    companyId?: true
    senderId?: true
    senderName?: true
    senderRole?: true
    text?: true
    createdAt?: true
  }

  export type SupportMessageCountAggregateInputType = {
    id?: true
    companyId?: true
    senderId?: true
    senderName?: true
    senderRole?: true
    text?: true
    createdAt?: true
    _all?: true
  }

  export type SupportMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportMessage to aggregate.
     */
    where?: SupportMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessages to fetch.
     */
    orderBy?: SupportMessageOrderByWithRelationInput | SupportMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupportMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupportMessages
    **/
    _count?: true | SupportMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupportMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupportMessageMaxAggregateInputType
  }

  export type GetSupportMessageAggregateType<T extends SupportMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateSupportMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupportMessage[P]>
      : GetScalarType<T[P], AggregateSupportMessage[P]>
  }




  export type SupportMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportMessageWhereInput
    orderBy?: SupportMessageOrderByWithAggregationInput | SupportMessageOrderByWithAggregationInput[]
    by: SupportMessageScalarFieldEnum[] | SupportMessageScalarFieldEnum
    having?: SupportMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupportMessageCountAggregateInputType | true
    _min?: SupportMessageMinAggregateInputType
    _max?: SupportMessageMaxAggregateInputType
  }

  export type SupportMessageGroupByOutputType = {
    id: string
    companyId: string
    senderId: string
    senderName: string
    senderRole: string
    text: string
    createdAt: Date
    _count: SupportMessageCountAggregateOutputType | null
    _min: SupportMessageMinAggregateOutputType | null
    _max: SupportMessageMaxAggregateOutputType | null
  }

  type GetSupportMessageGroupByPayload<T extends SupportMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupportMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupportMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupportMessageGroupByOutputType[P]>
            : GetScalarType<T[P], SupportMessageGroupByOutputType[P]>
        }
      >
    >


  export type SupportMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    senderId?: boolean
    senderName?: boolean
    senderRole?: boolean
    text?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportMessage"]>

  export type SupportMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    senderId?: boolean
    senderName?: boolean
    senderRole?: boolean
    text?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportMessage"]>

  export type SupportMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    senderId?: boolean
    senderName?: boolean
    senderRole?: boolean
    text?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportMessage"]>

  export type SupportMessageSelectScalar = {
    id?: boolean
    companyId?: boolean
    senderId?: boolean
    senderName?: boolean
    senderRole?: boolean
    text?: boolean
    createdAt?: boolean
  }

  export type SupportMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "senderId" | "senderName" | "senderRole" | "text" | "createdAt", ExtArgs["result"]["supportMessage"]>
  export type SupportMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type SupportMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type SupportMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $SupportMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupportMessage"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      senderId: string
      senderName: string
      senderRole: string
      text: string
      createdAt: Date
    }, ExtArgs["result"]["supportMessage"]>
    composites: {}
  }

  type SupportMessageGetPayload<S extends boolean | null | undefined | SupportMessageDefaultArgs> = $Result.GetResult<Prisma.$SupportMessagePayload, S>

  type SupportMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupportMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupportMessageCountAggregateInputType | true
    }

  export interface SupportMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupportMessage'], meta: { name: 'SupportMessage' } }
    /**
     * Find zero or one SupportMessage that matches the filter.
     * @param {SupportMessageFindUniqueArgs} args - Arguments to find a SupportMessage
     * @example
     * // Get one SupportMessage
     * const supportMessage = await prisma.supportMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupportMessageFindUniqueArgs>(args: SelectSubset<T, SupportMessageFindUniqueArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SupportMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupportMessageFindUniqueOrThrowArgs} args - Arguments to find a SupportMessage
     * @example
     * // Get one SupportMessage
     * const supportMessage = await prisma.supportMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupportMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, SupportMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageFindFirstArgs} args - Arguments to find a SupportMessage
     * @example
     * // Get one SupportMessage
     * const supportMessage = await prisma.supportMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupportMessageFindFirstArgs>(args?: SelectSubset<T, SupportMessageFindFirstArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageFindFirstOrThrowArgs} args - Arguments to find a SupportMessage
     * @example
     * // Get one SupportMessage
     * const supportMessage = await prisma.supportMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupportMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, SupportMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SupportMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupportMessages
     * const supportMessages = await prisma.supportMessage.findMany()
     * 
     * // Get first 10 SupportMessages
     * const supportMessages = await prisma.supportMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supportMessageWithIdOnly = await prisma.supportMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupportMessageFindManyArgs>(args?: SelectSubset<T, SupportMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SupportMessage.
     * @param {SupportMessageCreateArgs} args - Arguments to create a SupportMessage.
     * @example
     * // Create one SupportMessage
     * const SupportMessage = await prisma.supportMessage.create({
     *   data: {
     *     // ... data to create a SupportMessage
     *   }
     * })
     * 
     */
    create<T extends SupportMessageCreateArgs>(args: SelectSubset<T, SupportMessageCreateArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SupportMessages.
     * @param {SupportMessageCreateManyArgs} args - Arguments to create many SupportMessages.
     * @example
     * // Create many SupportMessages
     * const supportMessage = await prisma.supportMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupportMessageCreateManyArgs>(args?: SelectSubset<T, SupportMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SupportMessages and returns the data saved in the database.
     * @param {SupportMessageCreateManyAndReturnArgs} args - Arguments to create many SupportMessages.
     * @example
     * // Create many SupportMessages
     * const supportMessage = await prisma.supportMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SupportMessages and only return the `id`
     * const supportMessageWithIdOnly = await prisma.supportMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupportMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, SupportMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SupportMessage.
     * @param {SupportMessageDeleteArgs} args - Arguments to delete one SupportMessage.
     * @example
     * // Delete one SupportMessage
     * const SupportMessage = await prisma.supportMessage.delete({
     *   where: {
     *     // ... filter to delete one SupportMessage
     *   }
     * })
     * 
     */
    delete<T extends SupportMessageDeleteArgs>(args: SelectSubset<T, SupportMessageDeleteArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SupportMessage.
     * @param {SupportMessageUpdateArgs} args - Arguments to update one SupportMessage.
     * @example
     * // Update one SupportMessage
     * const supportMessage = await prisma.supportMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupportMessageUpdateArgs>(args: SelectSubset<T, SupportMessageUpdateArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SupportMessages.
     * @param {SupportMessageDeleteManyArgs} args - Arguments to filter SupportMessages to delete.
     * @example
     * // Delete a few SupportMessages
     * const { count } = await prisma.supportMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupportMessageDeleteManyArgs>(args?: SelectSubset<T, SupportMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupportMessages
     * const supportMessage = await prisma.supportMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupportMessageUpdateManyArgs>(args: SelectSubset<T, SupportMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportMessages and returns the data updated in the database.
     * @param {SupportMessageUpdateManyAndReturnArgs} args - Arguments to update many SupportMessages.
     * @example
     * // Update many SupportMessages
     * const supportMessage = await prisma.supportMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SupportMessages and only return the `id`
     * const supportMessageWithIdOnly = await prisma.supportMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SupportMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, SupportMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SupportMessage.
     * @param {SupportMessageUpsertArgs} args - Arguments to update or create a SupportMessage.
     * @example
     * // Update or create a SupportMessage
     * const supportMessage = await prisma.supportMessage.upsert({
     *   create: {
     *     // ... data to create a SupportMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupportMessage we want to update
     *   }
     * })
     */
    upsert<T extends SupportMessageUpsertArgs>(args: SelectSubset<T, SupportMessageUpsertArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SupportMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageCountArgs} args - Arguments to filter SupportMessages to count.
     * @example
     * // Count the number of SupportMessages
     * const count = await prisma.supportMessage.count({
     *   where: {
     *     // ... the filter for the SupportMessages we want to count
     *   }
     * })
    **/
    count<T extends SupportMessageCountArgs>(
      args?: Subset<T, SupportMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupportMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupportMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupportMessageAggregateArgs>(args: Subset<T, SupportMessageAggregateArgs>): Prisma.PrismaPromise<GetSupportMessageAggregateType<T>>

    /**
     * Group by SupportMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupportMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupportMessageGroupByArgs['orderBy'] }
        : { orderBy?: SupportMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupportMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupportMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupportMessage model
   */
  readonly fields: SupportMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupportMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupportMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SupportMessage model
   */
  interface SupportMessageFieldRefs {
    readonly id: FieldRef<"SupportMessage", 'String'>
    readonly companyId: FieldRef<"SupportMessage", 'String'>
    readonly senderId: FieldRef<"SupportMessage", 'String'>
    readonly senderName: FieldRef<"SupportMessage", 'String'>
    readonly senderRole: FieldRef<"SupportMessage", 'String'>
    readonly text: FieldRef<"SupportMessage", 'String'>
    readonly createdAt: FieldRef<"SupportMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SupportMessage findUnique
   */
  export type SupportMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessage to fetch.
     */
    where: SupportMessageWhereUniqueInput
  }

  /**
   * SupportMessage findUniqueOrThrow
   */
  export type SupportMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessage to fetch.
     */
    where: SupportMessageWhereUniqueInput
  }

  /**
   * SupportMessage findFirst
   */
  export type SupportMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessage to fetch.
     */
    where?: SupportMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessages to fetch.
     */
    orderBy?: SupportMessageOrderByWithRelationInput | SupportMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportMessages.
     */
    cursor?: SupportMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportMessages.
     */
    distinct?: SupportMessageScalarFieldEnum | SupportMessageScalarFieldEnum[]
  }

  /**
   * SupportMessage findFirstOrThrow
   */
  export type SupportMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessage to fetch.
     */
    where?: SupportMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessages to fetch.
     */
    orderBy?: SupportMessageOrderByWithRelationInput | SupportMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportMessages.
     */
    cursor?: SupportMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportMessages.
     */
    distinct?: SupportMessageScalarFieldEnum | SupportMessageScalarFieldEnum[]
  }

  /**
   * SupportMessage findMany
   */
  export type SupportMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessages to fetch.
     */
    where?: SupportMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessages to fetch.
     */
    orderBy?: SupportMessageOrderByWithRelationInput | SupportMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupportMessages.
     */
    cursor?: SupportMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportMessages.
     */
    distinct?: SupportMessageScalarFieldEnum | SupportMessageScalarFieldEnum[]
  }

  /**
   * SupportMessage create
   */
  export type SupportMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a SupportMessage.
     */
    data: XOR<SupportMessageCreateInput, SupportMessageUncheckedCreateInput>
  }

  /**
   * SupportMessage createMany
   */
  export type SupportMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupportMessages.
     */
    data: SupportMessageCreateManyInput | SupportMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupportMessage createManyAndReturn
   */
  export type SupportMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * The data used to create many SupportMessages.
     */
    data: SupportMessageCreateManyInput | SupportMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SupportMessage update
   */
  export type SupportMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a SupportMessage.
     */
    data: XOR<SupportMessageUpdateInput, SupportMessageUncheckedUpdateInput>
    /**
     * Choose, which SupportMessage to update.
     */
    where: SupportMessageWhereUniqueInput
  }

  /**
   * SupportMessage updateMany
   */
  export type SupportMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupportMessages.
     */
    data: XOR<SupportMessageUpdateManyMutationInput, SupportMessageUncheckedUpdateManyInput>
    /**
     * Filter which SupportMessages to update
     */
    where?: SupportMessageWhereInput
    /**
     * Limit how many SupportMessages to update.
     */
    limit?: number
  }

  /**
   * SupportMessage updateManyAndReturn
   */
  export type SupportMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * The data used to update SupportMessages.
     */
    data: XOR<SupportMessageUpdateManyMutationInput, SupportMessageUncheckedUpdateManyInput>
    /**
     * Filter which SupportMessages to update
     */
    where?: SupportMessageWhereInput
    /**
     * Limit how many SupportMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SupportMessage upsert
   */
  export type SupportMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the SupportMessage to update in case it exists.
     */
    where: SupportMessageWhereUniqueInput
    /**
     * In case the SupportMessage found by the `where` argument doesn't exist, create a new SupportMessage with this data.
     */
    create: XOR<SupportMessageCreateInput, SupportMessageUncheckedCreateInput>
    /**
     * In case the SupportMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupportMessageUpdateInput, SupportMessageUncheckedUpdateInput>
  }

  /**
   * SupportMessage delete
   */
  export type SupportMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter which SupportMessage to delete.
     */
    where: SupportMessageWhereUniqueInput
  }

  /**
   * SupportMessage deleteMany
   */
  export type SupportMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportMessages to delete
     */
    where?: SupportMessageWhereInput
    /**
     * Limit how many SupportMessages to delete.
     */
    limit?: number
  }

  /**
   * SupportMessage without action
   */
  export type SupportMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    isPasswordTemp: 'isPasswordTemp',
    tempPassword: 'tempPassword',
    userRole: 'userRole',
    role: 'role',
    workStart: 'workStart',
    lunchStart: 'lunchStart',
    lunchEnd: 'lunchEnd',
    workEnd: 'workEnd',
    createdAt: 'createdAt',
    isActive: 'isActive',
    contractNumber: 'contractNumber',
    phone: 'phone',
    address: 'address',
    isTeamLeader: 'isTeamLeader',
    teamId: 'teamId',
    managerId: 'managerId',
    companyId: 'companyId'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const TimeRecordScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    date: 'date',
    type: 'type',
    time: 'time',
    confirmed: 'confirmed'
  };

  export type TimeRecordScalarFieldEnum = (typeof TimeRecordScalarFieldEnum)[keyof typeof TimeRecordScalarFieldEnum]


  export const TimeAdjustmentScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    date: 'date',
    type: 'type',
    time: 'time',
    justification: 'justification',
    attachment: 'attachment',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type TimeAdjustmentScalarFieldEnum = (typeof TimeAdjustmentScalarFieldEnum)[keyof typeof TimeAdjustmentScalarFieldEnum]


  export const TeamScalarFieldEnum: {
    id: 'id',
    name: 'name',
    companyId: 'companyId',
    createdAt: 'createdAt'
  };

  export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    number: 'number',
    contact: 'contact',
    country: 'country',
    document: 'document',
    corporateName: 'corporateName',
    zip: 'zip',
    street: 'street',
    city: 'city',
    state: 'state',
    email: 'email',
    subscriptionPlan: 'subscriptionPlan',
    subscriptionStatus: 'subscriptionStatus',
    subscriptionEndsAt: 'subscriptionEndsAt',
    createdAt: 'createdAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const JobRoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    companyId: 'companyId',
    createdAt: 'createdAt'
  };

  export type JobRoleScalarFieldEnum = (typeof JobRoleScalarFieldEnum)[keyof typeof JobRoleScalarFieldEnum]


  export const WorkBlockageScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    type: 'type',
    dayOfWeek: 'dayOfWeek',
    date: 'date',
    reason: 'reason',
    createdAt: 'createdAt'
  };

  export type WorkBlockageScalarFieldEnum = (typeof WorkBlockageScalarFieldEnum)[keyof typeof WorkBlockageScalarFieldEnum]


  export const SupportMessageScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    senderId: 'senderId',
    senderName: 'senderName',
    senderRole: 'senderRole',
    text: 'text',
    createdAt: 'createdAt'
  };

  export type SupportMessageScalarFieldEnum = (typeof SupportMessageScalarFieldEnum)[keyof typeof SupportMessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type EmployeeWhereInput = {
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    id?: StringFilter<"Employee"> | string
    name?: StringFilter<"Employee"> | string
    email?: StringFilter<"Employee"> | string
    password?: StringFilter<"Employee"> | string
    isPasswordTemp?: BoolFilter<"Employee"> | boolean
    tempPassword?: StringNullableFilter<"Employee"> | string | null
    userRole?: StringFilter<"Employee"> | string
    role?: StringFilter<"Employee"> | string
    workStart?: StringFilter<"Employee"> | string
    lunchStart?: StringFilter<"Employee"> | string
    lunchEnd?: StringFilter<"Employee"> | string
    workEnd?: StringFilter<"Employee"> | string
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    isActive?: BoolFilter<"Employee"> | boolean
    contractNumber?: StringNullableFilter<"Employee"> | string | null
    phone?: StringNullableFilter<"Employee"> | string | null
    address?: StringNullableFilter<"Employee"> | string | null
    isTeamLeader?: BoolFilter<"Employee"> | boolean
    teamId?: StringNullableFilter<"Employee"> | string | null
    managerId?: StringNullableFilter<"Employee"> | string | null
    companyId?: StringNullableFilter<"Employee"> | string | null
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    manager?: XOR<EmployeeNullableScalarRelationFilter, EmployeeWhereInput> | null
    subordinates?: EmployeeListRelationFilter
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    adjustments?: TimeAdjustmentListRelationFilter
    records?: TimeRecordListRelationFilter
  }

  export type EmployeeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isPasswordTemp?: SortOrder
    tempPassword?: SortOrderInput | SortOrder
    userRole?: SortOrder
    role?: SortOrder
    workStart?: SortOrder
    lunchStart?: SortOrder
    lunchEnd?: SortOrder
    workEnd?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
    contractNumber?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    isTeamLeader?: SortOrder
    teamId?: SortOrderInput | SortOrder
    managerId?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    team?: TeamOrderByWithRelationInput
    manager?: EmployeeOrderByWithRelationInput
    subordinates?: EmployeeOrderByRelationAggregateInput
    company?: CompanyOrderByWithRelationInput
    adjustments?: TimeAdjustmentOrderByRelationAggregateInput
    records?: TimeRecordOrderByRelationAggregateInput
  }

  export type EmployeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    name?: StringFilter<"Employee"> | string
    password?: StringFilter<"Employee"> | string
    isPasswordTemp?: BoolFilter<"Employee"> | boolean
    tempPassword?: StringNullableFilter<"Employee"> | string | null
    userRole?: StringFilter<"Employee"> | string
    role?: StringFilter<"Employee"> | string
    workStart?: StringFilter<"Employee"> | string
    lunchStart?: StringFilter<"Employee"> | string
    lunchEnd?: StringFilter<"Employee"> | string
    workEnd?: StringFilter<"Employee"> | string
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    isActive?: BoolFilter<"Employee"> | boolean
    contractNumber?: StringNullableFilter<"Employee"> | string | null
    phone?: StringNullableFilter<"Employee"> | string | null
    address?: StringNullableFilter<"Employee"> | string | null
    isTeamLeader?: BoolFilter<"Employee"> | boolean
    teamId?: StringNullableFilter<"Employee"> | string | null
    managerId?: StringNullableFilter<"Employee"> | string | null
    companyId?: StringNullableFilter<"Employee"> | string | null
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    manager?: XOR<EmployeeNullableScalarRelationFilter, EmployeeWhereInput> | null
    subordinates?: EmployeeListRelationFilter
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    adjustments?: TimeAdjustmentListRelationFilter
    records?: TimeRecordListRelationFilter
  }, "id" | "email">

  export type EmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isPasswordTemp?: SortOrder
    tempPassword?: SortOrderInput | SortOrder
    userRole?: SortOrder
    role?: SortOrder
    workStart?: SortOrder
    lunchStart?: SortOrder
    lunchEnd?: SortOrder
    workEnd?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
    contractNumber?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    isTeamLeader?: SortOrder
    teamId?: SortOrderInput | SortOrder
    managerId?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    OR?: EmployeeScalarWhereWithAggregatesInput[]
    NOT?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Employee"> | string
    name?: StringWithAggregatesFilter<"Employee"> | string
    email?: StringWithAggregatesFilter<"Employee"> | string
    password?: StringWithAggregatesFilter<"Employee"> | string
    isPasswordTemp?: BoolWithAggregatesFilter<"Employee"> | boolean
    tempPassword?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    userRole?: StringWithAggregatesFilter<"Employee"> | string
    role?: StringWithAggregatesFilter<"Employee"> | string
    workStart?: StringWithAggregatesFilter<"Employee"> | string
    lunchStart?: StringWithAggregatesFilter<"Employee"> | string
    lunchEnd?: StringWithAggregatesFilter<"Employee"> | string
    workEnd?: StringWithAggregatesFilter<"Employee"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Employee"> | boolean
    contractNumber?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    address?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    isTeamLeader?: BoolWithAggregatesFilter<"Employee"> | boolean
    teamId?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    managerId?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    companyId?: StringNullableWithAggregatesFilter<"Employee"> | string | null
  }

  export type TimeRecordWhereInput = {
    AND?: TimeRecordWhereInput | TimeRecordWhereInput[]
    OR?: TimeRecordWhereInput[]
    NOT?: TimeRecordWhereInput | TimeRecordWhereInput[]
    id?: StringFilter<"TimeRecord"> | string
    employeeId?: StringFilter<"TimeRecord"> | string
    date?: StringFilter<"TimeRecord"> | string
    type?: StringFilter<"TimeRecord"> | string
    time?: StringFilter<"TimeRecord"> | string
    confirmed?: BoolFilter<"TimeRecord"> | boolean
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type TimeRecordOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    time?: SortOrder
    confirmed?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type TimeRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employeeId_date_type?: TimeRecordEmployeeIdDateTypeCompoundUniqueInput
    AND?: TimeRecordWhereInput | TimeRecordWhereInput[]
    OR?: TimeRecordWhereInput[]
    NOT?: TimeRecordWhereInput | TimeRecordWhereInput[]
    employeeId?: StringFilter<"TimeRecord"> | string
    date?: StringFilter<"TimeRecord"> | string
    type?: StringFilter<"TimeRecord"> | string
    time?: StringFilter<"TimeRecord"> | string
    confirmed?: BoolFilter<"TimeRecord"> | boolean
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id" | "employeeId_date_type">

  export type TimeRecordOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    time?: SortOrder
    confirmed?: SortOrder
    _count?: TimeRecordCountOrderByAggregateInput
    _max?: TimeRecordMaxOrderByAggregateInput
    _min?: TimeRecordMinOrderByAggregateInput
  }

  export type TimeRecordScalarWhereWithAggregatesInput = {
    AND?: TimeRecordScalarWhereWithAggregatesInput | TimeRecordScalarWhereWithAggregatesInput[]
    OR?: TimeRecordScalarWhereWithAggregatesInput[]
    NOT?: TimeRecordScalarWhereWithAggregatesInput | TimeRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TimeRecord"> | string
    employeeId?: StringWithAggregatesFilter<"TimeRecord"> | string
    date?: StringWithAggregatesFilter<"TimeRecord"> | string
    type?: StringWithAggregatesFilter<"TimeRecord"> | string
    time?: StringWithAggregatesFilter<"TimeRecord"> | string
    confirmed?: BoolWithAggregatesFilter<"TimeRecord"> | boolean
  }

  export type TimeAdjustmentWhereInput = {
    AND?: TimeAdjustmentWhereInput | TimeAdjustmentWhereInput[]
    OR?: TimeAdjustmentWhereInput[]
    NOT?: TimeAdjustmentWhereInput | TimeAdjustmentWhereInput[]
    id?: StringFilter<"TimeAdjustment"> | string
    employeeId?: StringFilter<"TimeAdjustment"> | string
    date?: StringFilter<"TimeAdjustment"> | string
    type?: StringFilter<"TimeAdjustment"> | string
    time?: StringNullableFilter<"TimeAdjustment"> | string | null
    justification?: StringFilter<"TimeAdjustment"> | string
    attachment?: StringNullableFilter<"TimeAdjustment"> | string | null
    status?: StringFilter<"TimeAdjustment"> | string
    createdAt?: DateTimeFilter<"TimeAdjustment"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type TimeAdjustmentOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    time?: SortOrderInput | SortOrder
    justification?: SortOrder
    attachment?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type TimeAdjustmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TimeAdjustmentWhereInput | TimeAdjustmentWhereInput[]
    OR?: TimeAdjustmentWhereInput[]
    NOT?: TimeAdjustmentWhereInput | TimeAdjustmentWhereInput[]
    employeeId?: StringFilter<"TimeAdjustment"> | string
    date?: StringFilter<"TimeAdjustment"> | string
    type?: StringFilter<"TimeAdjustment"> | string
    time?: StringNullableFilter<"TimeAdjustment"> | string | null
    justification?: StringFilter<"TimeAdjustment"> | string
    attachment?: StringNullableFilter<"TimeAdjustment"> | string | null
    status?: StringFilter<"TimeAdjustment"> | string
    createdAt?: DateTimeFilter<"TimeAdjustment"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id">

  export type TimeAdjustmentOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    time?: SortOrderInput | SortOrder
    justification?: SortOrder
    attachment?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: TimeAdjustmentCountOrderByAggregateInput
    _max?: TimeAdjustmentMaxOrderByAggregateInput
    _min?: TimeAdjustmentMinOrderByAggregateInput
  }

  export type TimeAdjustmentScalarWhereWithAggregatesInput = {
    AND?: TimeAdjustmentScalarWhereWithAggregatesInput | TimeAdjustmentScalarWhereWithAggregatesInput[]
    OR?: TimeAdjustmentScalarWhereWithAggregatesInput[]
    NOT?: TimeAdjustmentScalarWhereWithAggregatesInput | TimeAdjustmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TimeAdjustment"> | string
    employeeId?: StringWithAggregatesFilter<"TimeAdjustment"> | string
    date?: StringWithAggregatesFilter<"TimeAdjustment"> | string
    type?: StringWithAggregatesFilter<"TimeAdjustment"> | string
    time?: StringNullableWithAggregatesFilter<"TimeAdjustment"> | string | null
    justification?: StringWithAggregatesFilter<"TimeAdjustment"> | string
    attachment?: StringNullableWithAggregatesFilter<"TimeAdjustment"> | string | null
    status?: StringWithAggregatesFilter<"TimeAdjustment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TimeAdjustment"> | Date | string
  }

  export type TeamWhereInput = {
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    id?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    companyId?: StringFilter<"Team"> | string
    createdAt?: DateTimeFilter<"Team"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    employees?: EmployeeListRelationFilter
  }

  export type TeamOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    employees?: EmployeeOrderByRelationAggregateInput
  }

  export type TeamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name_companyId?: TeamNameCompanyIdCompoundUniqueInput
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    name?: StringFilter<"Team"> | string
    companyId?: StringFilter<"Team"> | string
    createdAt?: DateTimeFilter<"Team"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    employees?: EmployeeListRelationFilter
  }, "id" | "name_companyId">

  export type TeamOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    _count?: TeamCountOrderByAggregateInput
    _max?: TeamMaxOrderByAggregateInput
    _min?: TeamMinOrderByAggregateInput
  }

  export type TeamScalarWhereWithAggregatesInput = {
    AND?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    OR?: TeamScalarWhereWithAggregatesInput[]
    NOT?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Team"> | string
    name?: StringWithAggregatesFilter<"Team"> | string
    companyId?: StringWithAggregatesFilter<"Team"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    address?: StringFilter<"Company"> | string
    number?: StringFilter<"Company"> | string
    contact?: StringFilter<"Company"> | string
    country?: StringNullableFilter<"Company"> | string | null
    document?: StringNullableFilter<"Company"> | string | null
    corporateName?: StringNullableFilter<"Company"> | string | null
    zip?: StringNullableFilter<"Company"> | string | null
    street?: StringNullableFilter<"Company"> | string | null
    city?: StringNullableFilter<"Company"> | string | null
    state?: StringNullableFilter<"Company"> | string | null
    email?: StringNullableFilter<"Company"> | string | null
    subscriptionPlan?: StringFilter<"Company"> | string
    subscriptionStatus?: StringFilter<"Company"> | string
    subscriptionEndsAt?: DateTimeNullableFilter<"Company"> | Date | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    employees?: EmployeeListRelationFilter
    teams?: TeamListRelationFilter
    jobRoles?: JobRoleListRelationFilter
    blockages?: WorkBlockageListRelationFilter
    supportMessages?: SupportMessageListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    number?: SortOrder
    contact?: SortOrder
    country?: SortOrderInput | SortOrder
    document?: SortOrderInput | SortOrder
    corporateName?: SortOrderInput | SortOrder
    zip?: SortOrderInput | SortOrder
    street?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    subscriptionPlan?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionEndsAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    employees?: EmployeeOrderByRelationAggregateInput
    teams?: TeamOrderByRelationAggregateInput
    jobRoles?: JobRoleOrderByRelationAggregateInput
    blockages?: WorkBlockageOrderByRelationAggregateInput
    supportMessages?: SupportMessageOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    address?: StringFilter<"Company"> | string
    number?: StringFilter<"Company"> | string
    contact?: StringFilter<"Company"> | string
    country?: StringNullableFilter<"Company"> | string | null
    document?: StringNullableFilter<"Company"> | string | null
    corporateName?: StringNullableFilter<"Company"> | string | null
    zip?: StringNullableFilter<"Company"> | string | null
    street?: StringNullableFilter<"Company"> | string | null
    city?: StringNullableFilter<"Company"> | string | null
    state?: StringNullableFilter<"Company"> | string | null
    email?: StringNullableFilter<"Company"> | string | null
    subscriptionPlan?: StringFilter<"Company"> | string
    subscriptionStatus?: StringFilter<"Company"> | string
    subscriptionEndsAt?: DateTimeNullableFilter<"Company"> | Date | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    employees?: EmployeeListRelationFilter
    teams?: TeamListRelationFilter
    jobRoles?: JobRoleListRelationFilter
    blockages?: WorkBlockageListRelationFilter
    supportMessages?: SupportMessageListRelationFilter
  }, "id" | "name">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    number?: SortOrder
    contact?: SortOrder
    country?: SortOrderInput | SortOrder
    document?: SortOrderInput | SortOrder
    corporateName?: SortOrderInput | SortOrder
    zip?: SortOrderInput | SortOrder
    street?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    subscriptionPlan?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionEndsAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Company"> | string
    name?: StringWithAggregatesFilter<"Company"> | string
    address?: StringWithAggregatesFilter<"Company"> | string
    number?: StringWithAggregatesFilter<"Company"> | string
    contact?: StringWithAggregatesFilter<"Company"> | string
    country?: StringNullableWithAggregatesFilter<"Company"> | string | null
    document?: StringNullableWithAggregatesFilter<"Company"> | string | null
    corporateName?: StringNullableWithAggregatesFilter<"Company"> | string | null
    zip?: StringNullableWithAggregatesFilter<"Company"> | string | null
    street?: StringNullableWithAggregatesFilter<"Company"> | string | null
    city?: StringNullableWithAggregatesFilter<"Company"> | string | null
    state?: StringNullableWithAggregatesFilter<"Company"> | string | null
    email?: StringNullableWithAggregatesFilter<"Company"> | string | null
    subscriptionPlan?: StringWithAggregatesFilter<"Company"> | string
    subscriptionStatus?: StringWithAggregatesFilter<"Company"> | string
    subscriptionEndsAt?: DateTimeNullableWithAggregatesFilter<"Company"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type JobRoleWhereInput = {
    AND?: JobRoleWhereInput | JobRoleWhereInput[]
    OR?: JobRoleWhereInput[]
    NOT?: JobRoleWhereInput | JobRoleWhereInput[]
    id?: StringFilter<"JobRole"> | string
    name?: StringFilter<"JobRole"> | string
    companyId?: StringFilter<"JobRole"> | string
    createdAt?: DateTimeFilter<"JobRole"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type JobRoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type JobRoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name_companyId?: JobRoleNameCompanyIdCompoundUniqueInput
    AND?: JobRoleWhereInput | JobRoleWhereInput[]
    OR?: JobRoleWhereInput[]
    NOT?: JobRoleWhereInput | JobRoleWhereInput[]
    name?: StringFilter<"JobRole"> | string
    companyId?: StringFilter<"JobRole"> | string
    createdAt?: DateTimeFilter<"JobRole"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id" | "name_companyId">

  export type JobRoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    _count?: JobRoleCountOrderByAggregateInput
    _max?: JobRoleMaxOrderByAggregateInput
    _min?: JobRoleMinOrderByAggregateInput
  }

  export type JobRoleScalarWhereWithAggregatesInput = {
    AND?: JobRoleScalarWhereWithAggregatesInput | JobRoleScalarWhereWithAggregatesInput[]
    OR?: JobRoleScalarWhereWithAggregatesInput[]
    NOT?: JobRoleScalarWhereWithAggregatesInput | JobRoleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobRole"> | string
    name?: StringWithAggregatesFilter<"JobRole"> | string
    companyId?: StringWithAggregatesFilter<"JobRole"> | string
    createdAt?: DateTimeWithAggregatesFilter<"JobRole"> | Date | string
  }

  export type WorkBlockageWhereInput = {
    AND?: WorkBlockageWhereInput | WorkBlockageWhereInput[]
    OR?: WorkBlockageWhereInput[]
    NOT?: WorkBlockageWhereInput | WorkBlockageWhereInput[]
    id?: StringFilter<"WorkBlockage"> | string
    companyId?: StringFilter<"WorkBlockage"> | string
    type?: StringFilter<"WorkBlockage"> | string
    dayOfWeek?: IntNullableFilter<"WorkBlockage"> | number | null
    date?: StringNullableFilter<"WorkBlockage"> | string | null
    reason?: StringNullableFilter<"WorkBlockage"> | string | null
    createdAt?: DateTimeFilter<"WorkBlockage"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type WorkBlockageOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    type?: SortOrder
    dayOfWeek?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type WorkBlockageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    companyId_dayOfWeek_date?: WorkBlockageCompanyIdDayOfWeekDateCompoundUniqueInput
    AND?: WorkBlockageWhereInput | WorkBlockageWhereInput[]
    OR?: WorkBlockageWhereInput[]
    NOT?: WorkBlockageWhereInput | WorkBlockageWhereInput[]
    companyId?: StringFilter<"WorkBlockage"> | string
    type?: StringFilter<"WorkBlockage"> | string
    dayOfWeek?: IntNullableFilter<"WorkBlockage"> | number | null
    date?: StringNullableFilter<"WorkBlockage"> | string | null
    reason?: StringNullableFilter<"WorkBlockage"> | string | null
    createdAt?: DateTimeFilter<"WorkBlockage"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id" | "companyId_dayOfWeek_date">

  export type WorkBlockageOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    type?: SortOrder
    dayOfWeek?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WorkBlockageCountOrderByAggregateInput
    _avg?: WorkBlockageAvgOrderByAggregateInput
    _max?: WorkBlockageMaxOrderByAggregateInput
    _min?: WorkBlockageMinOrderByAggregateInput
    _sum?: WorkBlockageSumOrderByAggregateInput
  }

  export type WorkBlockageScalarWhereWithAggregatesInput = {
    AND?: WorkBlockageScalarWhereWithAggregatesInput | WorkBlockageScalarWhereWithAggregatesInput[]
    OR?: WorkBlockageScalarWhereWithAggregatesInput[]
    NOT?: WorkBlockageScalarWhereWithAggregatesInput | WorkBlockageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkBlockage"> | string
    companyId?: StringWithAggregatesFilter<"WorkBlockage"> | string
    type?: StringWithAggregatesFilter<"WorkBlockage"> | string
    dayOfWeek?: IntNullableWithAggregatesFilter<"WorkBlockage"> | number | null
    date?: StringNullableWithAggregatesFilter<"WorkBlockage"> | string | null
    reason?: StringNullableWithAggregatesFilter<"WorkBlockage"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WorkBlockage"> | Date | string
  }

  export type SupportMessageWhereInput = {
    AND?: SupportMessageWhereInput | SupportMessageWhereInput[]
    OR?: SupportMessageWhereInput[]
    NOT?: SupportMessageWhereInput | SupportMessageWhereInput[]
    id?: StringFilter<"SupportMessage"> | string
    companyId?: StringFilter<"SupportMessage"> | string
    senderId?: StringFilter<"SupportMessage"> | string
    senderName?: StringFilter<"SupportMessage"> | string
    senderRole?: StringFilter<"SupportMessage"> | string
    text?: StringFilter<"SupportMessage"> | string
    createdAt?: DateTimeFilter<"SupportMessage"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type SupportMessageOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    senderId?: SortOrder
    senderName?: SortOrder
    senderRole?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type SupportMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SupportMessageWhereInput | SupportMessageWhereInput[]
    OR?: SupportMessageWhereInput[]
    NOT?: SupportMessageWhereInput | SupportMessageWhereInput[]
    companyId?: StringFilter<"SupportMessage"> | string
    senderId?: StringFilter<"SupportMessage"> | string
    senderName?: StringFilter<"SupportMessage"> | string
    senderRole?: StringFilter<"SupportMessage"> | string
    text?: StringFilter<"SupportMessage"> | string
    createdAt?: DateTimeFilter<"SupportMessage"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id">

  export type SupportMessageOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    senderId?: SortOrder
    senderName?: SortOrder
    senderRole?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    _count?: SupportMessageCountOrderByAggregateInput
    _max?: SupportMessageMaxOrderByAggregateInput
    _min?: SupportMessageMinOrderByAggregateInput
  }

  export type SupportMessageScalarWhereWithAggregatesInput = {
    AND?: SupportMessageScalarWhereWithAggregatesInput | SupportMessageScalarWhereWithAggregatesInput[]
    OR?: SupportMessageScalarWhereWithAggregatesInput[]
    NOT?: SupportMessageScalarWhereWithAggregatesInput | SupportMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SupportMessage"> | string
    companyId?: StringWithAggregatesFilter<"SupportMessage"> | string
    senderId?: StringWithAggregatesFilter<"SupportMessage"> | string
    senderName?: StringWithAggregatesFilter<"SupportMessage"> | string
    senderRole?: StringWithAggregatesFilter<"SupportMessage"> | string
    text?: StringWithAggregatesFilter<"SupportMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SupportMessage"> | Date | string
  }

  export type EmployeeCreateInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    team?: TeamCreateNestedOneWithoutEmployeesInput
    manager?: EmployeeCreateNestedOneWithoutSubordinatesInput
    subordinates?: EmployeeCreateNestedManyWithoutManagerInput
    company?: CompanyCreateNestedOneWithoutEmployeesInput
    adjustments?: TimeAdjustmentCreateNestedManyWithoutEmployeeInput
    records?: TimeRecordCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    teamId?: string | null
    managerId?: string | null
    companyId?: string | null
    subordinates?: EmployeeUncheckedCreateNestedManyWithoutManagerInput
    adjustments?: TimeAdjustmentUncheckedCreateNestedManyWithoutEmployeeInput
    records?: TimeRecordUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    team?: TeamUpdateOneWithoutEmployeesNestedInput
    manager?: EmployeeUpdateOneWithoutSubordinatesNestedInput
    subordinates?: EmployeeUpdateManyWithoutManagerNestedInput
    company?: CompanyUpdateOneWithoutEmployeesNestedInput
    adjustments?: TimeAdjustmentUpdateManyWithoutEmployeeNestedInput
    records?: TimeRecordUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    subordinates?: EmployeeUncheckedUpdateManyWithoutManagerNestedInput
    adjustments?: TimeAdjustmentUncheckedUpdateManyWithoutEmployeeNestedInput
    records?: TimeRecordUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    teamId?: string | null
    managerId?: string | null
    companyId?: string | null
  }

  export type EmployeeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmployeeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TimeRecordCreateInput = {
    id?: string
    date: string
    type: string
    time: string
    confirmed?: boolean
    employee: EmployeeCreateNestedOneWithoutRecordsInput
  }

  export type TimeRecordUncheckedCreateInput = {
    id?: string
    employeeId: string
    date: string
    type: string
    time: string
    confirmed?: boolean
  }

  export type TimeRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    employee?: EmployeeUpdateOneRequiredWithoutRecordsNestedInput
  }

  export type TimeRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    confirmed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TimeRecordCreateManyInput = {
    id?: string
    employeeId: string
    date: string
    type: string
    time: string
    confirmed?: boolean
  }

  export type TimeRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    confirmed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TimeRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    confirmed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TimeAdjustmentCreateInput = {
    id?: string
    date: string
    type: string
    time?: string | null
    justification: string
    attachment?: string | null
    status?: string
    createdAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutAdjustmentsInput
  }

  export type TimeAdjustmentUncheckedCreateInput = {
    id?: string
    employeeId: string
    date: string
    type: string
    time?: string | null
    justification: string
    attachment?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type TimeAdjustmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    time?: NullableStringFieldUpdateOperationsInput | string | null
    justification?: StringFieldUpdateOperationsInput | string
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutAdjustmentsNestedInput
  }

  export type TimeAdjustmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    time?: NullableStringFieldUpdateOperationsInput | string | null
    justification?: StringFieldUpdateOperationsInput | string
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeAdjustmentCreateManyInput = {
    id?: string
    employeeId: string
    date: string
    type: string
    time?: string | null
    justification: string
    attachment?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type TimeAdjustmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    time?: NullableStringFieldUpdateOperationsInput | string | null
    justification?: StringFieldUpdateOperationsInput | string
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeAdjustmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    time?: NullableStringFieldUpdateOperationsInput | string | null
    justification?: StringFieldUpdateOperationsInput | string
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutTeamsInput
    employees?: EmployeeCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateInput = {
    id?: string
    name: string
    companyId: string
    createdAt?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutTeamsNestedInput
    employees?: EmployeeUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamCreateManyInput = {
    id?: string
    name: string
    companyId: string
    createdAt?: Date | string
  }

  export type TeamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateInput = {
    id?: string
    name: string
    address: string
    number: string
    contact: string
    country?: string | null
    document?: string | null
    corporateName?: string | null
    zip?: string | null
    street?: string | null
    city?: string | null
    state?: string | null
    email?: string | null
    subscriptionPlan?: string
    subscriptionStatus?: string
    subscriptionEndsAt?: Date | string | null
    createdAt?: Date | string
    employees?: EmployeeCreateNestedManyWithoutCompanyInput
    teams?: TeamCreateNestedManyWithoutCompanyInput
    jobRoles?: JobRoleCreateNestedManyWithoutCompanyInput
    blockages?: WorkBlockageCreateNestedManyWithoutCompanyInput
    supportMessages?: SupportMessageCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    name: string
    address: string
    number: string
    contact: string
    country?: string | null
    document?: string | null
    corporateName?: string | null
    zip?: string | null
    street?: string | null
    city?: string | null
    state?: string | null
    email?: string | null
    subscriptionPlan?: string
    subscriptionStatus?: string
    subscriptionEndsAt?: Date | string | null
    createdAt?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutCompanyInput
    teams?: TeamUncheckedCreateNestedManyWithoutCompanyInput
    jobRoles?: JobRoleUncheckedCreateNestedManyWithoutCompanyInput
    blockages?: WorkBlockageUncheckedCreateNestedManyWithoutCompanyInput
    supportMessages?: SupportMessageUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    corporateName?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUpdateManyWithoutCompanyNestedInput
    teams?: TeamUpdateManyWithoutCompanyNestedInput
    jobRoles?: JobRoleUpdateManyWithoutCompanyNestedInput
    blockages?: WorkBlockageUpdateManyWithoutCompanyNestedInput
    supportMessages?: SupportMessageUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    corporateName?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutCompanyNestedInput
    teams?: TeamUncheckedUpdateManyWithoutCompanyNestedInput
    jobRoles?: JobRoleUncheckedUpdateManyWithoutCompanyNestedInput
    blockages?: WorkBlockageUncheckedUpdateManyWithoutCompanyNestedInput
    supportMessages?: SupportMessageUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    name: string
    address: string
    number: string
    contact: string
    country?: string | null
    document?: string | null
    corporateName?: string | null
    zip?: string | null
    street?: string | null
    city?: string | null
    state?: string | null
    email?: string | null
    subscriptionPlan?: string
    subscriptionStatus?: string
    subscriptionEndsAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    corporateName?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    corporateName?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobRoleCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobRolesInput
  }

  export type JobRoleUncheckedCreateInput = {
    id?: string
    name: string
    companyId: string
    createdAt?: Date | string
  }

  export type JobRoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobRolesNestedInput
  }

  export type JobRoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobRoleCreateManyInput = {
    id?: string
    name: string
    companyId: string
    createdAt?: Date | string
  }

  export type JobRoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobRoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkBlockageCreateInput = {
    id?: string
    type: string
    dayOfWeek?: number | null
    date?: string | null
    reason?: string | null
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutBlockagesInput
  }

  export type WorkBlockageUncheckedCreateInput = {
    id?: string
    companyId: string
    type: string
    dayOfWeek?: number | null
    date?: string | null
    reason?: string | null
    createdAt?: Date | string
  }

  export type WorkBlockageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutBlockagesNestedInput
  }

  export type WorkBlockageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkBlockageCreateManyInput = {
    id?: string
    companyId: string
    type: string
    dayOfWeek?: number | null
    date?: string | null
    reason?: string | null
    createdAt?: Date | string
  }

  export type WorkBlockageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkBlockageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportMessageCreateInput = {
    id?: string
    senderId: string
    senderName: string
    senderRole: string
    text: string
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutSupportMessagesInput
  }

  export type SupportMessageUncheckedCreateInput = {
    id?: string
    companyId: string
    senderId: string
    senderName: string
    senderRole: string
    text: string
    createdAt?: Date | string
  }

  export type SupportMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    senderRole?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutSupportMessagesNestedInput
  }

  export type SupportMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    senderRole?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportMessageCreateManyInput = {
    id?: string
    companyId: string
    senderId: string
    senderName: string
    senderRole: string
    text: string
    createdAt?: Date | string
  }

  export type SupportMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    senderRole?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    senderRole?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TeamNullableScalarRelationFilter = {
    is?: TeamWhereInput | null
    isNot?: TeamWhereInput | null
  }

  export type EmployeeNullableScalarRelationFilter = {
    is?: EmployeeWhereInput | null
    isNot?: EmployeeWhereInput | null
  }

  export type EmployeeListRelationFilter = {
    every?: EmployeeWhereInput
    some?: EmployeeWhereInput
    none?: EmployeeWhereInput
  }

  export type CompanyNullableScalarRelationFilter = {
    is?: CompanyWhereInput | null
    isNot?: CompanyWhereInput | null
  }

  export type TimeAdjustmentListRelationFilter = {
    every?: TimeAdjustmentWhereInput
    some?: TimeAdjustmentWhereInput
    none?: TimeAdjustmentWhereInput
  }

  export type TimeRecordListRelationFilter = {
    every?: TimeRecordWhereInput
    some?: TimeRecordWhereInput
    none?: TimeRecordWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EmployeeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TimeAdjustmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TimeRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isPasswordTemp?: SortOrder
    tempPassword?: SortOrder
    userRole?: SortOrder
    role?: SortOrder
    workStart?: SortOrder
    lunchStart?: SortOrder
    lunchEnd?: SortOrder
    workEnd?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
    contractNumber?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    isTeamLeader?: SortOrder
    teamId?: SortOrder
    managerId?: SortOrder
    companyId?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isPasswordTemp?: SortOrder
    tempPassword?: SortOrder
    userRole?: SortOrder
    role?: SortOrder
    workStart?: SortOrder
    lunchStart?: SortOrder
    lunchEnd?: SortOrder
    workEnd?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
    contractNumber?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    isTeamLeader?: SortOrder
    teamId?: SortOrder
    managerId?: SortOrder
    companyId?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isPasswordTemp?: SortOrder
    tempPassword?: SortOrder
    userRole?: SortOrder
    role?: SortOrder
    workStart?: SortOrder
    lunchStart?: SortOrder
    lunchEnd?: SortOrder
    workEnd?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
    contractNumber?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    isTeamLeader?: SortOrder
    teamId?: SortOrder
    managerId?: SortOrder
    companyId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EmployeeScalarRelationFilter = {
    is?: EmployeeWhereInput
    isNot?: EmployeeWhereInput
  }

  export type TimeRecordEmployeeIdDateTypeCompoundUniqueInput = {
    employeeId: string
    date: string
    type: string
  }

  export type TimeRecordCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    time?: SortOrder
    confirmed?: SortOrder
  }

  export type TimeRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    time?: SortOrder
    confirmed?: SortOrder
  }

  export type TimeRecordMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    time?: SortOrder
    confirmed?: SortOrder
  }

  export type TimeAdjustmentCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    time?: SortOrder
    justification?: SortOrder
    attachment?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TimeAdjustmentMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    time?: SortOrder
    justification?: SortOrder
    attachment?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TimeAdjustmentMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    type?: SortOrder
    time?: SortOrder
    justification?: SortOrder
    attachment?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type TeamNameCompanyIdCompoundUniqueInput = {
    name: string
    companyId: string
  }

  export type TeamCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TeamListRelationFilter = {
    every?: TeamWhereInput
    some?: TeamWhereInput
    none?: TeamWhereInput
  }

  export type JobRoleListRelationFilter = {
    every?: JobRoleWhereInput
    some?: JobRoleWhereInput
    none?: JobRoleWhereInput
  }

  export type WorkBlockageListRelationFilter = {
    every?: WorkBlockageWhereInput
    some?: WorkBlockageWhereInput
    none?: WorkBlockageWhereInput
  }

  export type SupportMessageListRelationFilter = {
    every?: SupportMessageWhereInput
    some?: SupportMessageWhereInput
    none?: SupportMessageWhereInput
  }

  export type TeamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobRoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkBlockageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SupportMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    number?: SortOrder
    contact?: SortOrder
    country?: SortOrder
    document?: SortOrder
    corporateName?: SortOrder
    zip?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    email?: SortOrder
    subscriptionPlan?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionEndsAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    number?: SortOrder
    contact?: SortOrder
    country?: SortOrder
    document?: SortOrder
    corporateName?: SortOrder
    zip?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    email?: SortOrder
    subscriptionPlan?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionEndsAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    number?: SortOrder
    contact?: SortOrder
    country?: SortOrder
    document?: SortOrder
    corporateName?: SortOrder
    zip?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    email?: SortOrder
    subscriptionPlan?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionEndsAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type JobRoleNameCompanyIdCompoundUniqueInput = {
    name: string
    companyId: string
  }

  export type JobRoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
  }

  export type JobRoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
  }

  export type JobRoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type WorkBlockageCompanyIdDayOfWeekDateCompoundUniqueInput = {
    companyId: string
    dayOfWeek: number
    date: string
  }

  export type WorkBlockageCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    type?: SortOrder
    dayOfWeek?: SortOrder
    date?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkBlockageAvgOrderByAggregateInput = {
    dayOfWeek?: SortOrder
  }

  export type WorkBlockageMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    type?: SortOrder
    dayOfWeek?: SortOrder
    date?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkBlockageMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    type?: SortOrder
    dayOfWeek?: SortOrder
    date?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkBlockageSumOrderByAggregateInput = {
    dayOfWeek?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SupportMessageCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    senderId?: SortOrder
    senderName?: SortOrder
    senderRole?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
  }

  export type SupportMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    senderId?: SortOrder
    senderName?: SortOrder
    senderRole?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
  }

  export type SupportMessageMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    senderId?: SortOrder
    senderName?: SortOrder
    senderRole?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamCreateNestedOneWithoutEmployeesInput = {
    create?: XOR<TeamCreateWithoutEmployeesInput, TeamUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: TeamCreateOrConnectWithoutEmployeesInput
    connect?: TeamWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutSubordinatesInput = {
    create?: XOR<EmployeeCreateWithoutSubordinatesInput, EmployeeUncheckedCreateWithoutSubordinatesInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutSubordinatesInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeCreateNestedManyWithoutManagerInput = {
    create?: XOR<EmployeeCreateWithoutManagerInput, EmployeeUncheckedCreateWithoutManagerInput> | EmployeeCreateWithoutManagerInput[] | EmployeeUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutManagerInput | EmployeeCreateOrConnectWithoutManagerInput[]
    createMany?: EmployeeCreateManyManagerInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type CompanyCreateNestedOneWithoutEmployeesInput = {
    create?: XOR<CompanyCreateWithoutEmployeesInput, CompanyUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutEmployeesInput
    connect?: CompanyWhereUniqueInput
  }

  export type TimeAdjustmentCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<TimeAdjustmentCreateWithoutEmployeeInput, TimeAdjustmentUncheckedCreateWithoutEmployeeInput> | TimeAdjustmentCreateWithoutEmployeeInput[] | TimeAdjustmentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TimeAdjustmentCreateOrConnectWithoutEmployeeInput | TimeAdjustmentCreateOrConnectWithoutEmployeeInput[]
    createMany?: TimeAdjustmentCreateManyEmployeeInputEnvelope
    connect?: TimeAdjustmentWhereUniqueInput | TimeAdjustmentWhereUniqueInput[]
  }

  export type TimeRecordCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<TimeRecordCreateWithoutEmployeeInput, TimeRecordUncheckedCreateWithoutEmployeeInput> | TimeRecordCreateWithoutEmployeeInput[] | TimeRecordUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TimeRecordCreateOrConnectWithoutEmployeeInput | TimeRecordCreateOrConnectWithoutEmployeeInput[]
    createMany?: TimeRecordCreateManyEmployeeInputEnvelope
    connect?: TimeRecordWhereUniqueInput | TimeRecordWhereUniqueInput[]
  }

  export type EmployeeUncheckedCreateNestedManyWithoutManagerInput = {
    create?: XOR<EmployeeCreateWithoutManagerInput, EmployeeUncheckedCreateWithoutManagerInput> | EmployeeCreateWithoutManagerInput[] | EmployeeUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutManagerInput | EmployeeCreateOrConnectWithoutManagerInput[]
    createMany?: EmployeeCreateManyManagerInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type TimeAdjustmentUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<TimeAdjustmentCreateWithoutEmployeeInput, TimeAdjustmentUncheckedCreateWithoutEmployeeInput> | TimeAdjustmentCreateWithoutEmployeeInput[] | TimeAdjustmentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TimeAdjustmentCreateOrConnectWithoutEmployeeInput | TimeAdjustmentCreateOrConnectWithoutEmployeeInput[]
    createMany?: TimeAdjustmentCreateManyEmployeeInputEnvelope
    connect?: TimeAdjustmentWhereUniqueInput | TimeAdjustmentWhereUniqueInput[]
  }

  export type TimeRecordUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<TimeRecordCreateWithoutEmployeeInput, TimeRecordUncheckedCreateWithoutEmployeeInput> | TimeRecordCreateWithoutEmployeeInput[] | TimeRecordUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TimeRecordCreateOrConnectWithoutEmployeeInput | TimeRecordCreateOrConnectWithoutEmployeeInput[]
    createMany?: TimeRecordCreateManyEmployeeInputEnvelope
    connect?: TimeRecordWhereUniqueInput | TimeRecordWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TeamUpdateOneWithoutEmployeesNestedInput = {
    create?: XOR<TeamCreateWithoutEmployeesInput, TeamUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: TeamCreateOrConnectWithoutEmployeesInput
    upsert?: TeamUpsertWithoutEmployeesInput
    disconnect?: TeamWhereInput | boolean
    delete?: TeamWhereInput | boolean
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutEmployeesInput, TeamUpdateWithoutEmployeesInput>, TeamUncheckedUpdateWithoutEmployeesInput>
  }

  export type EmployeeUpdateOneWithoutSubordinatesNestedInput = {
    create?: XOR<EmployeeCreateWithoutSubordinatesInput, EmployeeUncheckedCreateWithoutSubordinatesInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutSubordinatesInput
    upsert?: EmployeeUpsertWithoutSubordinatesInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutSubordinatesInput, EmployeeUpdateWithoutSubordinatesInput>, EmployeeUncheckedUpdateWithoutSubordinatesInput>
  }

  export type EmployeeUpdateManyWithoutManagerNestedInput = {
    create?: XOR<EmployeeCreateWithoutManagerInput, EmployeeUncheckedCreateWithoutManagerInput> | EmployeeCreateWithoutManagerInput[] | EmployeeUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutManagerInput | EmployeeCreateOrConnectWithoutManagerInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutManagerInput | EmployeeUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: EmployeeCreateManyManagerInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutManagerInput | EmployeeUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutManagerInput | EmployeeUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type CompanyUpdateOneWithoutEmployeesNestedInput = {
    create?: XOR<CompanyCreateWithoutEmployeesInput, CompanyUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutEmployeesInput
    upsert?: CompanyUpsertWithoutEmployeesInput
    disconnect?: CompanyWhereInput | boolean
    delete?: CompanyWhereInput | boolean
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutEmployeesInput, CompanyUpdateWithoutEmployeesInput>, CompanyUncheckedUpdateWithoutEmployeesInput>
  }

  export type TimeAdjustmentUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<TimeAdjustmentCreateWithoutEmployeeInput, TimeAdjustmentUncheckedCreateWithoutEmployeeInput> | TimeAdjustmentCreateWithoutEmployeeInput[] | TimeAdjustmentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TimeAdjustmentCreateOrConnectWithoutEmployeeInput | TimeAdjustmentCreateOrConnectWithoutEmployeeInput[]
    upsert?: TimeAdjustmentUpsertWithWhereUniqueWithoutEmployeeInput | TimeAdjustmentUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: TimeAdjustmentCreateManyEmployeeInputEnvelope
    set?: TimeAdjustmentWhereUniqueInput | TimeAdjustmentWhereUniqueInput[]
    disconnect?: TimeAdjustmentWhereUniqueInput | TimeAdjustmentWhereUniqueInput[]
    delete?: TimeAdjustmentWhereUniqueInput | TimeAdjustmentWhereUniqueInput[]
    connect?: TimeAdjustmentWhereUniqueInput | TimeAdjustmentWhereUniqueInput[]
    update?: TimeAdjustmentUpdateWithWhereUniqueWithoutEmployeeInput | TimeAdjustmentUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: TimeAdjustmentUpdateManyWithWhereWithoutEmployeeInput | TimeAdjustmentUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: TimeAdjustmentScalarWhereInput | TimeAdjustmentScalarWhereInput[]
  }

  export type TimeRecordUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<TimeRecordCreateWithoutEmployeeInput, TimeRecordUncheckedCreateWithoutEmployeeInput> | TimeRecordCreateWithoutEmployeeInput[] | TimeRecordUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TimeRecordCreateOrConnectWithoutEmployeeInput | TimeRecordCreateOrConnectWithoutEmployeeInput[]
    upsert?: TimeRecordUpsertWithWhereUniqueWithoutEmployeeInput | TimeRecordUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: TimeRecordCreateManyEmployeeInputEnvelope
    set?: TimeRecordWhereUniqueInput | TimeRecordWhereUniqueInput[]
    disconnect?: TimeRecordWhereUniqueInput | TimeRecordWhereUniqueInput[]
    delete?: TimeRecordWhereUniqueInput | TimeRecordWhereUniqueInput[]
    connect?: TimeRecordWhereUniqueInput | TimeRecordWhereUniqueInput[]
    update?: TimeRecordUpdateWithWhereUniqueWithoutEmployeeInput | TimeRecordUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: TimeRecordUpdateManyWithWhereWithoutEmployeeInput | TimeRecordUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: TimeRecordScalarWhereInput | TimeRecordScalarWhereInput[]
  }

  export type EmployeeUncheckedUpdateManyWithoutManagerNestedInput = {
    create?: XOR<EmployeeCreateWithoutManagerInput, EmployeeUncheckedCreateWithoutManagerInput> | EmployeeCreateWithoutManagerInput[] | EmployeeUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutManagerInput | EmployeeCreateOrConnectWithoutManagerInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutManagerInput | EmployeeUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: EmployeeCreateManyManagerInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutManagerInput | EmployeeUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutManagerInput | EmployeeUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type TimeAdjustmentUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<TimeAdjustmentCreateWithoutEmployeeInput, TimeAdjustmentUncheckedCreateWithoutEmployeeInput> | TimeAdjustmentCreateWithoutEmployeeInput[] | TimeAdjustmentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TimeAdjustmentCreateOrConnectWithoutEmployeeInput | TimeAdjustmentCreateOrConnectWithoutEmployeeInput[]
    upsert?: TimeAdjustmentUpsertWithWhereUniqueWithoutEmployeeInput | TimeAdjustmentUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: TimeAdjustmentCreateManyEmployeeInputEnvelope
    set?: TimeAdjustmentWhereUniqueInput | TimeAdjustmentWhereUniqueInput[]
    disconnect?: TimeAdjustmentWhereUniqueInput | TimeAdjustmentWhereUniqueInput[]
    delete?: TimeAdjustmentWhereUniqueInput | TimeAdjustmentWhereUniqueInput[]
    connect?: TimeAdjustmentWhereUniqueInput | TimeAdjustmentWhereUniqueInput[]
    update?: TimeAdjustmentUpdateWithWhereUniqueWithoutEmployeeInput | TimeAdjustmentUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: TimeAdjustmentUpdateManyWithWhereWithoutEmployeeInput | TimeAdjustmentUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: TimeAdjustmentScalarWhereInput | TimeAdjustmentScalarWhereInput[]
  }

  export type TimeRecordUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<TimeRecordCreateWithoutEmployeeInput, TimeRecordUncheckedCreateWithoutEmployeeInput> | TimeRecordCreateWithoutEmployeeInput[] | TimeRecordUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TimeRecordCreateOrConnectWithoutEmployeeInput | TimeRecordCreateOrConnectWithoutEmployeeInput[]
    upsert?: TimeRecordUpsertWithWhereUniqueWithoutEmployeeInput | TimeRecordUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: TimeRecordCreateManyEmployeeInputEnvelope
    set?: TimeRecordWhereUniqueInput | TimeRecordWhereUniqueInput[]
    disconnect?: TimeRecordWhereUniqueInput | TimeRecordWhereUniqueInput[]
    delete?: TimeRecordWhereUniqueInput | TimeRecordWhereUniqueInput[]
    connect?: TimeRecordWhereUniqueInput | TimeRecordWhereUniqueInput[]
    update?: TimeRecordUpdateWithWhereUniqueWithoutEmployeeInput | TimeRecordUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: TimeRecordUpdateManyWithWhereWithoutEmployeeInput | TimeRecordUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: TimeRecordScalarWhereInput | TimeRecordScalarWhereInput[]
  }

  export type EmployeeCreateNestedOneWithoutRecordsInput = {
    create?: XOR<EmployeeCreateWithoutRecordsInput, EmployeeUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutRecordsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutRecordsNestedInput = {
    create?: XOR<EmployeeCreateWithoutRecordsInput, EmployeeUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutRecordsInput
    upsert?: EmployeeUpsertWithoutRecordsInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutRecordsInput, EmployeeUpdateWithoutRecordsInput>, EmployeeUncheckedUpdateWithoutRecordsInput>
  }

  export type EmployeeCreateNestedOneWithoutAdjustmentsInput = {
    create?: XOR<EmployeeCreateWithoutAdjustmentsInput, EmployeeUncheckedCreateWithoutAdjustmentsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAdjustmentsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutAdjustmentsNestedInput = {
    create?: XOR<EmployeeCreateWithoutAdjustmentsInput, EmployeeUncheckedCreateWithoutAdjustmentsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAdjustmentsInput
    upsert?: EmployeeUpsertWithoutAdjustmentsInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutAdjustmentsInput, EmployeeUpdateWithoutAdjustmentsInput>, EmployeeUncheckedUpdateWithoutAdjustmentsInput>
  }

  export type CompanyCreateNestedOneWithoutTeamsInput = {
    create?: XOR<CompanyCreateWithoutTeamsInput, CompanyUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutTeamsInput
    connect?: CompanyWhereUniqueInput
  }

  export type EmployeeCreateNestedManyWithoutTeamInput = {
    create?: XOR<EmployeeCreateWithoutTeamInput, EmployeeUncheckedCreateWithoutTeamInput> | EmployeeCreateWithoutTeamInput[] | EmployeeUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutTeamInput | EmployeeCreateOrConnectWithoutTeamInput[]
    createMany?: EmployeeCreateManyTeamInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type EmployeeUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<EmployeeCreateWithoutTeamInput, EmployeeUncheckedCreateWithoutTeamInput> | EmployeeCreateWithoutTeamInput[] | EmployeeUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutTeamInput | EmployeeCreateOrConnectWithoutTeamInput[]
    createMany?: EmployeeCreateManyTeamInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type CompanyUpdateOneRequiredWithoutTeamsNestedInput = {
    create?: XOR<CompanyCreateWithoutTeamsInput, CompanyUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutTeamsInput
    upsert?: CompanyUpsertWithoutTeamsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutTeamsInput, CompanyUpdateWithoutTeamsInput>, CompanyUncheckedUpdateWithoutTeamsInput>
  }

  export type EmployeeUpdateManyWithoutTeamNestedInput = {
    create?: XOR<EmployeeCreateWithoutTeamInput, EmployeeUncheckedCreateWithoutTeamInput> | EmployeeCreateWithoutTeamInput[] | EmployeeUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutTeamInput | EmployeeCreateOrConnectWithoutTeamInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutTeamInput | EmployeeUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: EmployeeCreateManyTeamInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutTeamInput | EmployeeUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutTeamInput | EmployeeUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type EmployeeUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<EmployeeCreateWithoutTeamInput, EmployeeUncheckedCreateWithoutTeamInput> | EmployeeCreateWithoutTeamInput[] | EmployeeUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutTeamInput | EmployeeCreateOrConnectWithoutTeamInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutTeamInput | EmployeeUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: EmployeeCreateManyTeamInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutTeamInput | EmployeeUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutTeamInput | EmployeeUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type EmployeeCreateNestedManyWithoutCompanyInput = {
    create?: XOR<EmployeeCreateWithoutCompanyInput, EmployeeUncheckedCreateWithoutCompanyInput> | EmployeeCreateWithoutCompanyInput[] | EmployeeUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutCompanyInput | EmployeeCreateOrConnectWithoutCompanyInput[]
    createMany?: EmployeeCreateManyCompanyInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type TeamCreateNestedManyWithoutCompanyInput = {
    create?: XOR<TeamCreateWithoutCompanyInput, TeamUncheckedCreateWithoutCompanyInput> | TeamCreateWithoutCompanyInput[] | TeamUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCompanyInput | TeamCreateOrConnectWithoutCompanyInput[]
    createMany?: TeamCreateManyCompanyInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type JobRoleCreateNestedManyWithoutCompanyInput = {
    create?: XOR<JobRoleCreateWithoutCompanyInput, JobRoleUncheckedCreateWithoutCompanyInput> | JobRoleCreateWithoutCompanyInput[] | JobRoleUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobRoleCreateOrConnectWithoutCompanyInput | JobRoleCreateOrConnectWithoutCompanyInput[]
    createMany?: JobRoleCreateManyCompanyInputEnvelope
    connect?: JobRoleWhereUniqueInput | JobRoleWhereUniqueInput[]
  }

  export type WorkBlockageCreateNestedManyWithoutCompanyInput = {
    create?: XOR<WorkBlockageCreateWithoutCompanyInput, WorkBlockageUncheckedCreateWithoutCompanyInput> | WorkBlockageCreateWithoutCompanyInput[] | WorkBlockageUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WorkBlockageCreateOrConnectWithoutCompanyInput | WorkBlockageCreateOrConnectWithoutCompanyInput[]
    createMany?: WorkBlockageCreateManyCompanyInputEnvelope
    connect?: WorkBlockageWhereUniqueInput | WorkBlockageWhereUniqueInput[]
  }

  export type SupportMessageCreateNestedManyWithoutCompanyInput = {
    create?: XOR<SupportMessageCreateWithoutCompanyInput, SupportMessageUncheckedCreateWithoutCompanyInput> | SupportMessageCreateWithoutCompanyInput[] | SupportMessageUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: SupportMessageCreateOrConnectWithoutCompanyInput | SupportMessageCreateOrConnectWithoutCompanyInput[]
    createMany?: SupportMessageCreateManyCompanyInputEnvelope
    connect?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
  }

  export type EmployeeUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<EmployeeCreateWithoutCompanyInput, EmployeeUncheckedCreateWithoutCompanyInput> | EmployeeCreateWithoutCompanyInput[] | EmployeeUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutCompanyInput | EmployeeCreateOrConnectWithoutCompanyInput[]
    createMany?: EmployeeCreateManyCompanyInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type TeamUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<TeamCreateWithoutCompanyInput, TeamUncheckedCreateWithoutCompanyInput> | TeamCreateWithoutCompanyInput[] | TeamUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCompanyInput | TeamCreateOrConnectWithoutCompanyInput[]
    createMany?: TeamCreateManyCompanyInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type JobRoleUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<JobRoleCreateWithoutCompanyInput, JobRoleUncheckedCreateWithoutCompanyInput> | JobRoleCreateWithoutCompanyInput[] | JobRoleUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobRoleCreateOrConnectWithoutCompanyInput | JobRoleCreateOrConnectWithoutCompanyInput[]
    createMany?: JobRoleCreateManyCompanyInputEnvelope
    connect?: JobRoleWhereUniqueInput | JobRoleWhereUniqueInput[]
  }

  export type WorkBlockageUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<WorkBlockageCreateWithoutCompanyInput, WorkBlockageUncheckedCreateWithoutCompanyInput> | WorkBlockageCreateWithoutCompanyInput[] | WorkBlockageUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WorkBlockageCreateOrConnectWithoutCompanyInput | WorkBlockageCreateOrConnectWithoutCompanyInput[]
    createMany?: WorkBlockageCreateManyCompanyInputEnvelope
    connect?: WorkBlockageWhereUniqueInput | WorkBlockageWhereUniqueInput[]
  }

  export type SupportMessageUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<SupportMessageCreateWithoutCompanyInput, SupportMessageUncheckedCreateWithoutCompanyInput> | SupportMessageCreateWithoutCompanyInput[] | SupportMessageUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: SupportMessageCreateOrConnectWithoutCompanyInput | SupportMessageCreateOrConnectWithoutCompanyInput[]
    createMany?: SupportMessageCreateManyCompanyInputEnvelope
    connect?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EmployeeUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<EmployeeCreateWithoutCompanyInput, EmployeeUncheckedCreateWithoutCompanyInput> | EmployeeCreateWithoutCompanyInput[] | EmployeeUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutCompanyInput | EmployeeCreateOrConnectWithoutCompanyInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutCompanyInput | EmployeeUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: EmployeeCreateManyCompanyInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutCompanyInput | EmployeeUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutCompanyInput | EmployeeUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type TeamUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<TeamCreateWithoutCompanyInput, TeamUncheckedCreateWithoutCompanyInput> | TeamCreateWithoutCompanyInput[] | TeamUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCompanyInput | TeamCreateOrConnectWithoutCompanyInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutCompanyInput | TeamUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: TeamCreateManyCompanyInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutCompanyInput | TeamUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutCompanyInput | TeamUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type JobRoleUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<JobRoleCreateWithoutCompanyInput, JobRoleUncheckedCreateWithoutCompanyInput> | JobRoleCreateWithoutCompanyInput[] | JobRoleUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobRoleCreateOrConnectWithoutCompanyInput | JobRoleCreateOrConnectWithoutCompanyInput[]
    upsert?: JobRoleUpsertWithWhereUniqueWithoutCompanyInput | JobRoleUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: JobRoleCreateManyCompanyInputEnvelope
    set?: JobRoleWhereUniqueInput | JobRoleWhereUniqueInput[]
    disconnect?: JobRoleWhereUniqueInput | JobRoleWhereUniqueInput[]
    delete?: JobRoleWhereUniqueInput | JobRoleWhereUniqueInput[]
    connect?: JobRoleWhereUniqueInput | JobRoleWhereUniqueInput[]
    update?: JobRoleUpdateWithWhereUniqueWithoutCompanyInput | JobRoleUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: JobRoleUpdateManyWithWhereWithoutCompanyInput | JobRoleUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: JobRoleScalarWhereInput | JobRoleScalarWhereInput[]
  }

  export type WorkBlockageUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<WorkBlockageCreateWithoutCompanyInput, WorkBlockageUncheckedCreateWithoutCompanyInput> | WorkBlockageCreateWithoutCompanyInput[] | WorkBlockageUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WorkBlockageCreateOrConnectWithoutCompanyInput | WorkBlockageCreateOrConnectWithoutCompanyInput[]
    upsert?: WorkBlockageUpsertWithWhereUniqueWithoutCompanyInput | WorkBlockageUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: WorkBlockageCreateManyCompanyInputEnvelope
    set?: WorkBlockageWhereUniqueInput | WorkBlockageWhereUniqueInput[]
    disconnect?: WorkBlockageWhereUniqueInput | WorkBlockageWhereUniqueInput[]
    delete?: WorkBlockageWhereUniqueInput | WorkBlockageWhereUniqueInput[]
    connect?: WorkBlockageWhereUniqueInput | WorkBlockageWhereUniqueInput[]
    update?: WorkBlockageUpdateWithWhereUniqueWithoutCompanyInput | WorkBlockageUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: WorkBlockageUpdateManyWithWhereWithoutCompanyInput | WorkBlockageUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: WorkBlockageScalarWhereInput | WorkBlockageScalarWhereInput[]
  }

  export type SupportMessageUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<SupportMessageCreateWithoutCompanyInput, SupportMessageUncheckedCreateWithoutCompanyInput> | SupportMessageCreateWithoutCompanyInput[] | SupportMessageUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: SupportMessageCreateOrConnectWithoutCompanyInput | SupportMessageCreateOrConnectWithoutCompanyInput[]
    upsert?: SupportMessageUpsertWithWhereUniqueWithoutCompanyInput | SupportMessageUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: SupportMessageCreateManyCompanyInputEnvelope
    set?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    disconnect?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    delete?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    connect?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    update?: SupportMessageUpdateWithWhereUniqueWithoutCompanyInput | SupportMessageUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: SupportMessageUpdateManyWithWhereWithoutCompanyInput | SupportMessageUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: SupportMessageScalarWhereInput | SupportMessageScalarWhereInput[]
  }

  export type EmployeeUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<EmployeeCreateWithoutCompanyInput, EmployeeUncheckedCreateWithoutCompanyInput> | EmployeeCreateWithoutCompanyInput[] | EmployeeUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutCompanyInput | EmployeeCreateOrConnectWithoutCompanyInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutCompanyInput | EmployeeUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: EmployeeCreateManyCompanyInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutCompanyInput | EmployeeUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutCompanyInput | EmployeeUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type TeamUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<TeamCreateWithoutCompanyInput, TeamUncheckedCreateWithoutCompanyInput> | TeamCreateWithoutCompanyInput[] | TeamUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutCompanyInput | TeamCreateOrConnectWithoutCompanyInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutCompanyInput | TeamUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: TeamCreateManyCompanyInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutCompanyInput | TeamUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutCompanyInput | TeamUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type JobRoleUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<JobRoleCreateWithoutCompanyInput, JobRoleUncheckedCreateWithoutCompanyInput> | JobRoleCreateWithoutCompanyInput[] | JobRoleUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobRoleCreateOrConnectWithoutCompanyInput | JobRoleCreateOrConnectWithoutCompanyInput[]
    upsert?: JobRoleUpsertWithWhereUniqueWithoutCompanyInput | JobRoleUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: JobRoleCreateManyCompanyInputEnvelope
    set?: JobRoleWhereUniqueInput | JobRoleWhereUniqueInput[]
    disconnect?: JobRoleWhereUniqueInput | JobRoleWhereUniqueInput[]
    delete?: JobRoleWhereUniqueInput | JobRoleWhereUniqueInput[]
    connect?: JobRoleWhereUniqueInput | JobRoleWhereUniqueInput[]
    update?: JobRoleUpdateWithWhereUniqueWithoutCompanyInput | JobRoleUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: JobRoleUpdateManyWithWhereWithoutCompanyInput | JobRoleUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: JobRoleScalarWhereInput | JobRoleScalarWhereInput[]
  }

  export type WorkBlockageUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<WorkBlockageCreateWithoutCompanyInput, WorkBlockageUncheckedCreateWithoutCompanyInput> | WorkBlockageCreateWithoutCompanyInput[] | WorkBlockageUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: WorkBlockageCreateOrConnectWithoutCompanyInput | WorkBlockageCreateOrConnectWithoutCompanyInput[]
    upsert?: WorkBlockageUpsertWithWhereUniqueWithoutCompanyInput | WorkBlockageUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: WorkBlockageCreateManyCompanyInputEnvelope
    set?: WorkBlockageWhereUniqueInput | WorkBlockageWhereUniqueInput[]
    disconnect?: WorkBlockageWhereUniqueInput | WorkBlockageWhereUniqueInput[]
    delete?: WorkBlockageWhereUniqueInput | WorkBlockageWhereUniqueInput[]
    connect?: WorkBlockageWhereUniqueInput | WorkBlockageWhereUniqueInput[]
    update?: WorkBlockageUpdateWithWhereUniqueWithoutCompanyInput | WorkBlockageUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: WorkBlockageUpdateManyWithWhereWithoutCompanyInput | WorkBlockageUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: WorkBlockageScalarWhereInput | WorkBlockageScalarWhereInput[]
  }

  export type SupportMessageUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<SupportMessageCreateWithoutCompanyInput, SupportMessageUncheckedCreateWithoutCompanyInput> | SupportMessageCreateWithoutCompanyInput[] | SupportMessageUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: SupportMessageCreateOrConnectWithoutCompanyInput | SupportMessageCreateOrConnectWithoutCompanyInput[]
    upsert?: SupportMessageUpsertWithWhereUniqueWithoutCompanyInput | SupportMessageUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: SupportMessageCreateManyCompanyInputEnvelope
    set?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    disconnect?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    delete?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    connect?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    update?: SupportMessageUpdateWithWhereUniqueWithoutCompanyInput | SupportMessageUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: SupportMessageUpdateManyWithWhereWithoutCompanyInput | SupportMessageUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: SupportMessageScalarWhereInput | SupportMessageScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutJobRolesInput = {
    create?: XOR<CompanyCreateWithoutJobRolesInput, CompanyUncheckedCreateWithoutJobRolesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobRolesInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutJobRolesNestedInput = {
    create?: XOR<CompanyCreateWithoutJobRolesInput, CompanyUncheckedCreateWithoutJobRolesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobRolesInput
    upsert?: CompanyUpsertWithoutJobRolesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutJobRolesInput, CompanyUpdateWithoutJobRolesInput>, CompanyUncheckedUpdateWithoutJobRolesInput>
  }

  export type CompanyCreateNestedOneWithoutBlockagesInput = {
    create?: XOR<CompanyCreateWithoutBlockagesInput, CompanyUncheckedCreateWithoutBlockagesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutBlockagesInput
    connect?: CompanyWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CompanyUpdateOneRequiredWithoutBlockagesNestedInput = {
    create?: XOR<CompanyCreateWithoutBlockagesInput, CompanyUncheckedCreateWithoutBlockagesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutBlockagesInput
    upsert?: CompanyUpsertWithoutBlockagesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutBlockagesInput, CompanyUpdateWithoutBlockagesInput>, CompanyUncheckedUpdateWithoutBlockagesInput>
  }

  export type CompanyCreateNestedOneWithoutSupportMessagesInput = {
    create?: XOR<CompanyCreateWithoutSupportMessagesInput, CompanyUncheckedCreateWithoutSupportMessagesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutSupportMessagesInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutSupportMessagesNestedInput = {
    create?: XOR<CompanyCreateWithoutSupportMessagesInput, CompanyUncheckedCreateWithoutSupportMessagesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutSupportMessagesInput
    upsert?: CompanyUpsertWithoutSupportMessagesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutSupportMessagesInput, CompanyUpdateWithoutSupportMessagesInput>, CompanyUncheckedUpdateWithoutSupportMessagesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type TeamCreateWithoutEmployeesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutTeamsInput
  }

  export type TeamUncheckedCreateWithoutEmployeesInput = {
    id?: string
    name: string
    companyId: string
    createdAt?: Date | string
  }

  export type TeamCreateOrConnectWithoutEmployeesInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutEmployeesInput, TeamUncheckedCreateWithoutEmployeesInput>
  }

  export type EmployeeCreateWithoutSubordinatesInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    team?: TeamCreateNestedOneWithoutEmployeesInput
    manager?: EmployeeCreateNestedOneWithoutSubordinatesInput
    company?: CompanyCreateNestedOneWithoutEmployeesInput
    adjustments?: TimeAdjustmentCreateNestedManyWithoutEmployeeInput
    records?: TimeRecordCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutSubordinatesInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    teamId?: string | null
    managerId?: string | null
    companyId?: string | null
    adjustments?: TimeAdjustmentUncheckedCreateNestedManyWithoutEmployeeInput
    records?: TimeRecordUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutSubordinatesInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutSubordinatesInput, EmployeeUncheckedCreateWithoutSubordinatesInput>
  }

  export type EmployeeCreateWithoutManagerInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    team?: TeamCreateNestedOneWithoutEmployeesInput
    subordinates?: EmployeeCreateNestedManyWithoutManagerInput
    company?: CompanyCreateNestedOneWithoutEmployeesInput
    adjustments?: TimeAdjustmentCreateNestedManyWithoutEmployeeInput
    records?: TimeRecordCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutManagerInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    teamId?: string | null
    companyId?: string | null
    subordinates?: EmployeeUncheckedCreateNestedManyWithoutManagerInput
    adjustments?: TimeAdjustmentUncheckedCreateNestedManyWithoutEmployeeInput
    records?: TimeRecordUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutManagerInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutManagerInput, EmployeeUncheckedCreateWithoutManagerInput>
  }

  export type EmployeeCreateManyManagerInputEnvelope = {
    data: EmployeeCreateManyManagerInput | EmployeeCreateManyManagerInput[]
    skipDuplicates?: boolean
  }

  export type CompanyCreateWithoutEmployeesInput = {
    id?: string
    name: string
    address: string
    number: string
    contact: string
    country?: string | null
    document?: string | null
    corporateName?: string | null
    zip?: string | null
    street?: string | null
    city?: string | null
    state?: string | null
    email?: string | null
    subscriptionPlan?: string
    subscriptionStatus?: string
    subscriptionEndsAt?: Date | string | null
    createdAt?: Date | string
    teams?: TeamCreateNestedManyWithoutCompanyInput
    jobRoles?: JobRoleCreateNestedManyWithoutCompanyInput
    blockages?: WorkBlockageCreateNestedManyWithoutCompanyInput
    supportMessages?: SupportMessageCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutEmployeesInput = {
    id?: string
    name: string
    address: string
    number: string
    contact: string
    country?: string | null
    document?: string | null
    corporateName?: string | null
    zip?: string | null
    street?: string | null
    city?: string | null
    state?: string | null
    email?: string | null
    subscriptionPlan?: string
    subscriptionStatus?: string
    subscriptionEndsAt?: Date | string | null
    createdAt?: Date | string
    teams?: TeamUncheckedCreateNestedManyWithoutCompanyInput
    jobRoles?: JobRoleUncheckedCreateNestedManyWithoutCompanyInput
    blockages?: WorkBlockageUncheckedCreateNestedManyWithoutCompanyInput
    supportMessages?: SupportMessageUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutEmployeesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutEmployeesInput, CompanyUncheckedCreateWithoutEmployeesInput>
  }

  export type TimeAdjustmentCreateWithoutEmployeeInput = {
    id?: string
    date: string
    type: string
    time?: string | null
    justification: string
    attachment?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type TimeAdjustmentUncheckedCreateWithoutEmployeeInput = {
    id?: string
    date: string
    type: string
    time?: string | null
    justification: string
    attachment?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type TimeAdjustmentCreateOrConnectWithoutEmployeeInput = {
    where: TimeAdjustmentWhereUniqueInput
    create: XOR<TimeAdjustmentCreateWithoutEmployeeInput, TimeAdjustmentUncheckedCreateWithoutEmployeeInput>
  }

  export type TimeAdjustmentCreateManyEmployeeInputEnvelope = {
    data: TimeAdjustmentCreateManyEmployeeInput | TimeAdjustmentCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type TimeRecordCreateWithoutEmployeeInput = {
    id?: string
    date: string
    type: string
    time: string
    confirmed?: boolean
  }

  export type TimeRecordUncheckedCreateWithoutEmployeeInput = {
    id?: string
    date: string
    type: string
    time: string
    confirmed?: boolean
  }

  export type TimeRecordCreateOrConnectWithoutEmployeeInput = {
    where: TimeRecordWhereUniqueInput
    create: XOR<TimeRecordCreateWithoutEmployeeInput, TimeRecordUncheckedCreateWithoutEmployeeInput>
  }

  export type TimeRecordCreateManyEmployeeInputEnvelope = {
    data: TimeRecordCreateManyEmployeeInput | TimeRecordCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type TeamUpsertWithoutEmployeesInput = {
    update: XOR<TeamUpdateWithoutEmployeesInput, TeamUncheckedUpdateWithoutEmployeesInput>
    create: XOR<TeamCreateWithoutEmployeesInput, TeamUncheckedCreateWithoutEmployeesInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutEmployeesInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutEmployeesInput, TeamUncheckedUpdateWithoutEmployeesInput>
  }

  export type TeamUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutTeamsNestedInput
  }

  export type TeamUncheckedUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUpsertWithoutSubordinatesInput = {
    update: XOR<EmployeeUpdateWithoutSubordinatesInput, EmployeeUncheckedUpdateWithoutSubordinatesInput>
    create: XOR<EmployeeCreateWithoutSubordinatesInput, EmployeeUncheckedCreateWithoutSubordinatesInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutSubordinatesInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutSubordinatesInput, EmployeeUncheckedUpdateWithoutSubordinatesInput>
  }

  export type EmployeeUpdateWithoutSubordinatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    team?: TeamUpdateOneWithoutEmployeesNestedInput
    manager?: EmployeeUpdateOneWithoutSubordinatesNestedInput
    company?: CompanyUpdateOneWithoutEmployeesNestedInput
    adjustments?: TimeAdjustmentUpdateManyWithoutEmployeeNestedInput
    records?: TimeRecordUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutSubordinatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    adjustments?: TimeAdjustmentUncheckedUpdateManyWithoutEmployeeNestedInput
    records?: TimeRecordUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUpsertWithWhereUniqueWithoutManagerInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutManagerInput, EmployeeUncheckedUpdateWithoutManagerInput>
    create: XOR<EmployeeCreateWithoutManagerInput, EmployeeUncheckedCreateWithoutManagerInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutManagerInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutManagerInput, EmployeeUncheckedUpdateWithoutManagerInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutManagerInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutManagerInput>
  }

  export type EmployeeScalarWhereInput = {
    AND?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    OR?: EmployeeScalarWhereInput[]
    NOT?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    id?: StringFilter<"Employee"> | string
    name?: StringFilter<"Employee"> | string
    email?: StringFilter<"Employee"> | string
    password?: StringFilter<"Employee"> | string
    isPasswordTemp?: BoolFilter<"Employee"> | boolean
    tempPassword?: StringNullableFilter<"Employee"> | string | null
    userRole?: StringFilter<"Employee"> | string
    role?: StringFilter<"Employee"> | string
    workStart?: StringFilter<"Employee"> | string
    lunchStart?: StringFilter<"Employee"> | string
    lunchEnd?: StringFilter<"Employee"> | string
    workEnd?: StringFilter<"Employee"> | string
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    isActive?: BoolFilter<"Employee"> | boolean
    contractNumber?: StringNullableFilter<"Employee"> | string | null
    phone?: StringNullableFilter<"Employee"> | string | null
    address?: StringNullableFilter<"Employee"> | string | null
    isTeamLeader?: BoolFilter<"Employee"> | boolean
    teamId?: StringNullableFilter<"Employee"> | string | null
    managerId?: StringNullableFilter<"Employee"> | string | null
    companyId?: StringNullableFilter<"Employee"> | string | null
  }

  export type CompanyUpsertWithoutEmployeesInput = {
    update: XOR<CompanyUpdateWithoutEmployeesInput, CompanyUncheckedUpdateWithoutEmployeesInput>
    create: XOR<CompanyCreateWithoutEmployeesInput, CompanyUncheckedCreateWithoutEmployeesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutEmployeesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutEmployeesInput, CompanyUncheckedUpdateWithoutEmployeesInput>
  }

  export type CompanyUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    corporateName?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teams?: TeamUpdateManyWithoutCompanyNestedInput
    jobRoles?: JobRoleUpdateManyWithoutCompanyNestedInput
    blockages?: WorkBlockageUpdateManyWithoutCompanyNestedInput
    supportMessages?: SupportMessageUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    corporateName?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teams?: TeamUncheckedUpdateManyWithoutCompanyNestedInput
    jobRoles?: JobRoleUncheckedUpdateManyWithoutCompanyNestedInput
    blockages?: WorkBlockageUncheckedUpdateManyWithoutCompanyNestedInput
    supportMessages?: SupportMessageUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type TimeAdjustmentUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: TimeAdjustmentWhereUniqueInput
    update: XOR<TimeAdjustmentUpdateWithoutEmployeeInput, TimeAdjustmentUncheckedUpdateWithoutEmployeeInput>
    create: XOR<TimeAdjustmentCreateWithoutEmployeeInput, TimeAdjustmentUncheckedCreateWithoutEmployeeInput>
  }

  export type TimeAdjustmentUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: TimeAdjustmentWhereUniqueInput
    data: XOR<TimeAdjustmentUpdateWithoutEmployeeInput, TimeAdjustmentUncheckedUpdateWithoutEmployeeInput>
  }

  export type TimeAdjustmentUpdateManyWithWhereWithoutEmployeeInput = {
    where: TimeAdjustmentScalarWhereInput
    data: XOR<TimeAdjustmentUpdateManyMutationInput, TimeAdjustmentUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type TimeAdjustmentScalarWhereInput = {
    AND?: TimeAdjustmentScalarWhereInput | TimeAdjustmentScalarWhereInput[]
    OR?: TimeAdjustmentScalarWhereInput[]
    NOT?: TimeAdjustmentScalarWhereInput | TimeAdjustmentScalarWhereInput[]
    id?: StringFilter<"TimeAdjustment"> | string
    employeeId?: StringFilter<"TimeAdjustment"> | string
    date?: StringFilter<"TimeAdjustment"> | string
    type?: StringFilter<"TimeAdjustment"> | string
    time?: StringNullableFilter<"TimeAdjustment"> | string | null
    justification?: StringFilter<"TimeAdjustment"> | string
    attachment?: StringNullableFilter<"TimeAdjustment"> | string | null
    status?: StringFilter<"TimeAdjustment"> | string
    createdAt?: DateTimeFilter<"TimeAdjustment"> | Date | string
  }

  export type TimeRecordUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: TimeRecordWhereUniqueInput
    update: XOR<TimeRecordUpdateWithoutEmployeeInput, TimeRecordUncheckedUpdateWithoutEmployeeInput>
    create: XOR<TimeRecordCreateWithoutEmployeeInput, TimeRecordUncheckedCreateWithoutEmployeeInput>
  }

  export type TimeRecordUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: TimeRecordWhereUniqueInput
    data: XOR<TimeRecordUpdateWithoutEmployeeInput, TimeRecordUncheckedUpdateWithoutEmployeeInput>
  }

  export type TimeRecordUpdateManyWithWhereWithoutEmployeeInput = {
    where: TimeRecordScalarWhereInput
    data: XOR<TimeRecordUpdateManyMutationInput, TimeRecordUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type TimeRecordScalarWhereInput = {
    AND?: TimeRecordScalarWhereInput | TimeRecordScalarWhereInput[]
    OR?: TimeRecordScalarWhereInput[]
    NOT?: TimeRecordScalarWhereInput | TimeRecordScalarWhereInput[]
    id?: StringFilter<"TimeRecord"> | string
    employeeId?: StringFilter<"TimeRecord"> | string
    date?: StringFilter<"TimeRecord"> | string
    type?: StringFilter<"TimeRecord"> | string
    time?: StringFilter<"TimeRecord"> | string
    confirmed?: BoolFilter<"TimeRecord"> | boolean
  }

  export type EmployeeCreateWithoutRecordsInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    team?: TeamCreateNestedOneWithoutEmployeesInput
    manager?: EmployeeCreateNestedOneWithoutSubordinatesInput
    subordinates?: EmployeeCreateNestedManyWithoutManagerInput
    company?: CompanyCreateNestedOneWithoutEmployeesInput
    adjustments?: TimeAdjustmentCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutRecordsInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    teamId?: string | null
    managerId?: string | null
    companyId?: string | null
    subordinates?: EmployeeUncheckedCreateNestedManyWithoutManagerInput
    adjustments?: TimeAdjustmentUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutRecordsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutRecordsInput, EmployeeUncheckedCreateWithoutRecordsInput>
  }

  export type EmployeeUpsertWithoutRecordsInput = {
    update: XOR<EmployeeUpdateWithoutRecordsInput, EmployeeUncheckedUpdateWithoutRecordsInput>
    create: XOR<EmployeeCreateWithoutRecordsInput, EmployeeUncheckedCreateWithoutRecordsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutRecordsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutRecordsInput, EmployeeUncheckedUpdateWithoutRecordsInput>
  }

  export type EmployeeUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    team?: TeamUpdateOneWithoutEmployeesNestedInput
    manager?: EmployeeUpdateOneWithoutSubordinatesNestedInput
    subordinates?: EmployeeUpdateManyWithoutManagerNestedInput
    company?: CompanyUpdateOneWithoutEmployeesNestedInput
    adjustments?: TimeAdjustmentUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    subordinates?: EmployeeUncheckedUpdateManyWithoutManagerNestedInput
    adjustments?: TimeAdjustmentUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutAdjustmentsInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    team?: TeamCreateNestedOneWithoutEmployeesInput
    manager?: EmployeeCreateNestedOneWithoutSubordinatesInput
    subordinates?: EmployeeCreateNestedManyWithoutManagerInput
    company?: CompanyCreateNestedOneWithoutEmployeesInput
    records?: TimeRecordCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutAdjustmentsInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    teamId?: string | null
    managerId?: string | null
    companyId?: string | null
    subordinates?: EmployeeUncheckedCreateNestedManyWithoutManagerInput
    records?: TimeRecordUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutAdjustmentsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutAdjustmentsInput, EmployeeUncheckedCreateWithoutAdjustmentsInput>
  }

  export type EmployeeUpsertWithoutAdjustmentsInput = {
    update: XOR<EmployeeUpdateWithoutAdjustmentsInput, EmployeeUncheckedUpdateWithoutAdjustmentsInput>
    create: XOR<EmployeeCreateWithoutAdjustmentsInput, EmployeeUncheckedCreateWithoutAdjustmentsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutAdjustmentsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutAdjustmentsInput, EmployeeUncheckedUpdateWithoutAdjustmentsInput>
  }

  export type EmployeeUpdateWithoutAdjustmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    team?: TeamUpdateOneWithoutEmployeesNestedInput
    manager?: EmployeeUpdateOneWithoutSubordinatesNestedInput
    subordinates?: EmployeeUpdateManyWithoutManagerNestedInput
    company?: CompanyUpdateOneWithoutEmployeesNestedInput
    records?: TimeRecordUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutAdjustmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    subordinates?: EmployeeUncheckedUpdateManyWithoutManagerNestedInput
    records?: TimeRecordUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type CompanyCreateWithoutTeamsInput = {
    id?: string
    name: string
    address: string
    number: string
    contact: string
    country?: string | null
    document?: string | null
    corporateName?: string | null
    zip?: string | null
    street?: string | null
    city?: string | null
    state?: string | null
    email?: string | null
    subscriptionPlan?: string
    subscriptionStatus?: string
    subscriptionEndsAt?: Date | string | null
    createdAt?: Date | string
    employees?: EmployeeCreateNestedManyWithoutCompanyInput
    jobRoles?: JobRoleCreateNestedManyWithoutCompanyInput
    blockages?: WorkBlockageCreateNestedManyWithoutCompanyInput
    supportMessages?: SupportMessageCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutTeamsInput = {
    id?: string
    name: string
    address: string
    number: string
    contact: string
    country?: string | null
    document?: string | null
    corporateName?: string | null
    zip?: string | null
    street?: string | null
    city?: string | null
    state?: string | null
    email?: string | null
    subscriptionPlan?: string
    subscriptionStatus?: string
    subscriptionEndsAt?: Date | string | null
    createdAt?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutCompanyInput
    jobRoles?: JobRoleUncheckedCreateNestedManyWithoutCompanyInput
    blockages?: WorkBlockageUncheckedCreateNestedManyWithoutCompanyInput
    supportMessages?: SupportMessageUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutTeamsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutTeamsInput, CompanyUncheckedCreateWithoutTeamsInput>
  }

  export type EmployeeCreateWithoutTeamInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    manager?: EmployeeCreateNestedOneWithoutSubordinatesInput
    subordinates?: EmployeeCreateNestedManyWithoutManagerInput
    company?: CompanyCreateNestedOneWithoutEmployeesInput
    adjustments?: TimeAdjustmentCreateNestedManyWithoutEmployeeInput
    records?: TimeRecordCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutTeamInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    managerId?: string | null
    companyId?: string | null
    subordinates?: EmployeeUncheckedCreateNestedManyWithoutManagerInput
    adjustments?: TimeAdjustmentUncheckedCreateNestedManyWithoutEmployeeInput
    records?: TimeRecordUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutTeamInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutTeamInput, EmployeeUncheckedCreateWithoutTeamInput>
  }

  export type EmployeeCreateManyTeamInputEnvelope = {
    data: EmployeeCreateManyTeamInput | EmployeeCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutTeamsInput = {
    update: XOR<CompanyUpdateWithoutTeamsInput, CompanyUncheckedUpdateWithoutTeamsInput>
    create: XOR<CompanyCreateWithoutTeamsInput, CompanyUncheckedCreateWithoutTeamsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutTeamsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutTeamsInput, CompanyUncheckedUpdateWithoutTeamsInput>
  }

  export type CompanyUpdateWithoutTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    corporateName?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUpdateManyWithoutCompanyNestedInput
    jobRoles?: JobRoleUpdateManyWithoutCompanyNestedInput
    blockages?: WorkBlockageUpdateManyWithoutCompanyNestedInput
    supportMessages?: SupportMessageUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    corporateName?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutCompanyNestedInput
    jobRoles?: JobRoleUncheckedUpdateManyWithoutCompanyNestedInput
    blockages?: WorkBlockageUncheckedUpdateManyWithoutCompanyNestedInput
    supportMessages?: SupportMessageUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type EmployeeUpsertWithWhereUniqueWithoutTeamInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutTeamInput, EmployeeUncheckedUpdateWithoutTeamInput>
    create: XOR<EmployeeCreateWithoutTeamInput, EmployeeUncheckedCreateWithoutTeamInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutTeamInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutTeamInput, EmployeeUncheckedUpdateWithoutTeamInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutTeamInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutTeamInput>
  }

  export type EmployeeCreateWithoutCompanyInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    team?: TeamCreateNestedOneWithoutEmployeesInput
    manager?: EmployeeCreateNestedOneWithoutSubordinatesInput
    subordinates?: EmployeeCreateNestedManyWithoutManagerInput
    adjustments?: TimeAdjustmentCreateNestedManyWithoutEmployeeInput
    records?: TimeRecordCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutCompanyInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    teamId?: string | null
    managerId?: string | null
    subordinates?: EmployeeUncheckedCreateNestedManyWithoutManagerInput
    adjustments?: TimeAdjustmentUncheckedCreateNestedManyWithoutEmployeeInput
    records?: TimeRecordUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutCompanyInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutCompanyInput, EmployeeUncheckedCreateWithoutCompanyInput>
  }

  export type EmployeeCreateManyCompanyInputEnvelope = {
    data: EmployeeCreateManyCompanyInput | EmployeeCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type TeamCreateWithoutCompanyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    employees?: EmployeeCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutCompanyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutCompanyInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutCompanyInput, TeamUncheckedCreateWithoutCompanyInput>
  }

  export type TeamCreateManyCompanyInputEnvelope = {
    data: TeamCreateManyCompanyInput | TeamCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type JobRoleCreateWithoutCompanyInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type JobRoleUncheckedCreateWithoutCompanyInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type JobRoleCreateOrConnectWithoutCompanyInput = {
    where: JobRoleWhereUniqueInput
    create: XOR<JobRoleCreateWithoutCompanyInput, JobRoleUncheckedCreateWithoutCompanyInput>
  }

  export type JobRoleCreateManyCompanyInputEnvelope = {
    data: JobRoleCreateManyCompanyInput | JobRoleCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type WorkBlockageCreateWithoutCompanyInput = {
    id?: string
    type: string
    dayOfWeek?: number | null
    date?: string | null
    reason?: string | null
    createdAt?: Date | string
  }

  export type WorkBlockageUncheckedCreateWithoutCompanyInput = {
    id?: string
    type: string
    dayOfWeek?: number | null
    date?: string | null
    reason?: string | null
    createdAt?: Date | string
  }

  export type WorkBlockageCreateOrConnectWithoutCompanyInput = {
    where: WorkBlockageWhereUniqueInput
    create: XOR<WorkBlockageCreateWithoutCompanyInput, WorkBlockageUncheckedCreateWithoutCompanyInput>
  }

  export type WorkBlockageCreateManyCompanyInputEnvelope = {
    data: WorkBlockageCreateManyCompanyInput | WorkBlockageCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type SupportMessageCreateWithoutCompanyInput = {
    id?: string
    senderId: string
    senderName: string
    senderRole: string
    text: string
    createdAt?: Date | string
  }

  export type SupportMessageUncheckedCreateWithoutCompanyInput = {
    id?: string
    senderId: string
    senderName: string
    senderRole: string
    text: string
    createdAt?: Date | string
  }

  export type SupportMessageCreateOrConnectWithoutCompanyInput = {
    where: SupportMessageWhereUniqueInput
    create: XOR<SupportMessageCreateWithoutCompanyInput, SupportMessageUncheckedCreateWithoutCompanyInput>
  }

  export type SupportMessageCreateManyCompanyInputEnvelope = {
    data: SupportMessageCreateManyCompanyInput | SupportMessageCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeUpsertWithWhereUniqueWithoutCompanyInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutCompanyInput, EmployeeUncheckedUpdateWithoutCompanyInput>
    create: XOR<EmployeeCreateWithoutCompanyInput, EmployeeUncheckedCreateWithoutCompanyInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutCompanyInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutCompanyInput, EmployeeUncheckedUpdateWithoutCompanyInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutCompanyInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutCompanyInput>
  }

  export type TeamUpsertWithWhereUniqueWithoutCompanyInput = {
    where: TeamWhereUniqueInput
    update: XOR<TeamUpdateWithoutCompanyInput, TeamUncheckedUpdateWithoutCompanyInput>
    create: XOR<TeamCreateWithoutCompanyInput, TeamUncheckedCreateWithoutCompanyInput>
  }

  export type TeamUpdateWithWhereUniqueWithoutCompanyInput = {
    where: TeamWhereUniqueInput
    data: XOR<TeamUpdateWithoutCompanyInput, TeamUncheckedUpdateWithoutCompanyInput>
  }

  export type TeamUpdateManyWithWhereWithoutCompanyInput = {
    where: TeamScalarWhereInput
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyWithoutCompanyInput>
  }

  export type TeamScalarWhereInput = {
    AND?: TeamScalarWhereInput | TeamScalarWhereInput[]
    OR?: TeamScalarWhereInput[]
    NOT?: TeamScalarWhereInput | TeamScalarWhereInput[]
    id?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    companyId?: StringFilter<"Team"> | string
    createdAt?: DateTimeFilter<"Team"> | Date | string
  }

  export type JobRoleUpsertWithWhereUniqueWithoutCompanyInput = {
    where: JobRoleWhereUniqueInput
    update: XOR<JobRoleUpdateWithoutCompanyInput, JobRoleUncheckedUpdateWithoutCompanyInput>
    create: XOR<JobRoleCreateWithoutCompanyInput, JobRoleUncheckedCreateWithoutCompanyInput>
  }

  export type JobRoleUpdateWithWhereUniqueWithoutCompanyInput = {
    where: JobRoleWhereUniqueInput
    data: XOR<JobRoleUpdateWithoutCompanyInput, JobRoleUncheckedUpdateWithoutCompanyInput>
  }

  export type JobRoleUpdateManyWithWhereWithoutCompanyInput = {
    where: JobRoleScalarWhereInput
    data: XOR<JobRoleUpdateManyMutationInput, JobRoleUncheckedUpdateManyWithoutCompanyInput>
  }

  export type JobRoleScalarWhereInput = {
    AND?: JobRoleScalarWhereInput | JobRoleScalarWhereInput[]
    OR?: JobRoleScalarWhereInput[]
    NOT?: JobRoleScalarWhereInput | JobRoleScalarWhereInput[]
    id?: StringFilter<"JobRole"> | string
    name?: StringFilter<"JobRole"> | string
    companyId?: StringFilter<"JobRole"> | string
    createdAt?: DateTimeFilter<"JobRole"> | Date | string
  }

  export type WorkBlockageUpsertWithWhereUniqueWithoutCompanyInput = {
    where: WorkBlockageWhereUniqueInput
    update: XOR<WorkBlockageUpdateWithoutCompanyInput, WorkBlockageUncheckedUpdateWithoutCompanyInput>
    create: XOR<WorkBlockageCreateWithoutCompanyInput, WorkBlockageUncheckedCreateWithoutCompanyInput>
  }

  export type WorkBlockageUpdateWithWhereUniqueWithoutCompanyInput = {
    where: WorkBlockageWhereUniqueInput
    data: XOR<WorkBlockageUpdateWithoutCompanyInput, WorkBlockageUncheckedUpdateWithoutCompanyInput>
  }

  export type WorkBlockageUpdateManyWithWhereWithoutCompanyInput = {
    where: WorkBlockageScalarWhereInput
    data: XOR<WorkBlockageUpdateManyMutationInput, WorkBlockageUncheckedUpdateManyWithoutCompanyInput>
  }

  export type WorkBlockageScalarWhereInput = {
    AND?: WorkBlockageScalarWhereInput | WorkBlockageScalarWhereInput[]
    OR?: WorkBlockageScalarWhereInput[]
    NOT?: WorkBlockageScalarWhereInput | WorkBlockageScalarWhereInput[]
    id?: StringFilter<"WorkBlockage"> | string
    companyId?: StringFilter<"WorkBlockage"> | string
    type?: StringFilter<"WorkBlockage"> | string
    dayOfWeek?: IntNullableFilter<"WorkBlockage"> | number | null
    date?: StringNullableFilter<"WorkBlockage"> | string | null
    reason?: StringNullableFilter<"WorkBlockage"> | string | null
    createdAt?: DateTimeFilter<"WorkBlockage"> | Date | string
  }

  export type SupportMessageUpsertWithWhereUniqueWithoutCompanyInput = {
    where: SupportMessageWhereUniqueInput
    update: XOR<SupportMessageUpdateWithoutCompanyInput, SupportMessageUncheckedUpdateWithoutCompanyInput>
    create: XOR<SupportMessageCreateWithoutCompanyInput, SupportMessageUncheckedCreateWithoutCompanyInput>
  }

  export type SupportMessageUpdateWithWhereUniqueWithoutCompanyInput = {
    where: SupportMessageWhereUniqueInput
    data: XOR<SupportMessageUpdateWithoutCompanyInput, SupportMessageUncheckedUpdateWithoutCompanyInput>
  }

  export type SupportMessageUpdateManyWithWhereWithoutCompanyInput = {
    where: SupportMessageScalarWhereInput
    data: XOR<SupportMessageUpdateManyMutationInput, SupportMessageUncheckedUpdateManyWithoutCompanyInput>
  }

  export type SupportMessageScalarWhereInput = {
    AND?: SupportMessageScalarWhereInput | SupportMessageScalarWhereInput[]
    OR?: SupportMessageScalarWhereInput[]
    NOT?: SupportMessageScalarWhereInput | SupportMessageScalarWhereInput[]
    id?: StringFilter<"SupportMessage"> | string
    companyId?: StringFilter<"SupportMessage"> | string
    senderId?: StringFilter<"SupportMessage"> | string
    senderName?: StringFilter<"SupportMessage"> | string
    senderRole?: StringFilter<"SupportMessage"> | string
    text?: StringFilter<"SupportMessage"> | string
    createdAt?: DateTimeFilter<"SupportMessage"> | Date | string
  }

  export type CompanyCreateWithoutJobRolesInput = {
    id?: string
    name: string
    address: string
    number: string
    contact: string
    country?: string | null
    document?: string | null
    corporateName?: string | null
    zip?: string | null
    street?: string | null
    city?: string | null
    state?: string | null
    email?: string | null
    subscriptionPlan?: string
    subscriptionStatus?: string
    subscriptionEndsAt?: Date | string | null
    createdAt?: Date | string
    employees?: EmployeeCreateNestedManyWithoutCompanyInput
    teams?: TeamCreateNestedManyWithoutCompanyInput
    blockages?: WorkBlockageCreateNestedManyWithoutCompanyInput
    supportMessages?: SupportMessageCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutJobRolesInput = {
    id?: string
    name: string
    address: string
    number: string
    contact: string
    country?: string | null
    document?: string | null
    corporateName?: string | null
    zip?: string | null
    street?: string | null
    city?: string | null
    state?: string | null
    email?: string | null
    subscriptionPlan?: string
    subscriptionStatus?: string
    subscriptionEndsAt?: Date | string | null
    createdAt?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutCompanyInput
    teams?: TeamUncheckedCreateNestedManyWithoutCompanyInput
    blockages?: WorkBlockageUncheckedCreateNestedManyWithoutCompanyInput
    supportMessages?: SupportMessageUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutJobRolesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutJobRolesInput, CompanyUncheckedCreateWithoutJobRolesInput>
  }

  export type CompanyUpsertWithoutJobRolesInput = {
    update: XOR<CompanyUpdateWithoutJobRolesInput, CompanyUncheckedUpdateWithoutJobRolesInput>
    create: XOR<CompanyCreateWithoutJobRolesInput, CompanyUncheckedCreateWithoutJobRolesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutJobRolesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutJobRolesInput, CompanyUncheckedUpdateWithoutJobRolesInput>
  }

  export type CompanyUpdateWithoutJobRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    corporateName?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUpdateManyWithoutCompanyNestedInput
    teams?: TeamUpdateManyWithoutCompanyNestedInput
    blockages?: WorkBlockageUpdateManyWithoutCompanyNestedInput
    supportMessages?: SupportMessageUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutJobRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    corporateName?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutCompanyNestedInput
    teams?: TeamUncheckedUpdateManyWithoutCompanyNestedInput
    blockages?: WorkBlockageUncheckedUpdateManyWithoutCompanyNestedInput
    supportMessages?: SupportMessageUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutBlockagesInput = {
    id?: string
    name: string
    address: string
    number: string
    contact: string
    country?: string | null
    document?: string | null
    corporateName?: string | null
    zip?: string | null
    street?: string | null
    city?: string | null
    state?: string | null
    email?: string | null
    subscriptionPlan?: string
    subscriptionStatus?: string
    subscriptionEndsAt?: Date | string | null
    createdAt?: Date | string
    employees?: EmployeeCreateNestedManyWithoutCompanyInput
    teams?: TeamCreateNestedManyWithoutCompanyInput
    jobRoles?: JobRoleCreateNestedManyWithoutCompanyInput
    supportMessages?: SupportMessageCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutBlockagesInput = {
    id?: string
    name: string
    address: string
    number: string
    contact: string
    country?: string | null
    document?: string | null
    corporateName?: string | null
    zip?: string | null
    street?: string | null
    city?: string | null
    state?: string | null
    email?: string | null
    subscriptionPlan?: string
    subscriptionStatus?: string
    subscriptionEndsAt?: Date | string | null
    createdAt?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutCompanyInput
    teams?: TeamUncheckedCreateNestedManyWithoutCompanyInput
    jobRoles?: JobRoleUncheckedCreateNestedManyWithoutCompanyInput
    supportMessages?: SupportMessageUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutBlockagesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutBlockagesInput, CompanyUncheckedCreateWithoutBlockagesInput>
  }

  export type CompanyUpsertWithoutBlockagesInput = {
    update: XOR<CompanyUpdateWithoutBlockagesInput, CompanyUncheckedUpdateWithoutBlockagesInput>
    create: XOR<CompanyCreateWithoutBlockagesInput, CompanyUncheckedCreateWithoutBlockagesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutBlockagesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutBlockagesInput, CompanyUncheckedUpdateWithoutBlockagesInput>
  }

  export type CompanyUpdateWithoutBlockagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    corporateName?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUpdateManyWithoutCompanyNestedInput
    teams?: TeamUpdateManyWithoutCompanyNestedInput
    jobRoles?: JobRoleUpdateManyWithoutCompanyNestedInput
    supportMessages?: SupportMessageUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutBlockagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    corporateName?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutCompanyNestedInput
    teams?: TeamUncheckedUpdateManyWithoutCompanyNestedInput
    jobRoles?: JobRoleUncheckedUpdateManyWithoutCompanyNestedInput
    supportMessages?: SupportMessageUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutSupportMessagesInput = {
    id?: string
    name: string
    address: string
    number: string
    contact: string
    country?: string | null
    document?: string | null
    corporateName?: string | null
    zip?: string | null
    street?: string | null
    city?: string | null
    state?: string | null
    email?: string | null
    subscriptionPlan?: string
    subscriptionStatus?: string
    subscriptionEndsAt?: Date | string | null
    createdAt?: Date | string
    employees?: EmployeeCreateNestedManyWithoutCompanyInput
    teams?: TeamCreateNestedManyWithoutCompanyInput
    jobRoles?: JobRoleCreateNestedManyWithoutCompanyInput
    blockages?: WorkBlockageCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutSupportMessagesInput = {
    id?: string
    name: string
    address: string
    number: string
    contact: string
    country?: string | null
    document?: string | null
    corporateName?: string | null
    zip?: string | null
    street?: string | null
    city?: string | null
    state?: string | null
    email?: string | null
    subscriptionPlan?: string
    subscriptionStatus?: string
    subscriptionEndsAt?: Date | string | null
    createdAt?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutCompanyInput
    teams?: TeamUncheckedCreateNestedManyWithoutCompanyInput
    jobRoles?: JobRoleUncheckedCreateNestedManyWithoutCompanyInput
    blockages?: WorkBlockageUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutSupportMessagesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutSupportMessagesInput, CompanyUncheckedCreateWithoutSupportMessagesInput>
  }

  export type CompanyUpsertWithoutSupportMessagesInput = {
    update: XOR<CompanyUpdateWithoutSupportMessagesInput, CompanyUncheckedUpdateWithoutSupportMessagesInput>
    create: XOR<CompanyCreateWithoutSupportMessagesInput, CompanyUncheckedCreateWithoutSupportMessagesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutSupportMessagesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutSupportMessagesInput, CompanyUncheckedUpdateWithoutSupportMessagesInput>
  }

  export type CompanyUpdateWithoutSupportMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    corporateName?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUpdateManyWithoutCompanyNestedInput
    teams?: TeamUpdateManyWithoutCompanyNestedInput
    jobRoles?: JobRoleUpdateManyWithoutCompanyNestedInput
    blockages?: WorkBlockageUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutSupportMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    contact?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    corporateName?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    subscriptionEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutCompanyNestedInput
    teams?: TeamUncheckedUpdateManyWithoutCompanyNestedInput
    jobRoles?: JobRoleUncheckedUpdateManyWithoutCompanyNestedInput
    blockages?: WorkBlockageUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type EmployeeCreateManyManagerInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    teamId?: string | null
    companyId?: string | null
  }

  export type TimeAdjustmentCreateManyEmployeeInput = {
    id?: string
    date: string
    type: string
    time?: string | null
    justification: string
    attachment?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type TimeRecordCreateManyEmployeeInput = {
    id?: string
    date: string
    type: string
    time: string
    confirmed?: boolean
  }

  export type EmployeeUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    team?: TeamUpdateOneWithoutEmployeesNestedInput
    subordinates?: EmployeeUpdateManyWithoutManagerNestedInput
    company?: CompanyUpdateOneWithoutEmployeesNestedInput
    adjustments?: TimeAdjustmentUpdateManyWithoutEmployeeNestedInput
    records?: TimeRecordUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    subordinates?: EmployeeUncheckedUpdateManyWithoutManagerNestedInput
    adjustments?: TimeAdjustmentUncheckedUpdateManyWithoutEmployeeNestedInput
    records?: TimeRecordUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateManyWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TimeAdjustmentUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    time?: NullableStringFieldUpdateOperationsInput | string | null
    justification?: StringFieldUpdateOperationsInput | string
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeAdjustmentUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    time?: NullableStringFieldUpdateOperationsInput | string | null
    justification?: StringFieldUpdateOperationsInput | string
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeAdjustmentUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    time?: NullableStringFieldUpdateOperationsInput | string | null
    justification?: StringFieldUpdateOperationsInput | string
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeRecordUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    confirmed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TimeRecordUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    confirmed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TimeRecordUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    confirmed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmployeeCreateManyTeamInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    managerId?: string | null
    companyId?: string | null
  }

  export type EmployeeUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    manager?: EmployeeUpdateOneWithoutSubordinatesNestedInput
    subordinates?: EmployeeUpdateManyWithoutManagerNestedInput
    company?: CompanyUpdateOneWithoutEmployeesNestedInput
    adjustments?: TimeAdjustmentUpdateManyWithoutEmployeeNestedInput
    records?: TimeRecordUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    subordinates?: EmployeeUncheckedUpdateManyWithoutManagerNestedInput
    adjustments?: TimeAdjustmentUncheckedUpdateManyWithoutEmployeeNestedInput
    records?: TimeRecordUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EmployeeCreateManyCompanyInput = {
    id?: string
    name: string
    email: string
    password?: string
    isPasswordTemp?: boolean
    tempPassword?: string | null
    userRole?: string
    role: string
    workStart?: string
    lunchStart?: string
    lunchEnd?: string
    workEnd?: string
    createdAt?: Date | string
    isActive?: boolean
    contractNumber?: string | null
    phone?: string | null
    address?: string | null
    isTeamLeader?: boolean
    teamId?: string | null
    managerId?: string | null
  }

  export type TeamCreateManyCompanyInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type JobRoleCreateManyCompanyInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type WorkBlockageCreateManyCompanyInput = {
    id?: string
    type: string
    dayOfWeek?: number | null
    date?: string | null
    reason?: string | null
    createdAt?: Date | string
  }

  export type SupportMessageCreateManyCompanyInput = {
    id?: string
    senderId: string
    senderName: string
    senderRole: string
    text: string
    createdAt?: Date | string
  }

  export type EmployeeUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    team?: TeamUpdateOneWithoutEmployeesNestedInput
    manager?: EmployeeUpdateOneWithoutSubordinatesNestedInput
    subordinates?: EmployeeUpdateManyWithoutManagerNestedInput
    adjustments?: TimeAdjustmentUpdateManyWithoutEmployeeNestedInput
    records?: TimeRecordUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    subordinates?: EmployeeUncheckedUpdateManyWithoutManagerNestedInput
    adjustments?: TimeAdjustmentUncheckedUpdateManyWithoutEmployeeNestedInput
    records?: TimeRecordUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isPasswordTemp?: BoolFieldUpdateOperationsInput | boolean
    tempPassword?: NullableStringFieldUpdateOperationsInput | string | null
    userRole?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    workStart?: StringFieldUpdateOperationsInput | string
    lunchStart?: StringFieldUpdateOperationsInput | string
    lunchEnd?: StringFieldUpdateOperationsInput | string
    workEnd?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    isTeamLeader?: BoolFieldUpdateOperationsInput | boolean
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TeamUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobRoleUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobRoleUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobRoleUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkBlockageUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkBlockageUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkBlockageUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableIntFieldUpdateOperationsInput | number | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportMessageUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    senderRole?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportMessageUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    senderRole?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportMessageUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    senderRole?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}