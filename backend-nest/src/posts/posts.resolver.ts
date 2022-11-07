import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostInput, User } from '../graphql';
import { UsersService } from '../users/users.service';
import { UserModel } from '../users/users.model';
import { CurrentUser } from '../auth/user.decorator';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Roles } from '../auth/roles/roles.decorator';

@Resolver('Post')
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  @ResolveField('user', () => UserModel)
  public async getUserProperty(@Parent() parent): Promise<User> {
    return parent.userId ? this.usersService.findOne(parent.userId) : null;
  }

  @Query('posts')
  findAll() {
    return this.postsService.findAll();
  }

  @Query('post')
  findOne(@Args('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Mutation('addPost')
  async create(
    @Args('input') postInput: PostInput,
    @CurrentUser() user?: User,
  ) {
    try {
      if (user) postInput.userId = user.id;
      const post = await this.postsService.create(postInput);
      return {
        success: true,
        post,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  @Roles('admin')
  @Mutation('updatePost')
  async update(@Args('id') id: string, @Args('input') postInput: PostInput) {
    const post = await this.postsService.update(id, postInput);
    try {
      return {
        success: true,
        post,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  /**
   * Deletion rules:
   * 1. Post without defined user can be deleted by everyone
   * 2. Post with defined user can be deleted by same user or any Admin user
   * @param id
   * @param user
   */
  @Mutation('deletePost')
  async remove(@Args('id') id: string, @CurrentUser() user) {
    let post = null;
    try {
      post = await this.postsService.findOne(id);
    } catch (e) {}

    try {
      if (!post) {
        throw new BadRequestException('Post neexistuje');
      }
      if (post.userId) {
        if (
          !user ||
          (user.id !== post.userId && !user.roles.includes('admin'))
        ) {
          throw new ForbiddenException('Přístup odepřen!');
        }
      }
      await this.postsService.remove(id);
      return { success: true };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
