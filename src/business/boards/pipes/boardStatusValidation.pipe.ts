import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = Object.values(BoardStatus);

  transform(value: any) {
    if (!this.isStatusValid(value.status)) {
      throw new BadRequestException(`${value.status} is an invalid status`);
    }
    value.status = value.status.toUpperCase();

    return value;
  }

  private isStatusValid(status: any) {
    status = status.toUpperCase();
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
