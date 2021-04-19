import { generateActionsWrapper } from '../generateActionsWrapper';
import { Snapshot } from './Snapshot-d';
import { snapshotSchema } from './snapshotSchema';

export const snapshotActions = generateActionsWrapper<Snapshot>(snapshotSchema);
