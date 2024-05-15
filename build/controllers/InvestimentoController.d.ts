import { Request, Response } from 'express';
export declare const getInvestimentos: (req: Request, res: Response) => Promise<void>;
export declare const getInvestimentoById: (req: Request, res: Response) => Promise<void>;
export declare const getInvestimentoByWalletId: (req: Request, res: Response) => Promise<void>;
export declare const createInvestimento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateInvestimento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteInvestimento: (req: Request, res: Response) => Promise<void>;
