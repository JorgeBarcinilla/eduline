import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { Forum } from './entities/forum.entity';
import { ForumService } from './forum.service';

/**
 *
 */
@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  /**
   * Endpoint para crear un nuevo foro
   * @param {CreateForumDto} createForumDto - Objeto con los datos del foro
   * @returns {Promise<number>} - Id del foro creado
   */
  @Post()
  create(@Body() createForumDto: CreateForumDto): Promise<number> {
    return this.forumService.create(createForumDto);
  }

  /**
   * Endpoint para obtener todos los foros
   * @returns {Promise<Forum[]>} - Lista de foros
   */
  @Get()
  findAll(): Promise<Forum[]> {
    return this.forumService.findAll();
  }

  /**
   * Endpoint para obtener un foro
   * @param {number} id - Id del foro
   * @returns {Promise<Forum>} - Foro encontrado
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Forum> {
    return this.forumService.findOne({ id: +id });
  }

  /**
   * Endpoint para actualizar un foro
   * @param {string} id - Id del foro
   * @param {UpdateForumDto} updateForumDto - Objeto con los datos del foro
   * @returns {Promise<boolean>} - Resultado de la actualización
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForumDto: UpdateForumDto): Promise<boolean> {
    return this.forumService.update(+id, updateForumDto);
  }

  /**
   * Endpoint para eliminar un foro
   * @param {string} id - Id del foro
   * @returns {Promise<boolean>} - Resultado de la eliminación
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.forumService.remove(+id);
  }
}
