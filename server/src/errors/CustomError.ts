//work today on it after the the school
export class CustomError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.status = status;
  }
}
