import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Res() res, @Body() payload: CreateUserDto) {
    const saved = await this.usersService.create(payload);
    if (saved) {
      return res.status(HttpStatus.CREATED).json({
        data: saved,
      });
    }
  }
}
