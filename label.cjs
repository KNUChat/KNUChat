import githubLabelSync from "github-label-sync";

githubLabelSync({
  accessToken: "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",
  repo: "KNUChat/KNUChat",
  labels: [],
  dryRun: true,
}).then((diff) => {
  console.log(diff);
});
