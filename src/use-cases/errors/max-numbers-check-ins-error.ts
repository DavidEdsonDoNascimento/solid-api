export class MaxNumbersCheckInsError extends Error {
  constructor() {
    super("Max numbers of check-ins reached.");
  }
}
