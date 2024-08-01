import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileService } from './file.service';

/**
 *
 */
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   *
   * @param createFileDto
   */
  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create();
  }

  /**
   *
   */
  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  /**
   *
   * @param id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  /**
   *
   * @param id
   * @param updateFileDto
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id);
  }

  /**
   *
   * @param id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
