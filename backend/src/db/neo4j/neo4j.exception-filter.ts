import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { Neo4jError } from 'neo4j-driver';
import { AuthException } from '../../components/auth/auth.exceptions';

@Catch(Neo4jError)
export class Neo4jExceptionFilter implements ExceptionFilter {
  catch(exception: Neo4jError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = 500;
    let error = 'database-error';
    let message: string[] = ['Something went wrong'];

    if (exception.code === 'Neo.ClientError.Schema.ConstraintValidationFailed') {
      // Node(54776) already exists with label `User` and property `email` = 'duplicate@email.com'
      if (exception.message.includes('already exists with')) {
        throw AuthException.emailAlreadyExists();
      }

      // Node(54778) with label `Test` must have the property `mustExist`
      else if ( exception.message.includes('must have the property') ) {
        statusCode = 400;
        error = 'Bad Request';

        const match = exception.message.match(/`([a-z0-9]+)`/gi);
        if (!match || !match[1]) {
          message = ['Database constraint validation failed'];
        } else {
          message = [`${match[1].replace(/`/g, '')} should not be empty`];
        }
      }
    } else {
      console.error(exception);
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error,
    });
  }
}
