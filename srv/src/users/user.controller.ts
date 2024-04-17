import { UserService } from './users.service';
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UsersResponseDto } from "./users.response.dto";

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) { }

  @Get()
  async getUsers(@Query('page') page: number) {
    this.logger.log('Get all users on page ' + page);
    const users = await this.userService.findUsers(page);
    return users.map((user) => UsersResponseDto.fromUsersEntity(user));
  }

}
