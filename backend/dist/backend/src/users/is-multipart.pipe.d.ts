import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class IsMultipartPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
