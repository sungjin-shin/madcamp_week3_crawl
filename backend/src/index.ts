import "./env";

import server from "./server";

const port = 3000;

server.listen(port, () => {
  console.log(`listening to port ${port}`);
});
