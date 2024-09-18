import { Request, Response, NextFunction } from 'express';
import dayjs from 'dayjs';
import { FORMAT } from 'src/config/dayjs';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('req.body', req.body);
  console.log('req.params', req.params);
  console.log('req.query', req.query);
  console.log(`RequestEnd------------------------`, dayjs().format(FORMAT));
  // console.log('res', res.app);
  next();
}
