import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/domain/entities/client.entity';
import { DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'crud-test',
    database: 'crud',
    entities: [Client],
    synchronize: true,
}

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async() => {
                return {
                    ...dataSourceOptions,
                }
            }
        })
    ]
})
export class DatabaseModule {}
