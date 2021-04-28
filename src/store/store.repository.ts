import { BadRequestException } from '@nestjs/common';
import { CreateStoreDto } from 'src/auth/dto/create-store.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Store } from './store.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateStoreDto } from './dto/update-store.dto';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { LoginDto } from 'src/auth/dto/login.dto';
import { HandleToken } from 'src/sharing/handle-token.module';
@EntityRepository(Store)
export class StoreRepository extends Repository<Store> {
  async getAllStore(): Promise<Store[]> {
    const allStore: Store[] = await this.find();
    return allStore.map((item) => this.handleReponse(item));
  }

  private handleReponse(store: Store): Store {
    store.avatar_store = `${process.env.DOMAIN}/store/${store.avatar_store}`;
    delete store.password;
    return store;
  }

  async getStorePagination(
    limit: number,
    currentPage: number,
  ): Promise<Object> {
    const skip: number = (currentPage - 1) * limit;

    const [allStore, total] = await this.findAndCount({
      skip,
      take: limit,
    });

    if (total === 0) {
      return {
        items: [],
      };
    }
    const totalPage = Math.ceil(total / limit);

    if (currentPage > totalPage) {
      throw new BadRequestException(
        'Current page can not more than total page',
      );
    }

    return {
      totalPage,
      currentPage,
      totalItem: total,
      items: allStore,
    };
  }

  async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    const foundStore: Store = await this.findOne({
      where: { email: createStoreDto.email },
    });

    if (foundStore) {
      throw new BadRequestException(
        `Email '${createStoreDto.email}' have already exist `,
      );
    }
    const newStore = new Store();
    newStore.id_store = uuidv4();
    newStore.status = true;
    for (const key in createStoreDto) {
      newStore[key] = createStoreDto[key];
    }

    await newStore.save();
    return this.handleReponse(newStore);
  }

  async changeStatus(idStore: string): Promise<Store> {
    const foundStore: Store = await this.findOne({
      where: { id_store: idStore },
    });

    if (!foundStore) {
      throw new BadRequestException(`Can not find id '${idStore}' `);
    }

    foundStore.status = !foundStore.status;
    await foundStore.save();
    return this.handleReponse(foundStore);
  }

  async uploadAvatar(fileName: string, idStore: string): Promise<Store> {
    const foundStore: Store = await this.findOne({
      where: { id_store: idStore },
    });

    if (!foundStore) {
      throw new BadRequestException(`Can not find store id '${idStore}'`);
    }

    if (foundStore.avatar_store) {
      fs.unlinkSync(`public/store/${foundStore.avatar_store}`);
    }
    foundStore.avatar_store = fileName;

    await foundStore.save();
    return this.handleReponse(foundStore);
  }

  async updateStore(
    updateStoreDto: UpdateStoreDto,
    idStore: string,
  ): Promise<Store> {
    const foundStore: Store = await this.findOne({
      where: { id_store: idStore },
    });

    if (!foundStore) {
      throw new BadRequestException(`Can not find store id '${idStore}'`);
    }

    foundStore.address = updateStoreDto.address;
    foundStore.name_store = updateStoreDto.name_store;
    foundStore.password = await bcrypt.hash(
      updateStoreDto.password,
      +process.env.BCRYPT_SALT,
    );

    await foundStore.save();
    return this.handleReponse(foundStore);
  }

  async loginStore(loginDto: LoginDto): Promise<Object> {
    const foundStore: Store = await this.findOne({
      where: { email: loginDto.username },
    });

    if (!foundStore) {
      throw new BadRequestException('Wrong Username');
    }

    const check: Boolean = await bcrypt.compare(
      loginDto.password,
      foundStore.password,
    );

    if (!check) {
      throw new BadRequestException('Wrong Password');
    }

    const token: string = new HandleToken().sign({
      id_store: foundStore.id_store,
    });

    return {
      ...this.handleReponse(foundStore),
      token,
    };
  }
}
