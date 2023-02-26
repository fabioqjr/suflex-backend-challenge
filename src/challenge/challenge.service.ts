import { BadRequestException, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChallengeProductDTO } from './dto/challenge-product.dto';

@Injectable()
export class ChallengeService {
  constructor(private readonly prisma: PrismaService) {}

  async convertCsv(_csv: Express.Multer.File) {
    const csvFile = readFileSync(_csv.path);
    const csvData = csvFile.toString();

    const parsedCsv = parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().trim(),
      complete: (results) => results.data,
    });

    if (
      !parsedCsv.data[0].hasOwnProperty('name') ||
      !parsedCsv.data[0].hasOwnProperty('dias_para_vencimento')
    ) {
      throw new BadRequestException(
        'CSV mal formatado. Defina os cabeçalhos com "name" e "dias_para_vencimento"',
      );
    }

    await this.prisma.products.deleteMany();

    parsedCsv.data.forEach(async (product: ChallengeProductDTO) => {
      await this.prisma.products.createMany({
        data: {
          name: product.name.trim(),
          dias_para_vencimento: parseInt(product.dias_para_vencimento),
        },
      });
    });

    return this.listAll();
  }

  listAll() {
    return this.prisma.products.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
      select: {
        name: true,
        dias_para_vencimento: true,
      },
    });
  }

  expireToday() {
    return this.prisma.products.findMany({
      where: {
        dias_para_vencimento: 0,
      },
      orderBy: [
        {
          name: 'asc',
        },
      ],
      select: {
        name: true,
        dias_para_vencimento: true,
      },
    });
  }

  expireTomorrow() {
    return this.prisma.products.findMany({
      where: {
        dias_para_vencimento: 1,
      },
      orderBy: [
        {
          name: 'asc',
        },
      ],
      select: {
        name: true,
        dias_para_vencimento: true,
      },
    });
  }
}
