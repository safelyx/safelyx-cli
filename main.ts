import { parseArgs, type ParseOptions } from '@std/cli/parse-args';
import 'jsr:@std/dotenv/load';

import meta from './deno.json' with { type: 'json' };
import { checkEmail, checkImage, checkLink, checkMessage } from './api.ts';

const validCommands = ['check-link', 'check-email', 'check-message', 'check-image'] as const;

function printUsage() {
  console.log('');
  console.log('Usage: ');
  console.log('  safelyx <command>');
  console.log('Commands:');
  console.log('  check-link <url> --key-code <key-code>');
  console.log('  check-email <email> --key-code <key-code>');
  console.log('  check-message <message> --key-code <key-code> --skip-link-and-email-checks');
  console.log('  check-image <image-url> --key-code <key-code>');
  console.log('Options:');
  console.log('  -h, --help      Show this help message');
  console.log('  -v, --version   Show the version number');
  console.log('  -k, --key-code  Key code (can also use the SAFELYX_KEY_CODE environment variable)');
}

export const options: ParseOptions = {
  boolean: ['help', 'version', 'skip-link-and-email-checks'],
  string: ['key-code'],
  default: { 'key-code': '' },
  alias: { 'help': 'h', 'version': 'v', 'key-code': 'k' },
};

const args = parseArgs(Deno.args, options);

const keyCode = args['key-code'] || Deno.env.get('SAFELYX_KEY_CODE') || '';

if (args.help) {
  printUsage();
  Deno.exit(0);
} else if (args.version) {
  console.log(meta.version || 'unknown');
  Deno.exit(0);
}

const command = args._[0] as typeof validCommands[number];

if (import.meta.main && (!command || !validCommands.includes(command))) {
  console.log('You must specify a valid command');
  printUsage();
  Deno.exit(1);
}

if (command === 'check-link') {
  const url = args._[1]?.toString();

  if (!url) {
    console.log('You must specify a URL');
    printUsage();
    Deno.exit(1);
  }

  await checkLink(url, keyCode);
  Deno.exit(0);
}

if (command === 'check-email') {
  const email = args._[1]?.toString();

  if (!email) {
    console.log('You must specify an email');
    printUsage();
    Deno.exit(1);
  }

  await checkEmail(email, keyCode);
  Deno.exit(0);
}

if (command === 'check-message') {
  const message = args._[1]?.toString();

  if (!message) {
    console.log('You must specify a message');
    printUsage();
    Deno.exit(1);
  }

  await checkMessage(message, {
    skipLinkAndEmailChecks: args['skip-link-and-email-checks'],
    keyCode,
  });
  Deno.exit(0);
}

if (command === 'check-image') {
  const imageUrl = args._[1]?.toString();

  if (!imageUrl) {
    console.log('You must specify an image URL');
    printUsage();
    Deno.exit(1);
  }

  await checkImage(imageUrl, keyCode);
  Deno.exit(0);
}

if (import.meta.main) {
  console.log('Invalid command');
  Deno.exit(1);
}
