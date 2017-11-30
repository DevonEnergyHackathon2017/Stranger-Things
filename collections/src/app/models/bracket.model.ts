export class Brackets {
  Pressure: BracketSet;
  Rate: BracketSet;
}

export class BracketSet {
  Previous: BracketPoint;
  Next: BracketPoint;
  Current: Number;
}

export class BracketPoint {
  Value: Number;
  Cost: Number;
}
