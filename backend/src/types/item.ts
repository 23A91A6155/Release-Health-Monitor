export interface Item {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemDto {
  title: string;
  content: string;
}

export interface UpdateItemDto {
  title?: string;
  content?: string;
}
