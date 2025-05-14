import { affidavitStepOneMiddleware } from './affidavit-step-one-middleware';
import { movablePropertyMiddleware } from './movable-property-middleware';
import { immovablePropertyMiddleware } from './immovable-property-middleware';
import { liabilitiesMiddleware } from './liabilities-middleware';

export const affidavitFormMiddleware = [
  immovablePropertyMiddleware,
  liabilitiesMiddleware,
  affidavitStepOneMiddleware,
  movablePropertyMiddleware
];
