export class PasswordMatchException extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "PasswordMatchException";
    this.statusCode = statusCode;

    // Fix for instanceof checks when using transpilers
    Object.setPrototypeOf(this, PasswordMatchException.prototype);
  }
}
