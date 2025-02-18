import 'jsr:@std/dotenv/load';
import { assertEquals } from 'jsr:@std/assert@1.0.8';
import { parseArgs } from '@std/cli';

import { options } from './main.ts';

const TEST_KEY_CODE = Deno.env.get('TEST_KEY_CODE') || '';

Deno.test('check-link command - parses URL argument', () => {
  const args = ['check-link', 'https://example.com'];
  const parsedArgs = parseArgs(args, options);

  assertEquals(parsedArgs._, ['check-link', 'https://example.com']);
  assertEquals(parsedArgs._.length, 2);
});

Deno.test('check-link command - parses URL and key code arguments', () => {
  const args = ['check-link', 'https://example.com', '--key-code', TEST_KEY_CODE];
  const parsedArgs = parseArgs(args, options);

  assertEquals(parsedArgs._, ['check-link', 'https://example.com', '']);
  assertEquals(parsedArgs['key-code'], TEST_KEY_CODE);
});

Deno.test('check-link command - handles missing URL argument', () => {
  const args = ['check-link'];
  const parsedArgs = parseArgs(args, options);

  assertEquals(parsedArgs._.length, 1);
  assertEquals(parsedArgs._[0], 'check-link');
});
