import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ClientModule } from './application/usecases/client/client.module';

@Module({
  imports: [
    DatabaseModule,
    ClientModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
