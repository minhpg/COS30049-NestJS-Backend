import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    const { email, username, password, walletAddress } = createUserDto;
    if (email) user.email = email;
    if (username) user.username = username;
    if (walletAddress) user.walletAddress = walletAddress;
    await user.createPasswordHash(password);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { email, username, password, walletAddress } = updateUserDto;

    const user = new User();

    if (email) user.email = email;
    if (username) user.username = username;
    if (walletAddress) user.walletAddress = walletAddress;
    if (password) await user.createPasswordHash(password);
    await this.userRepository.update(id, user);

    return this.userRepository.findOneByOrFail({ id });
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
