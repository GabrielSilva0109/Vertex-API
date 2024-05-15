import { Request, Response } from 'express';
export declare const getAtivos: (req: Request, res: Response) => Promise<void>;
export declare const getAtivoById: (req: Request, res: Response) => Promise<void>;
export declare const getAtivosByWalletId: (req: Request, res: Response) => Promise<void>;
export declare const createAtivo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateAtivo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteAtivo: (req: Request, res: Response) => Promise<void>;
