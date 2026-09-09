/**
 * IndexNow submission — tells Bing, and the other participating engines, that
 * a URL on this site has changed, rather than waiting for a crawl to notice.
 *
 * Run it after a deploy:
 *
 *   npm run indexnow                 submit every URL in the live sitemap
 *   npm run indexnow -- --dry-run    preflight only: nothing is submitted
 *   npm run indexnow -- --url /about --url /services/roof-cleaning
 *
 * WHY A SCRIPT AND NOT A BUILD HOOK. A `postbuild` step would fire on every
 * build the host runs, including preview builds off a branch — each one
 * submitting production URLs for a deploy that is not production. It would
 * also fire on a build that never goes live. A submission is a statement that
 * the live page has changed, so it belongs after the deploy is live, which is
 * a human judgement here rather than a step in a pipeline. Wiring it into CI
 * later is fine; it is one command and it needs no secret to run.
 *
 * WHAT IT SUBMITS COMES OFF THE LIVE SITEMAP, and that is the substance of the
 * arrangement rather than a convenience. A second list of URLs in this file
 * would be the first thing to drift, and drift here means one of two failures
 * this project has already written down: submitting a URL that carries
 * `noindex` (the sitemap-versus-page contradiction described at the top of
 * app/sitemap.ts), or submitting a URL that does not resolve. `app/sitemap.ts`
 * already derives the canonical list from `services`, `locations`, `blogPosts`
 * and the `indexing` flags, so reading its output means this script cannot
 * disagree with it — and reading the *live* one means it also cannot disagree
 * with what is actually deployed. A route held back by an `indexing` flag is
 * absent from the sitemap and is therefore never submitted, with no second
 * condition to remember here.
 *
 * GOOGLE DOES NOT PARTICIPATE IN INDEXNOW. Bing, Yandex, Seznam, Naver and
 * DuckDuckGo (through Bing) do, and api.indexnow.org fans one submission out
 * to all of them. Google's own Indexing API accepts JobPosting and
 * BroadcastEvent markup only, so for this site Google is the sitemap plus
 * Search Console and nothing else. Do not add a "Google IndexNow" step; there
 * is no such thing.
 *
 * AND DO NOT ADD A SITEMAP PING EITHER. The obvious-looking substitute for the
 * above is `GET /ping?sitemap=...`, which is in a decade of blog posts and in
 * plenty of deploy scripts. Both endpoints are gone, measured on 2026-09-09
 * rather than assumed:
 *
 *     https://www.google.com/ping?sitemap=...  ->  404
 *     https://www.bing.com/ping?sitemap=...    ->  410 Gone
 *
 * Google retired theirs in 2023 and Bing's 410 is the status code for "this is
 * deliberately not coming back" — IndexNow is what replaced it, which is the
 * reason this file exists. A ping added here would be an unconditional request
 * that fails on every run, and the failure would look like this script being
 * broken. Google finds a change through the sitemap in robots.txt and through
 * Search Console; there is no way to push it, and that asymmetry with Bing is
 * a fact about the two companies rather than a gap to close.
 *
 * THE KEY IS NOT A SECRET. IndexNow verifies ownership by having the key
 * served as a text file from the domain it applies to, so `public/<key>.txt`
 * is published on purpose and the key is public by design. It is read out of
 * that served file below rather than written here a second time, which makes
 * the file the single source: the filename, the file contents and the key sent
 * to the endpoint cannot fall out of step, because there is only one of them.
 *
 * (The OAuth client ID and secret offered on the same Bing Webmaster Tools
 * page are a different mechanism, for an application that reads or writes a
 * Webmaster Tools account on a user's behalf. Nothing here needs them, and a
 * secret does not belong in this repository.)
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));

/**
 * The shared endpoint rather than www.bing.com/indexnow. Both are valid and
 * Bing receives the submission either way; the shared one forwards to every
 * participating engine, so Yandex, Seznam and Naver come free and no second
 * request has to be maintained here.
 */
const ENDPOINT = "https://api.indexnow.org/indexnow";

const argv = process.argv.slice(2);
const has = (name) => argv.includes(`--${name}`);
const valueOf = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? undefined : argv[i + 1];
};
const allValuesOf = (name) =>
  argv.flatMap((arg, i) =>
    arg === `--${name}` && argv[i + 1] ? [argv[i + 1]] : [],
  );

/**
 * Throws rather than calling process.exit. Exiting mid-flight while an undici
 * socket is still open trips a libuv assertion on Windows — the diagnosis gets
 * printed and is then followed by what reads as a crash in this script.
 * Letting the error unwind to the handler at the foot of the file lets the
 * sockets close first, and `process.exitCode` still gives the shell a failure.
 */
const fail = (message) => {
  throw new Error(message);
};

/**
 * SITE_URL is parsed out of lib/seo.tsx rather than repeated here. Node cannot
 * import that module — it is .tsx, and node's type stripping does not handle
 * JSX — so a regex over the source is the only way a plain script can read the
 * one constant every canonical URL on this site derives from. It throws rather
 * than falling back to a hardcoded default: a wrong origin submits somebody
 * else's URLs, the endpoint answers 422, and a silent default would make that
 * read as a network problem instead of a config one.
 */
async function readSiteUrl() {
  const source = await readFile(path.join(ROOT, "lib", "seo.tsx"), "utf8");
  const match = source.match(/export const SITE_URL = "([^"]+)"/);
  if (!match) {
    fail(
      "could not read SITE_URL out of lib/seo.tsx — has that constant been renamed?",
    );
  }
  return match[1].replace(/\/$/, "");
}

/**
 * The key comes from the served file, found by shape rather than by name, so
 * rotating it is one file rename and no edit here. Exactly one candidate must
 * exist: two key files means an old key is still being served, and IndexNow
 * will accept a submission signed with either, which hides the fact that the
 * rotation was never finished.
 */
async function readKey() {
  const dir = path.join(ROOT, "public");
  const candidates = (await readdir(dir)).filter((name) =>
    /^[0-9a-f]{8,128}\.txt$/i.test(name),
  );

  if (candidates.length === 0) {
    fail(
      "no IndexNow key file in public/. It must be named <key>.txt and contain\n" +
        "          that same key as its only content. The key comes from Bing Webmaster\n" +
        "          Tools -> Settings -> API access.",
    );
  }
  if (candidates.length > 1) {
    fail(
      `more than one key file in public/: ${candidates.join(", ")}. Delete the old one.`,
    );
  }

  const file = candidates[0];
  const key = path.basename(file, ".txt");
  const body = (await readFile(path.join(dir, file), "utf8")).trim();

  if (body !== key) {
    fail(
      `public/${file} does not contain its own key.\n` +
        `          expected: ${key}\n` +
        `          found:    ${body.slice(0, 80) || "(empty)"}`,
    );
  }
  return key;
}

/**
 * The key file has to be reachable at the root of the host being submitted
 * for, and it is checked first because the endpoint will not tell you. A GET
 * carrying a key that has never existed anywhere answers 202 Accepted —
 * validation happens later, out of band, and a failure is silent. So a 202 is
 * not evidence of anything. The reachable key file is.
 */
async function verifyKeyFile(origin, key) {
  const url = `${origin}/${key}.txt`;
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    fail(`could not reach ${url}\n          ${error.message}`);
  }
  if (!response.ok) {
    fail(
      `${url} answered ${response.status}.\n` +
        "          The key file is in public/ but is not live yet — deploy before submitting.",
    );
  }
  const body = (await response.text()).trim();
  if (body !== key) {
    fail(`${url} is live but serves "${body.slice(0, 80)}" instead of the key.`);
  }
  console.log(`  key file   ${url}  200 OK`);
}

async function readSitemap(origin) {
  const url = `${origin}/sitemap.xml`;
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    fail(`could not reach ${url}\n          ${error.message}`);
  }
  if (!response.ok) fail(`${url} answered ${response.status}`);

  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) fail(`${url} parsed to zero <loc> entries`);

  console.log(`  sitemap    ${url}  ${urls.length} URLs`);
  return urls;
}

async function main() {
  const siteUrl = await readSiteUrl();
  const key = await readKey();

  /**
   * `--origin` exists so the preflight can run against a dev server. It forces
   * a dry run: a localhost URL is not a URL on this host, and the endpoint
   * answers 422 for a urlList that does not match the `host` it was sent with.
   */
  const origin = (valueOf("origin") ?? siteUrl).replace(/\/$/, "");
  const offSite = origin !== siteUrl;
  const dryRun = has("dry-run") || offSite;

  console.log(`\n  IndexNow   ${ENDPOINT}`);
  console.log(`  host       ${new URL(origin).host}`);
  console.log(`  key        ${key}`);

  await verifyKeyFile(origin, key);

  const explicit = allValuesOf("url");
  const urls = explicit.length
    ? explicit.map((u) => new URL(u, `${origin}/`).toString())
    : await readSitemap(origin);

  if (explicit.length) {
    console.log(`  urls       ${urls.length} passed on the command line`);
  }

  console.log();
  for (const url of urls) console.log(`    ${url}`);
  console.log();

  if (dryRun) {
    console.log(
      offSite
        ? `  DRY RUN  --origin is not ${siteUrl}, so nothing was submitted.\n`
        : "  DRY RUN  nothing submitted.\n",
    );
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(origin).host,
      key,
      keyLocation: `${origin}/${key}.txt`,
      urlList: urls,
    }),
  });

  const text = (await response.text()).trim();

  /**
   * 200 accepted, 202 accepted with key validation still pending — both are
   * successes as far as this script can tell, and 202 is what a first
   * submission from a new key normally returns. The rest are named because the
   * body the endpoint returns is usually empty.
   */
  const meaning = {
    200: "accepted",
    202: "accepted, key validation pending (normal on a first submission)",
    400: "bad request — malformed body",
    403: "key rejected: the key file was not found, or did not match",
    422: "URLs do not belong to the host, or the key does not match the host",
    429: "rate limited — too many submissions",
  };

  console.log(
    `  ${response.status}  ${meaning[response.status] ?? "unexpected status"}`,
  );
  if (text) console.log(`  body: ${text}`);
  console.log();

  if (response.status !== 200 && response.status !== 202) process.exitCode = 1;
}

try {
  await main();
} catch (error) {
  console.error(`\n  FAILED  ${error.message}\n`);
  process.exitCode = 1;
}
