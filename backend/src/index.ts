import "./env";

import server from "./server";

const port = 4444;

server.listen(port, () => {
  console.log(`listening to port ${port}`);
});
