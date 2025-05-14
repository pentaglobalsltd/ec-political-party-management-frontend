import { ThirdPartMiddleware } from './edit-new-nomination-of-candidate/third-part-middleware';
import { firstPartMiddleware } from './edit-new-nomination-of-candidate/first-part-middleware';
import { fourthPartMiddleware } from './edit-new-nomination-of-candidate/fourth-part-middleware';
import { SecondPartMiddleware } from './edit-new-nomination-of-candidate/second-part-middleware';
import { addNominationMiddleware } from './add-new-nomination-of-candidate/add-nomination-middleware';

export const candidateNominationFormMiddleware = [
  firstPartMiddleware,
  ThirdPartMiddleware,
  SecondPartMiddleware,
  fourthPartMiddleware,
  addNominationMiddleware,
];
