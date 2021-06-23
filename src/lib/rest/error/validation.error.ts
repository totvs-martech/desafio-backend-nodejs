export class ValidationError extends Error {

  type: String;
  errors: any;

  constructor(error) {
    super(error.message)

    this.name = 'ValidationError'
    this.type = 'validation'
    this.errors = error.errors
  }
}