import { program } from 'commander';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { failed } from '../../../../types-d';
import { logSuccess } from '../../../cli-helpers/logSuccess';
import { logAndExitOnValidationFailure } from '../../../cli-helpers/logAndExitOnValidationFailure';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';
import { Currency } from '../../../../entity/Currency/Currency-d';
import { currencyValidatorMap } from '../../../../entity/Currency/currencyValidatorMap';
import { currencyActions } from '../../../../entity/Currency/currencyActions';

export const addCurrencyCommand = program
  .command('currency')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('save a new currency to the database')
  .requiredOption('-c, --code, <code>', 'The currency code, eg. USD')
  .requiredOption('-n, --name <name>', 'The currency name, eg. US_Dollar')
  .requiredOption('-$, --symbol <symbol>', 'The currency symbol, eg. $')
  .option('-d, --description <description>', 'Description field for notes')
  .action(
    async (opts: {
      name: string;
      code: string;
      symbol: string;
      description?: string;
    }) => {
      const newCurrency: Currency = opts;
      const validation = validateModelObject<Currency>(
        newCurrency,
        currencyValidatorMap
      );

      if (failed(validation)) {
        const messageMap = validation.value;
        logAndExitOnValidationFailure<Currency>('add', 'currency', messageMap);
      } else {
        try {
          const { id } = await currencyActions.create(newCurrency);
          logSuccess('added', 'currency', `with id ${id}`);
        } catch (error) {
          logAndExitOnSqlEngineError('add', 'currency', error.message);
        }
      }
    }
  );
