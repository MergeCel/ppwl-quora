export interface DbClient {
  user: {
    findMany: (args?: any) => Promise<any[]>;
    findFirst: (args?: any) => Promise<any>;
    findUnique: (args?: any) => Promise<any>;
    create: (args?: any) => Promise<any>;
    update: (args?: any) => Promise<any>;
    delete: (args?: any) => Promise<any>;
    count: (args?: any) => Promise<number>;
  };
  post: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args?: any) => Promise<any>;
    create: (args?: any) => Promise<any>;
    update: (args?: any) => Promise<any>;
    delete: (args?: any) => Promise<any>;
    count: (args?: any) => Promise<number>;
  };
  postLike: {
    findUnique: (args?: any) => Promise<any>;
    create: (args?: any) => Promise<any>;
    delete: (args?: any) => Promise<any>;
    count: (args?: any) => Promise<number>;
  };
  comment: {
    findMany: (args?: any) => Promise<any[]>;
    create: (args?: any) => Promise<any>;
    delete: (args?: any) => Promise<any>;
    count: (args?: any) => Promise<number>;
  };
  notification: {
    findMany: (args?: any) => Promise<any[]>;
    create: (args?: any) => Promise<any>;
    update: (args?: any) => Promise<any>;
    updateMany: (args?: any) => Promise<any>;
    count: (args?: any) => Promise<number>;
  };
}
