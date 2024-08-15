import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';
import { FileService } from './file.service';

/**
 *
 */
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * Endpoint para crear un archivo
   * @param {CreateFileDto} createFileDto - Datos del archivo a crear
   * @returns {Promise<number>} - Id del archivo creado
   */
  @Post()
  create(@Body() createFileDto: CreateFileDto): Promise<number> {
    return this.fileService.create(createFileDto);
  }

  /**
   * Endpoint para obtener todos los archivos
   * @returns {Promise<File[]>} - Archivos encontrados
   */
  @Get()
  findAll(): Promise<File[]> {
    return this.fileService.findAll();
  }

  /**
   * Endpoint para obtener un archivo
   * @param {string} id - Id del archivo a obtener
   * @returns {Promise<File>} - Archivo encontrado
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<File> {
    return this.fileService.findOne({ id: +id });
  }

  /**
   *
   * @param {string} id - Id del archivo a actualizar
   * @param {UpdateFileDto} updateFileDto - Datos del archivo a actualizar
   * @returns {Promise<boolean>} - Resultado de la actualización
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto): Promise<boolean> {
    return this.fileService.update(+id, updateFileDto);
  }

  /**
   * Endpoint para eliminar un archivo
   * @param {string} id - Id del archivo a eliminar
   * @returns {Promise<boolean>} - Resultado de la eliminación
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.fileService.remove(+id);
  }
}
