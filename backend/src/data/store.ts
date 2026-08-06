import { v4 as uuidv4 } from 'uuid';
import { Item, CreateItemDto, UpdateItemDto } from '../types/item';

class Store {
  private items: Map<string, Item> = new Map();

  constructor() {
    this.seed();
  }

  private seed() {
    this.create({ title: 'First Note', content: 'This is the first note.' });
    this.create({ title: 'Second Note', content: 'This is the second note.' });
    this.create({ title: 'Third Note', content: 'This is the third note.' });
  }

  getAll(): Item[] {
    return Array.from(this.items.values());
  }

  getById(id: string): Item | undefined {
    return this.items.get(id);
  }

  create(dto: CreateItemDto): Item {
    const id = uuidv4();
    const now = new Date().toISOString();
    const newItem: Item = {
      id,
      title: dto.title,
      content: dto.content,
      createdAt: now,
      updatedAt: now,
    };
    this.items.set(id, newItem);
    return newItem;
  }

  update(id: string, dto: UpdateItemDto): Item | undefined {
    const existing = this.items.get(id);
    if (!existing) return undefined;

    const updatedItem: Item = {
      ...existing,
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    this.items.set(id, updatedItem);
    return updatedItem;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }
}

export const store = new Store();
