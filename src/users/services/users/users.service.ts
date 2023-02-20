import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import {
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  async fetchUsers() {
    return await this.userRepository.find({
      relations: ['profile', 'posts'],
    });
  }

  async createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create(userDetails);
    return await this.userRepository.save(newUser);
  }

  async updateUser(id: number, updateDetails: UpdateUserParams) {
    return await this.userRepository.update({ id }, updateDetails);
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete({ id });
  }

  async createUserProfile(id: number, userProfile: CreateUserProfileParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    const newProfile = this.profileRepository.create(userProfile);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return await this.userRepository.save(user);
  }

  async createUserPost(id: number, userPost: CreateUserPostParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    const newPost = this.postRepository.create({ ...userPost, user });
    return await this.postRepository.save(newPost);
  }
}
