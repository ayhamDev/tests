const pm2 = require("pm2");

pm2.list((err, list) => {
  console.log(list);
});
