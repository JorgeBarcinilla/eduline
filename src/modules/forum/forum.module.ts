import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forum } from './entities/forum.entity';
import { ForumMessage } from './entities/forum-message.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Forum, ForumMessage])
  ],
  controllers: [ForumController],
  providers: [ForumService],
})
export class ForumModule {}
