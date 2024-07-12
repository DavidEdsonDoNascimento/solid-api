export class LateCheckInValidationError extends Error {
  constructor() {
    super("The check-in validation limit has expired.");
  }
}
