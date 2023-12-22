import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GenericResponseDto } from '../dto/generic-response.dto';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, GenericResponseDto<T | null>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<GenericResponseDto<T | null>> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode || 200; // Default to 200 if statusCode is not set
        const isSuccess = statusCode >= 200 && statusCode < 300;

        return {
          data: isSuccess ? data : null,
          message: isSuccess
            ? response.statusMessage || 'Request was successful.'
            : 'An error occurred.',
          statusCode,
          isSuccess,
        };
      }),
      catchError((error) => {
        // Handle the error here
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode || 500;

        return throwError({
          data: null,
          message: 'An error occurred.',
          statusCode,
          isSuccess: false,
          error: {
            errorMessage: error.message || 'Internal Server Error',
            details: error.stack || null,
          },
        });
      }),
    );
  }
}
