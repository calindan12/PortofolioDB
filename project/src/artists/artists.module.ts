import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Artist, ArtistSchema } from './artistSchema';
import {ArtistsService } from './artists.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }])],
  providers: [ArtistsService],
  controllers: [ArtistsController],
  exports: [MongooseModule] 

})
export class ArtistsModule {}
