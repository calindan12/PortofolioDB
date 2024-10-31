import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, Query, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { WorksService } from './works.service';
import { Work } from './workSchema';
import { UpdateWorkDto } from './UpdateWorkDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express'; // Importă tipul `Request` din Express





@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  // @Post('create/:artistId')
  // create(@Param('artistId') artistId: string, @Body() workDto: any) {
  //   console.log("test: " , workDto , artistId)
  //   return this.worksService.create(workDto, artistId);
  // }


  @Post('create/:artistId')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/images',
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
  async createWork(
    @UploadedFile() file: Express.Multer.File,
    @Body() workDto: any,
    @Param('artistId') artistId: string,
    @Req() req: Request // Adaugă `@Req()` pentru a prelua cererea

  ) {
    const imageUrl = file ? `${req.protocol}://${req.get('host')}/uploads/images/${file.filename}` : null;

    return this.worksService.createWork(workDto, artistId, imageUrl);
  }




  @Get('all')
  findAll() {
    return this.worksService.findAll();
  }

  // @Put('find/:id')
  // update(@Param('id') id: string, @Body() workDto:any) {
  //   return this.worksService.update(id, workDto);
  // }


  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/images',
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
  }))  async updateWork(
    @Param('id') id: string,
    @Body() updateData: UpdateWorkDto,
    @Req() req: Request, // Adaugă `@Req()` pentru a prelua cererea
    @UploadedFile() file?: Express.Multer.File

  ) {

    console.log("url: " , updateData)

    // Determinăm calea pentru noua imagine, dacă fișierul este prezent
    const imageUrl = file ? `${req.protocol}://${req.get('host')}/uploads/images/${file.filename}` : null;


    // Apelăm serviciul de actualizare, trecând `imageUrl` ca parametru
    return this.worksService.update(id, updateData, imageUrl);
  }

  

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.worksService.delete(id);
  }

  @Get('artist/:artistId')
  async getWorksByArtistId(@Param('artistId') artistId: string): Promise<Work[]> {
    return this.worksService.findByArtistId(artistId);
  }

  @Get('visible')
  async getVisibleWorksByArtist(@Query('artistId') artistId: string): Promise<Work[]> {
    if (!artistId) {
      throw new NotFoundException('Artist ID is required');
    }
    return this.worksService.getVisibleWorksByArtist(artistId);
  }

  @Get(':workId')
  async findByWorkId(@Param('workId') workId: string): Promise<Work> {
    return this.worksService.findByWorkId(workId);
  }


 

  // @Delete(':workId')
  // async deleteWork(@Param('workId') workId: string): Promise<void> {
  //   return this.worksService.delete(workId);
  // }


}
