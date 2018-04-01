// @flow

import type { Location } from './locations';

const happyEmail = (firstName: string, others: Array<string>, location: Location): string =>
  `Hey ${firstName},
  
Here is finally your lunch rendez-vous!
Let's meet ${others.join(', ')} at 12.10PM at ${location.name}.
Please go ${location.details} ${location.plan} and look for the others on time :).

Bon appétit and have fun!

Croque

PS: We are happy to hear your feedback, just reply to this email!
  `;

const sadEmail = (firstName: string): string =>
  `Hey ${firstName},

Sorry we weren't able the find enough people for next lunch.
Help us to spread the word and be sure this doesn't happen again!

Bon appétit and see you at next lunch!

Croque
  `;

const reminderEmail = (firstName: string): string =>
  `Hey ${firstName},

Croque lunch is running today!
Join or update your reminder settings there:
https://croque.epfl.life

See you at noon!

Croque
  `;

export { happyEmail, sadEmail, reminderEmail };
