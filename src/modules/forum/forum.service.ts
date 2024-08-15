import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { ForumMessage } from './entities/forum-message.entity';
import { Forum } from './entities/forum.entity';

/**
 *
 */
@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private forumRepository: Repository<Forum>,
    @InjectRepository(ForumMessage)
    private forumMessageRepository: Repository<ForumMessage>
  ) {}

  /**
   * Metodo para crear un nuevo foro
   * @param {CreateForumDto} createForumDto - Objeto con los datos del foro
   * @returns {Promise<number>} - Id del foro creado
   */
  async create(createForumDto: CreateForumDto): Promise<number> {
    const newForum = await this.forumRepository.save(createForumDto);
    return newForum.id;
  }

  /**
   * Metodo para obtener todos los foros
   * @returns {Promise<Forum[]>} - Lista de foros
   */
  findAll(): Promise<Forum[]> {
    return this.forumRepository.find();
  }

  /**
   * Metodo para obtener un foro
   * @param {FindOptionsWhere<Forum> | FindOptionsWhere<Forum>[]} where - Objeto con los datos del foro
   * @returns {Promise<Forum>} - Foro encontrado
   */
  findOne(where: FindOptionsWhere<Forum> | FindOptionsWhere<Forum>[]): Promise<Forum> {
    return this.forumRepository.findOne({ where });
  }

  /**
   * Metodo para actualizar un foro
   * @param {number} id - Id del foro
   * @param {UpdateForumDto} updateForumDto - Objeto con los datos del foro
   * @returns {Promise<boolean>} - Resultado de la actualización
   */
  async update(id: number, updateForumDto: UpdateForumDto): Promise<boolean> {
    const result = await this.forumRepository.update(id, updateForumDto);
    return result.affected > 0;
  }

  /**
   * Metodo para eliminar un foro
   * @param {number} id - Id del foro
   * @returns {Promise<boolean>} - Resultado de la eliminación
   */
  async remove(id: number): Promise<boolean> {
    const result = await this.forumRepository.delete(id);
    return result.affected > 0;
  }

  /**
   * Metodo para obtener todos los mensajes de un foro
   * @param {number} forumId - Id del foro
   * @returns {Promise<ForumMessage[]>} - Lista de mensajes del foro
   */
  findAllMessages(forumId: number): Promise<ForumMessage[]> {
    return this.forumMessageRepository.find({
      where: { forum: { id: forumId } },
      relations: ['forum']
    });
  }
}
