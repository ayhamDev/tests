const pm2 = require("pm2");
const async = require("async");
pm2.list((err, procs) => {
  async.forEachLimit(procs, 1, (proc, next) => {
    console.log(proc.pm2_env.versioning);
    if (proc.pm2_env && proc.pm2_env.versioning) {
      console.log("pull And Reload %s", proc.name);

      pm2.reload(proc.name, (err, meta) => {
        if (meta) {
          var rev = meta.rev;

          if (rev)
            console.log(
              "Successfully pulled [App name: %s] [Commit id: %s] [Repo: %s] [Branch: %s]",
              proc.name,
              rev.current_revision,
              meta.procs[0].pm2_env.versioning.repo_path,
              meta.procs[0].pm2_env.versioning.branch
            );
          else {
            // Backward compatibility
            console.log("App %s succesfully pulled");
          }
        }

        if (err) console.log("App %s already at latest version", proc.name);

        return next();
      });
    } else next();
  });
});
