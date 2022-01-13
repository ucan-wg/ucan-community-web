/** Load ESM modules with path mappings
 * ts-node/esm does not currently support path mappings. This custom 
 * loader takes care of that. Tracking discussion and loader source code 
 * from https://github.com/TypeStrong/ts-node/discussions/1450
 */

import {
  resolve as resolveTs,
  getFormat,
  load,
  transformSource,
} from "ts-node/esm";
import * as tsConfigPaths from "tsconfig-paths"

export { getFormat, load, transformSource };

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig()
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths)

export function resolve(specifier, context, defaultResolver) {
  const mappedSpecifier = matchPath(specifier)
  if (mappedSpecifier) {
    specifier = `${mappedSpecifier}.js`
  }
  return resolveTs(specifier, context, defaultResolver);
}