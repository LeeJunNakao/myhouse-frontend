export class ResponseError extends Error {
  response: { data: { message: string } };

  constructor(message: string) {
    super();
    this.response = {
      data: {
        message,
      },
    };
  }
}
