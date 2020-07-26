import "./env";

import server from "./server";

const port = 8081;

server.listen(port, () => {
  console.log(`listening to port ${port}`);
});
