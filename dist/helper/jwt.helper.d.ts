export declare const generateToken: (user: any, secretSignature: any, tokenLife: any) => Promise<string>;
export declare const verifyToken: (token: any, secretKey: any) => Promise<unknown>;
