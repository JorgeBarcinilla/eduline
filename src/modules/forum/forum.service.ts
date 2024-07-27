import { Injectable } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Forum } from './entities/forum.entity';
import { Repository } from 'typeorm';
import { ForumMessage } from './entities/forum-message.entity';

/**
 *
 */
@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private forumRepository: Repository<Forum>,
    @InjectRepository(ForumMessage)
    private forumMessageRepository: Repository<ForumMessage>,
  ) {}

  /**
   *
   * @param createForumDto
   */
  async create(createForumDto: CreateForumDto) {
    const newForum = await this.forumRepository.save(createForumDto);
    return newForum.id;
  }

  /**
   *
   */
  findAll() {
    return this.forumRepository.find();
  }

  /**
   *
   * @param id
   */
  findOne(id: number) {
    return this.forumRepository.findOne({ where: { id } });
  }

  /**
   *
   * @param id
   * @param updateForumDto
   */
  update(id: number, updateForumDto: UpdateForumDto) {
    return this.forumRepository.update(id, updateForumDto);
  }

  /**
   *
   * @param id
   */
  remove(id: number) {
    return this.forumRepository.delete(id);
  }

  /**
   *
   * @param forumId
   */
  findAllMessages(forumId: number) {
    return this.forumMessageRepository.find({
      where: { forum: { id: forumId } },
      relations: ['forum'],
    });
  }
}
