import { program } from 'commander';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { failed } from '../../../../types-d';
import { Account } from '../../../../entity/Account/Account-d';
import { accountValidatorMap } from '../../../../entity/Account/accountValidatorMap';
import { accountActions } from '../../../../entity/Account/accountActions';
import { currencyActions } from '../../../../entity/Currency/currencyActions';
import { processUtil } from '../../../cli-helpers/processUtil';

const {
  logAndExitNotFoundMessage,
  logAndExitOnValidationFailure,
  logAndExitOnSqlEngineError,
  logSuccess
} = processUtil;

export const addAccountCommand = program
  .command('account')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('save a new account to the database')
  .requiredOption('-c, --code, <code>', 'The account code, eg. MNZO')
  .requiredOption('-n, --name <name>', 'The account name, eg. Monzo')
  .requiredOption(
    '-cId, --currency-id <currencyId>',
    "The related currency's id"
  )
  .action(async (opts: { code: string; name: string; currencyId: string }) => {
    const { code, name } = opts;
    const currencyIdString = opts.currencyId;
    const currencyId = Number(currencyIdString);
    try {
      const currency = await currencyActions.findOne(currencyId);
      if (!currency) logAndExitNotFoundMessage('currency', currencyIdString);

      const newAccount: Account = { code, name, currency };
      const validation = validateModelObject<Account>(
        newAccount,
        accountValidatorMap
      );

      if (failed(validation)) {
        const messageMap = validation.value;
        logAndExitOnValidationFailure<Account>('add', 'account', messageMap);
      } else {
        const { id } = await accountActions.create(newAccount);
        logSuccess('added', 'account', `with id ${id}`);
      }
    } catch (error) {
      logAndExitOnSqlEngineError('add', 'account', error.message);
    }
  });
