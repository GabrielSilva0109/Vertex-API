import { Request, Response } from 'express';
export declare const getWallets: (req: Request, res: Response) => void;
export declare const getWalletById: (req: Request, res: Response) => void;
export declare const getWalletByIdUser: (req: Request, res: Response) => void;
export declare const createWallet: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const updateWallet: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const deleteWallet: (req: Request, res: Response) => void;
