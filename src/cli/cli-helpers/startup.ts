import os from 'os';
import fs from 'fs';
import prompt from 'prompt';

export function getDbPath(dbPathEnv?: string): string {
  return dbPathEnv ?? `${os.homedir()}/.shadow-badger.sqlite3`;
}

export function doesDbFileExist(dbPath: string): boolean {
  return fs.existsSync(dbPath);
}

export function printFirstUsageText(dbPath: string, dbPathEnv?: string) {
  console.log("This seems to be the first time you're running shadow-badger.");
  console.log('Welcome! 🦡');
  console.log(`Shall a new database be created under ${dbPath}?`);
  !dbPathEnv &&
    console.log(
      'If you want to create or use a DB at a different path, set the SHADOW_BADGER_DB_PATH environment variable.'
    );
  console.log();
}

export async function abortIfNotConfirmDbCreation(): Promise<void | never> {
  prompt.message =
    'Type YES (upper case) to confirm and type anything else to abort DB creation.\n';
  prompt.delimiter = '';
  const { confirm } = await prompt.get(['confirm']);

  if (confirm === 'YES') return;
  else {
    console.log(
      'Script aborted at user request. No database will be created. Goodbye! 🦡'
    );
    process.exit(0);
  }
}

export function setupDbMessage() {
  console.log('Successfully created database 🥳🎉');
}
