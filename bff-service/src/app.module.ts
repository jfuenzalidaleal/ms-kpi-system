import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KpisModule } from './kpis/kpis.module';

@Module({
  imports: [KpisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
