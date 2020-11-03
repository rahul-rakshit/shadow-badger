import { program } from 'commander';
import { currencyActions } from '../../../../entity/Currency/currencyActions';
import { Currency } from '../../../../entity/Currency/Currency-d';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { parseDefinedOpts } from '../../../../utils/parseDefinedOpts';

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
      const { name, code, symbol } = opts;
      const idString = opts.id;
      const id = Number(idString);

      if (!idString && !name && !code && !symbol)
        $.logAndExitNoFilterCriteria();

      try {
        const foundCurrency = id
          ? await currencyActions.findOne(id)
          : await currencyActions.findOne(undefined, {
              where: parseDefinedOpts({ name, code, symbol })
            });

        if (!foundCurrency) $.logAndExitNotFoundMessage('currency', opts.id);

        $.logObject(foundCurrency as Currency, 'currency');
      } catch (error) {
        $.logAndExitOnSqlEngineError('view', 'currency', error.message);
      }
    }
  );
