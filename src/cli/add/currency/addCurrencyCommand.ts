import { program } from 'commander';
import {
  Currency,
  currencyValidatorMap,
  currencyActions
} from '../../../entity/Currency';
import { validateModelObject } from '../../../validations/validateModelObject';
import { failed } from '../../../types-d';

export const addCurrencyCommand = program
  .command('currency')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('save a new currency to the database')
  .requiredOption('-c, --code, <code>', 'The currency code, eg. USD')
  .requiredOption('-n, --name <name>', 'The currency name, eg. US_Dollar')
  .requiredOption('-$, --symbol <symbol>', 'The currency symbol, eg. $')
  .action(async (opts: { name: string; code: string; symbol: string }) => {
    const newCurrency: Currency = opts;
    const validation = validateModelObject<Currency>(
      newCurrency,
      currencyValidatorMap
    );
    if (failed(validation)) {
      console.table(validation.value);
      process.exit(1);
    }
    await currencyActions.create(newCurrency);
  });
