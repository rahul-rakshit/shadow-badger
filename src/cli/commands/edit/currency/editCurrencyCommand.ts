import { program } from 'commander';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { failed } from '../../../../types-d';
import { logAndExitOnValidationFailure } from '../../../cli-helpers/logAndExitOnValidationFailure';
import { logSuccess } from '../../../cli-helpers/logSuccess';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';
import { logAndExitNotFoundMessage } from '../../../cli-helpers/logAndExitNotFoundMessage';
import { currencyActions } from '../../../../entity/Currency/currencyActions';
import { Currency } from '../../../../entity/Currency/Currency-d';
import { currencyValidatorMap } from '../../../../entity/Currency/currencyValidatorMap';

export const editCurrencyCommand = program
  .command('currency')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('find an existing currency by id and update passed values')
  .requiredOption('-id, --id, <id>', 'The id of the currency to edit')
  .option('-c, --code, <code>', 'The currency code, eg. USD')
  .option('-n, --name <name>', 'The currency name, eg. US_Dollar')
  .option('-$, --symbol <symbol>', 'The currency symbol, eg. $')
  .option('-d, --description <description>', 'Description field for notes')
  .action(
    async (opts: {
      id: string;
      name?: string;
      code?: string;
      symbol?: string;
      description?: string;
    }) => {
      const idString = opts.id;
      const id = Number(idString);
      const { name, code, symbol, description } = opts;

      try {
        const foundCurrency = await currencyActions.findOne(id);
        if (!foundCurrency) logAndExitNotFoundMessage('currency', idString);
        const currency = foundCurrency as Currency;

        if (name) currency.name = name;
        if (code) currency.code = code;
        if (symbol) currency.symbol = symbol;
        if (description) currency.description = description;

        const validation = validateModelObject<Currency>(
          currency,
          currencyValidatorMap
        );

        if (failed(validation)) {
          const messageMap = validation.value;
          logAndExitOnValidationFailure<Currency>(
            'edit',
            'currency',
            messageMap
          );
        }

        await currencyActions.edit(currency);

        logSuccess('edited', 'currency', `with id ${id}`);
      } catch (error) {
        logAndExitOnSqlEngineError('edit', 'currency', error.message);
      }
    }
  );
