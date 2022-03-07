import { Context } from 'telegraf';

/**
 * Custom context for Telegraf API
 */
export interface CustomContext extends Context {
  match: {
    input: string,
  }
}
