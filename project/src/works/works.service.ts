import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Work } from './workSchema';
import { Artist } from 'src/artists/artistSchema';
import { Observable } from 'rxjs';
import { UpdateWorkDto } from './UpdateWorkDto';
import * as path from 'path';
import * as fs from 'fs';




@Injectable()
export class WorksService {
  constructor(@InjectModel(Work.name) private workModel: Model<Work>,@InjectModel(Artist.name) private artistModel: Model<Artist>) {}

  async createWork(workDto: any, artistId: string, imageUrl: string | null): Promise<Work> {
    // 1. Creează lucrarea, incluzând URL-ul imaginii
    const newWork = new this.workModel({
      ...workDto,
      artistId: new Types.ObjectId(artistId),
      imageUrl
    });
    console.log("newWork: " , newWork)
    const savedWork = await newWork.save();

    // 2. Adaugă ID-ul lucrării la array-ul `works` al artistului
    await this.artistModel.findByIdAndUpdate(
      artistId,
      { $push: { works: savedWork._id } },
      { new: true }
    );

    return savedWork;
  }

  async findAll(): Promise<Work[]> {
    return this.workModel.find().exec();
  }

  // async update(id: string, workDto:any): Promise<Work> {
  //   return this.workModel.findByIdAndUpdate(id, workDto, { new: true });
  // }


  async update(workId: string, updateWorkDto: UpdateWorkDto, imageUrl: string | null): Promise<Work> {
    const existingWork = await this.workModel.findById(workId).exec();

    console.log("data: " , updateWorkDto)
  
    if (!existingWork) {
      throw new NotFoundException(`Work with ID ${workId} not found`);
    }
  
    // Ștergem imaginea anterioară dacă există un URL nou pentru imagine
    if (imageUrl && existingWork.imageUrl !== imageUrl) {
      const oldImagePath = path.resolve('uploads', existingWork.imageUrl);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Șterge imaginea veche
      }
      updateWorkDto.imageUrl = imageUrl; // Setăm noul URL al imaginii
    }
  
    const updatedWork = await this.workModel
      .findByIdAndUpdate(workId, updateWorkDto, { new: true, useFindAndModify: false })
      .exec();
  
    return updatedWork;
  }
  


  async delete(id: string): Promise<any> {
    const result = await this.workModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Work with ID ${id} not found`);
    }
  }

  async findByArtistId(artistId: string): Promise<Work[]> {
    return this.workModel.find({ artistId: new Types.ObjectId(artistId) }).exec();
  }

  async findByWorkId(workId: string): Promise<Work> {
    const work = await this.workModel.findById(workId).exec();
    if (!work) {
      throw new NotFoundException(`Work with ID ${workId} not found`);
    }
    return work;
  }


  async getVisibleWorksByArtist(artistId: string): Promise<Work[]> {
    return this.workModel.find({ artistId: new Types.ObjectId(artistId), isVisible: true }).exec();
  }

}
