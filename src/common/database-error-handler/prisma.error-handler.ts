/////////////////////////////////////////////////////////////////////

import {
  DataNotFoundError,
  UniqueConstraintFailedError,
} from '@common/database-error-handler/errors';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaError } from 'prisma-error-enum';

export class PrismaDatabaseErrorHandler {
  public static HandleError(error: any): void {
    this.HandlePrismaErrors(error);
  }

  private static HandlePrismaErrors = (error: any) => {
    if (error instanceof PrismaClientKnownRequestError) {
      const exception = error as PrismaClientKnownRequestError;
      this.HandlePrismaClientKnownRequestError(exception);
    } else if (error.name === 'NotFoundError') {
      throw new DataNotFoundError(error.message);
    }

    throw error;
  };

  private static HandlePrismaClientKnownRequestError(
    error: PrismaClientKnownRequestError,
  ) {
    const errorCode = error.code;

    switch (errorCode) {
      case PrismaError.UniqueConstraintViolation: {
        const msg = `${error.meta.target[0]} already in use`;
        throw new UniqueConstraintFailedError(error.meta.target[0], msg);
      }
    }
  }
}
