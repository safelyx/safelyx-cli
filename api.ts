import safelyx from '@safelyx/api';
import { Spinner } from '@std/cli/unstable-spinner';

export async function checkLink(url: string, keyCode?: string) {
  const spinner = new Spinner({ message: `Checking link "${url}" ...`, color: 'yellow' });
  spinner.start();
  const result = await safelyx.checkLink(url, keyCode);
  spinner.stop();
  console.log(JSON.stringify(result, null, 2));
}

export async function checkEmail(email: string, keyCode?: string) {
  const spinner = new Spinner({ message: `Checking email "${email}" ...`, color: 'yellow' });
  spinner.start();
  const result = await safelyx.checkEmail(email, keyCode);
  spinner.stop();
  console.log(JSON.stringify(result, null, 2));
}

export async function checkMessage(
  message: string,
  { skipLinkAndEmailChecks, keyCode }: { skipLinkAndEmailChecks?: boolean; keyCode?: string },
) {
  const spinner = new Spinner({ message: `Checking message ...`, color: 'yellow' });
  spinner.start();
  const result = await safelyx.checkMessage(message, { skipLinkAndEmailChecks, keyCode });
  spinner.stop();
  console.log(JSON.stringify(result, null, 2));
}

export async function checkImage(imageUrl: string, keyCode?: string) {
  const spinner = new Spinner({ message: `Checking image "${imageUrl}" ...`, color: 'yellow' });
  spinner.start();
  const result = await safelyx.checkImage(imageUrl, keyCode);
  spinner.stop();
  console.log(JSON.stringify(result, null, 2));
}
