import { program } from 'commander';
import { add } from './src/add';

program
  .version('0.1.0')
  .requiredOption(
    '-1, --first-number <first number>',
    'The first number for the addition'
  )
  .requiredOption(
    '-2, --second-number <second number>',
    'The second number for the addition'
  );

program.parse(process.argv);

const { firstNumber, secondNumber } = program.opts();

console.log(add(Number(firstNumber), Number(secondNumber)));
