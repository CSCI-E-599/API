// src/items/items.interface.ts
import { IDrug } from './drug.interface';

export interface IDrugs {
    [key: number]: IDrug;
}