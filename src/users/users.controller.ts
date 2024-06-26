import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ErrorParser } from '../utils/error-parser';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private errorParser: ErrorParser,
  ) {}

  @Post()
  async createUser(
    @Body()
    createUserDto: {
      username: string;
      email: string;
      password: string;
    },
  ) {
    const { username, email, password } = createUserDto;
    try {
      const userId: string = await this.usersService.createUser(
        username,
        email,
        password,
      );
      return { userId };
    } catch (err) {
      this.errorParser.parseError(err);
      throw new HttpException('User creation failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':username')
  async findUserByUsername(@Param('username') username: string) {
    const user = await this.usersService.findUserByUsername(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
