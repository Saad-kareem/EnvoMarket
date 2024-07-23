import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Constants } from 'util/Constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRespostory: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.ADMIN_ROLE;
    return this.userRespostory.save(user);
  }

  findAll() {
    return this.userRespostory.find();
  }
  findUserByEmail(email: string) {
    return this.userRespostory.findOneOrFail({ where: { email: email } });
  }

  remove(id: number) {
    return this.userRespostory.delete({ id });
  }
}
