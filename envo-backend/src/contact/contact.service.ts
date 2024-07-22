import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactReposity: Repository<Contact>,
  ) {}

  create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactReposity.create(createContactDto);
    return this.contactReposity.save(contact);
  }

  findAll() {
    return this.contactReposity.find()
  }
}
