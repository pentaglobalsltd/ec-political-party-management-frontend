import { incomeSourceDetailsFirstPartMiddleware } from './income-source-details-first-part-middleware';
import { incomeSourceDetailsSecondPartMiddleware } from './income-source-details-second-part-middleware';

export const incomeSourceMiddleware = [
  incomeSourceDetailsFirstPartMiddleware,
  incomeSourceDetailsSecondPartMiddleware,
];
