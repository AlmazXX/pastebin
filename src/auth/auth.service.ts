import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare as bcryptCompare, hash as bcryptHash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RawJwtPayload } from './strategies/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  private async hash(password: string) {
    return bcryptHash(password, this.configService.get<number>('hashSalt'));
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) throw new BadRequestException('User already exists');

    const hashedPassword = await this.hash(dto.password);

    const user = await this.prismaService.user.create({
      data: { ...dto, password: hashedPassword },
    });

    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
    };
  }

  async validateUser(dto: LoginDto): Promise<RawJwtPayload> {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) return null;

    const isMatched = await bcryptCompare(dto.password, user.password);

    if (!isMatched) return null;

    return { email: user.email, sub: user.id };
  }

  async login(user: RawJwtPayload) {
    return { access_token: this.jwtService.sign(user) };
  }
}
