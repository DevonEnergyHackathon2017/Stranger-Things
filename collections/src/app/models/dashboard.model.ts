import { Brackets } from './bracket.model';
import { Snapshot, SnapshotInstance } from './snapshot.model';
import { Well } from './well.model';

export class Dashboard {
  Well: Well;
  TotalScore: number;
  Instant: Snapshot;
  Design: SnapshotInstance;
  Bracket: Brackets;
}
