export class Brackets {
  Pressure: BracketSet;
  Rate: BracketSet;
}

export class BracketSet {
  Previous: BracketPoint;
  Next: BracketPoint;
  Current: number;
}

export class BracketPoint {
  Value: number;
  Cost: number;
}
