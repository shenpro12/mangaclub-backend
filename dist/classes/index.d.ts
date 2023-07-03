export declare class ApiResponse {
    readonly timestamp: Date;
    readonly status: number;
    readonly error: string;
    readonly message: string;
    readonly payload: any;
    constructor(status: number, message: string, error?: string, payload?: any);
}
