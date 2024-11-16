import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "../entities/client.entity";
import { Repository } from "typeorm";

@Injectable()
export class FindAllService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>
    ) { }

    async findAll() {
        try {
            return await this.clientRepository.find();
        } catch (err) {
            throw err;
        }
    }
}