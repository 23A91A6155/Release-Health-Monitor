import { Router, Request, Response } from 'express';
import * as Sentry from '@sentry/node';
import { store } from '../data/store';
import { CreateItemDto, UpdateItemDto } from '../types/item';

export const itemsRouter = Router();

itemsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const items = store.getAll();
    res.status(200).json(items);
  } catch (error) {
    console.error('[GET /api/items] Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

itemsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = store.getById(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(`[GET /api/items/${req.params.id}] Error:`, error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

itemsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body as CreateItemDto;
    if (!title || !content) {
      res.status(400).json({ error: 'Title and content are required' });
      return;
    }
    const newItem = store.create({ title, content });
    res.status(201).json(newItem);
  } catch (error) {
    console.error('[POST /api/items] Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

itemsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const dto: UpdateItemDto = req.body;
    const updated = store.update(req.params.id, dto);
    if (!updated) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error(`[PUT /api/items/${req.params.id}] Error:`, error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

itemsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = store.delete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(`[DELETE /api/items/${req.params.id}] Error:`, error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
