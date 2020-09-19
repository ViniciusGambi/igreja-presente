import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Church from '../infra/typeorm/entities/Church';
import IChurchsRepository from '../repositories/IChurchsRepository';

interface IRequest {
  id: string;
  name: string;
  url: string;
  email: string;
  password: string;
}

@injectable()
class CreateChurchService {
  constructor(
    @inject('ChurchsRepository')
    private churchsRepository: IChurchsRepository,
  ) {}

  public async execute({
    id,
    name,
    url,
    email,
    password,
  }: IRequest): Promise<Church> {
    const emailExists = await this.churchsRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email already exists');
    }

    const hashedPassword = await hash(password, 8);

    const church = await this.churchsRepository.create({
      id,
      name,
      url,
      email,
      password: hashedPassword,
    });

    return church;
  }
}

export default CreateChurchService;
