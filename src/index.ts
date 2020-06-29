import { app } from 'src/app';
import { connectDb } from 'src/database';

import { PORT } from 'src/config';

/* -------------------------------------------------------------------------- */

/* Connect database */
connectDb();

/**
 * Setup server
 */

app.listen(PORT, () => {
  console.log('\x1b[32m' + `[Express] Server listening on port ${PORT}`);
});
