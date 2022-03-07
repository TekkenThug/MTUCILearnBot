import { setGroup } from './groupService';
import { CustomContext } from '@/types/global';
import { ScheduleTime } from '@/types/schedule';
import { parseParameters } from '@/utils';
import { groupKeyboard } from '@/keyboards/dynamicKeyboard';
import { getSchedule } from './scheduleService';
import { scheduleView } from '@/views/view';

interface QueryProviderOptions {
  deleteMessageAfterSend?: boolean;
  answerText?: string;
}

interface QueryProviderFunction {
  (
    ctx: CustomContext,
    callback: (ctx: CustomContext) => Promise<void>,
    options?: QueryProviderOptions
  ): Promise<boolean | void> | undefined
}

/**
 * Query provider (as wrapper for every action)
 * @param ctx - Context
 * @param callback - Action callback
 * @param {QueryProviderOptions} options - Additional options
 */
const queryProvider: QueryProviderFunction = (ctx, callback, options) => {
  const messageIDForDelete = ctx.message ? ctx.message.message_id : undefined;

  if (ctx.callbackQuery) {
    return callback(ctx)
      .then(() => options?.deleteMessageAfterSend ? ctx.deleteMessage(messageIDForDelete) : true)
      .then(() => ctx.answerCbQuery(options?.answerText))
      .catch((error) => console.log(error.message));
  }
};

/**
 * Set group
 * @param ctx
 */
const setGroupAction = async (ctx: CustomContext) => {
  queryProvider(ctx, (ctx) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return setGroup(ctx.callbackQuery.from.id, parseParameters(ctx.match.input) as string);
  }, {
    answerText: 'Группа успешно настроена!',
    deleteMessageAfterSend: true
  });
};

/**
 * Setting service
 * @param ctx
 */
const optionsAction = async (ctx: CustomContext) => {
  queryProvider(ctx, async (ctx) => {
    const selectedOption = parseParameters(ctx.match.input);

    if (selectedOption === 'changeGroup') {
      await ctx.reply('Выбор', await groupKeyboard());
    }
  }, {
    deleteMessageAfterSend: true
  });
};

/**
 * Schedule service
 * @param ctx
 */
const scheduleAction = async (ctx: CustomContext) => {
  queryProvider(ctx, (ctx) => {
    const selectedOption = parseParameters(ctx.match.input);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return getSchedule(ctx.callbackQuery.from.id, selectedOption as ScheduleTime)
      .then((schedule) => {
        ctx.reply(typeof schedule === 'string' ? schedule : scheduleView(schedule), { parse_mode: 'HTML' });
      });
  }, {
    deleteMessageAfterSend: true
  });
};

export default [
  {
    trigger: /^setGroup_*/,
    action: setGroupAction
  },
  {
    trigger: /^option_*/,
    action: optionsAction
  },
  {
    trigger: /^getSchedule_*/,
    action: scheduleAction
  }
];
