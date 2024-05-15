import { Request, Response } from 'express';
export declare const getDespesas: (req: Request, res: Response) => Promise<void>;
export declare const getDespesaById: (req: Request, res: Response) => Promise<void>;
export declare const getDespesasByWalletId: (req: Request, res: Response) => Promise<void>;
export declare const createDespesa: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateDespesa: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteDespesa: (req: Request, res: Response) => Promise<void>;
