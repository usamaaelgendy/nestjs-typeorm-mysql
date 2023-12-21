import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { ProfileEntity } from './users/entities/profile.entity';
import { PostsModule } from './posts/posts.module';
import { PostEntity } from './posts/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'usama',
      password: 'usamausama',
      database: 'nestjs_db',
      entities: [UserEntity, ProfileEntity, PostEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
