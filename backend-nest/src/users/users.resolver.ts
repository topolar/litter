import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserInput } from '../graphql';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';

@Resolver('User')
@UseGuards(RolesGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('addUser')
  @Roles('admin')
  create(@Args('UserInput') userInput: UserInput) {
    return this.usersService.create(userInput);
  }

  @Query('users')
  @Roles('admin')
  findAll() {
    return this.usersService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: string) {
    console.log('search for user id');
    return this.usersService.findOne(id);
  }
}
