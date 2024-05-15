import { Request, Response } from 'express';
export declare const getUsers: (req: Request, res: Response) => void;
export declare const getUserById: (req: Request, res: Response) => void;
export declare const createUser: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const updateUser: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const deleteUser: (req: Request, res: Response) => void;
export declare const loginUser: (req: Request, res: Response) => Promise<void>;
export declare const updateUserPicture: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
