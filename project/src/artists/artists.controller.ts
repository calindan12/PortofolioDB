import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './createArtistDto';
import { Artist } from './artistSchema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

@Controller('artists')
export class ArtistsController {
    constructor(private readonly artistsService: ArtistsService) {}

    // @Post('createArtist')
    // create(@Body() createArtistDto: CreateArtistDto){
    //     return this.artistsService.createArtist(createArtistDto);
    // }



    @Post('create')
    @UseInterceptors(FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/users', // Salvează imaginile în `uploads/users`
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, `${uuidv4()}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const mimeType = allowedTypes.test(file.mimetype);
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extname) {
          return cb(null, true);
        }
        cb(new Error('Only images are allowed'), false);
      },
    }))
    async createArtist(
      @UploadedFile() file: Express.Multer.File,
      @Body() artistDto: any,
      @Req() req: Request
    ) {
      const imageUrl = file ? `${req.protocol}://${req.get('host')}/uploads/users/${file.filename}` : null;
      return this.artistsService.createArtist(artistDto, imageUrl);
    }



    @Get('findAllArtists')
    async findArtists(): Promise<Artist[]> {
      return this.artistsService.findAll();
    }

    @Get(':artistId')
    async findArtistById(@Param('artistId') artistId: string): Promise<Artist> {
      return this.artistsService.findArtistById(artistId);
    }
    


}
