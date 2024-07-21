import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { UserLoginDto,UserSignUpDto,UserUpdateDto } from './dto/user-dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService : DatabaseService){}
  create(createUserDto: Prisma.userCreateInput) {
    return this.databaseService.user.create({
      data:createUserDto
    })
  }


  update(id: number, updateUserDto: Prisma.userUpdateInput) {
    return this.databaseService.user.update({
      where:{
        userid_ :id,
      },
      data:updateUserDto
    })
  }

  remove(id: number) {
    return this.databaseService.user.delete({
      where:{
        userid_:id
      }
    })
  }
}
