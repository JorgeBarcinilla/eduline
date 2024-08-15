import { Inject, Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';

/**
 *
 */
@Injectable()
export class FileService {
  constructor(
    @Inject(File)
    private fileRepository: Repository<File>
  ) {}

  /**
   * Metodo para crear un archivo
   * @param {CreateFileDto} createFileDto - Datos del archivo a crear
   * @returns {Promise<number>} - Archivo creado
   */
  async create(createFileDto: CreateFileDto): Promise<number> {
    const result = await this.fileRepository.insert(createFileDto);
    return result.identifiers[0].id;
  }

  /**
   * Metodo para obtener todos los archivos
   * @returns {Promise<File[]>} - Archivos encontrados
   */
  findAll(): Promise<File[]> {
    return this.fileRepository.find();
  }

  /**
   * Metodo para obtener un archivo
   * @param {FindOptionsWhere<File> | FindOptionsWhere<File>[]} where - Condiciones de busqueda
   * @returns {Promise<File>} - Archivo encontrado
   */
  findOne(where: FindOptionsWhere<File> | FindOptionsWhere<File>[]): Promise<File> {
    return this.fileRepository.findOne({ where });
  }

  /**
   * Metodo para actualizar un archivo
   * @param {number} id - Id del archivo a actualizar
   * @param {UpdateFileDto} updateFileDto - Datos del archivo a actualizar
   * @returns {Promise<boolean>} - Resultado de la actualización
   */
  async update(id: number, updateFileDto: UpdateFileDto): Promise<boolean> {
    const result = await this.fileRepository.update(id, updateFileDto);
    return result.affected > 0;
  }

  /**
   * Metodo para eliminar un archivo
   * @param {number} id - Id del archivo a eliminar
   * @returns {Promise<boolean>} - Resultado de la eliminación
   */
  async remove(id: number): Promise<boolean> {
    const result = await this.fileRepository.delete(id);
    return result.affected > 0;
  }
}
