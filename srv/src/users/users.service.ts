import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) { }

  // get list of all users by pages
  async findUsers(page: number = 0, limit: number = 20): Promise<UsersEntity[]> {
    return await this.usersRepo.find({ skip: page * limit, take: limit });
  }

}