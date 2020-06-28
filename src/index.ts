import { app } from 'src/app';
import { connectToDb } from 'src/database';

import { PORT } from 'src/config';

/* -------------------------------------------------------------------------- */

connectToDb();

app.listen(PORT, () => {
  console.log(`\x1b[32m[Express] Server ready at http://localhost:${PORT}`);
});
