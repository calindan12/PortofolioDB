import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Artist } from './artistSchema';
import { CreateArtistDto } from './createArtistDto';

@Injectable()
export class ArtistsService {
    constructor(@InjectModel(Artist.name)private  artistModel: Model<Artist>) {}

    async createArtist(artistDto: any, imageUrl: string | null): Promise<Artist> {
      const newArtist = new this.artistModel({
        ...artistDto,
        imageUrl // Salvează URL-ul imaginii în documentul artistului
      });
      return newArtist.save();
    }

    async findAll(): Promise<Artist[]> {
      return this.artistModel.find().exec();
    }

    async findArtistById(artistId: string): Promise<Artist> {
      // Convertim `artistId` în `ObjectId` dacă este un string
      const artistObjectId = new Types.ObjectId(artistId);
  
      const artist = await this.artistModel.findById(artistObjectId).exec();
      if (!artist) {
        throw new NotFoundException(`Artist with ID ${artistId} not found`);
      }
      return artist;
    }

}
