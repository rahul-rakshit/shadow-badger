import { program } from 'commander';
import { currencyActions, Currency } from '../../../../entity/Currency';
import { logAndExitNotFoundMessage } from '../../../cli-helpers/logAndExitNotFoundMessage';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';
import { logObject } from '../../../cli-helpers/logObject';

export const viewCurrencyCommand = program
  .command('currency')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display the first currency that satisfies certain criteria')
  .option('-id, --id, <id>', 'The id of the currency')
  .option('-c, --code, <code>', 'The currency code, eg. USD')
  .option('-n, --name <name>', 'The currency name, eg. US_Dollar')
  .option('-$, --symbol <symbol>', 'The currency symbol, eg. $')
  .action(
    async (opts: {
      id?: string;
      name?: string;
      code?: string;
      symbol?: string;
    }) => {
      const { name, code, symbol, id } = opts;

      try {
        const foundCurrency = id
          ? await currencyActions.findOne(id)
          : await currencyActions.findOne(undefined, {
              where: { name, code, symbol }
            });

        if (!foundCurrency) logAndExitNotFoundMessage('currency', opts.id);

        logObject(foundCurrency as Currency, 'currency');
      } catch (error) {
        logAndExitOnSqlEngineError('view', 'currency', error.message);
      }
    }
  );
