import { Module } from '@nestjs/common';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Work, WorkSchema } from './workSchema';
import { ArtistsModule } from '../artists/artists.module'; // Importă ArtistModule


@Module({
  imports: [MongooseModule.forFeature([{ name: Work.name, schema: WorkSchema }]),ArtistsModule],
  providers: [WorksService],
  controllers: [WorksController],
})
export class WorksModule {}
