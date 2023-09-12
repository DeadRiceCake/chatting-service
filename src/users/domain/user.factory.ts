import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { User } from './user';

@Injectable()
export class UserFactory {
  constructor(private eventBus: EventBus) {}

  public create(
    id: string,
    mobileNumber: string,
    nickname: string,
    isActivated = true,
    role = 'user',
    ratingScore = 36.5,
    createdAt = new Date(),
  ): User {
    const user = new User(
      id,
      mobileNumber,
      isActivated,
      role,
      nickname,
      ratingScore,
      createdAt,
    );

    return user;
  }
}
