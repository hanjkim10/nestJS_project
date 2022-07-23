import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { Board } from "src/boards/board.entity"
import * as config from 'config'

const dbConfig = config.get('db')

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '9173',
    database: 'board-app',
    entities: [__dirname + '/../**/*.entity.{js,ts}', Board],
    synchronize: true

}