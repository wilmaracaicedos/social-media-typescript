import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(data: CreateUserDto) {
    const newUser = JSON.parse(JSON.stringify(data));
    const salt = 10;
    const users = newUser.map(async (user) => {
      const hashPassword = await bcrypt.hash(user.password, salt);
      user.password = hashPassword;
      user.name = user.username;
      return user;
    });
    const newUsers = Promise.all(users);
    const insertUsers = await newUsers;
    return this.userRepo.insert(insertUsers);
  }
}
