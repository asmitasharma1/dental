declare module "bcryptjs" {
    function compare(data: string, encrypted: string): Promise<boolean>;
    function compareSync(data: string, encrypted: string): boolean;
    function hash(data: string, salt: string | number): Promise<string>;
    function hashSync(data: string, salt: string | number): string;
    function genSaltSync(rounds?: number): string;
  
    const _default: {
      compare: typeof compare;
      compareSync: typeof compareSync;
      hash: typeof hash;
      hashSync: typeof hashSync;
      genSaltSync: typeof genSaltSync;
    };
  
    export default _default;
  }
  