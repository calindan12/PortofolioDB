import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { WorksModule } from './works/works.module';
import { Connection } from 'mongoose';
import { ArtistsModule } from './artists/artists.module';
import { HttpClientModule } from '@angular/common/http'; // Importă HttpClientModule


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Permite accesarea variabilelor de mediu în orice modul
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('STR_MONGO');
        console.log('Connecting to database at:', uri); // Verificare variabilă DATABASE_URL
        return { uri };
      },
    }),
    WorksModule,
    ArtistsModule,
  ],
  controllers: [AppController], // Înregistrează AppController
  providers: [AppService], // Înregistrează AppService
})

export class AppModule implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    this.connection.on('connected', () => {
      console.log('Successfully connected to the database');
    });

    this.connection.on('error', (err) => {
      console.error('Error connecting to the database:', err);
    });
  }
}
