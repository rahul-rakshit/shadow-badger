import { program } from 'commander';
import { logAndExitNotFoundMessage } from '../../../cli-helpers/logAndExitNotFoundMessage';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { failed } from '../../../../types-d';
import { logAndExitOnValidationFailure } from '../../../cli-helpers/logAndExitOnValidationFailure';
import { logSuccess } from '../../../cli-helpers/logSuccess';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';
import { Account } from '../../../../entity/Account/Account-d';
import { accountActions } from '../../../../entity/Account/accountActions';
import { accountValidatorMap } from '../../../../entity/Account/accountValidatorMap';
import { currencyActions } from '../../../../entity/Currency/currencyActions';

export const editAccountCommand = program
  .command('account')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('find an existing account by id and update passed values')
  .requiredOption('-id, --id, <id>', 'The account id')
  .option('-c, --code, <code>', 'The account code, eg. MNZO')
  .option('-n, --name <name>', 'The account name, eg. Monzo')
  .option('-cId, --currency-id <currencyId>', "The related currency's id")
  .action(
    async (opts: {
      id: string;
      code?: string;
      name?: string;
      currencyId?: string;
    }) => {
      const idString = opts.id;
      const id = Number(idString);
      const currencyIdString = opts.currencyId;
      const currencyId = Number(currencyIdString);
      const { code, name } = opts;

      try {
        const foundAccount = await accountActions.findOne(id, {
          relations: ['currency']
        });
        if (!foundAccount) logAndExitNotFoundMessage('account', idString);
        const account = foundAccount as Account;

        if (code) account.code = code;
        if (name) account.name = name;
        if (currencyId) {
          const foundCurrency = await currencyActions.findOne(currencyId);
          if (!foundCurrency)
            logAndExitNotFoundMessage('currency', currencyIdString);
          else account.currency = foundCurrency;
        }

        const validation = validateModelObject<Account>(
          account,
          accountValidatorMap
        );

        if (failed(validation)) {
          const messageMap = validation.value;
          logAndExitOnValidationFailure<Account>('edit', 'account', messageMap);
        }

        await accountActions.edit(id, account);

        logSuccess('edited', 'account', `with id ${id}`);
      } catch (error) {
        logAndExitOnSqlEngineError('edit', 'account', error.message);
      }
    }
  );
