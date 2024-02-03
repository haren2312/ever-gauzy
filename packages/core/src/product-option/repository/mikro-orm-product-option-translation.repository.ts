import { EntityRepository } from '@mikro-orm/core';
import { ProductOptionTranslation } from '../product-option-translation.entity';

export class MikroOrmProductOptionTranslationRepository extends EntityRepository<ProductOptionTranslation> { }