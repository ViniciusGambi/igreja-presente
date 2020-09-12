import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Church from '../models/Church';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  url: string;
  email: string;
  password: string;
}

class CreateChurchService {
  public async execute({
    id,
    name,
    url,
    email,
    password,
  }: Request): Promise<Church> {
    const churchsRepository = getRepository(Church);

    const emailExists = await churchsRepository.findOne({
      where: { email },
    });

    if (emailExists) {
      throw new AppError('Email already exists');
    }

    const hashedPassword = await hash(password, 8);

    const church = churchsRepository.create({
      id,
      name,
      url,
      email,
      password: hashedPassword,
    });

    await churchsRepository.save(church);

    return church;
  }
}

export default CreateChurchService;
