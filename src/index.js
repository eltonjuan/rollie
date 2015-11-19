import {rollbarSnippet} from './rollbar-snippet';
import path from 'path';
/**
 * Rollbar Dust Helper
 *
 * Usage: In your page's JavaScript, reference this helper: 
 *   import 'rolly'
 *
 * In your page's Dust template, you can now reference this helper: 
 * 
 * {@rollbar configPath='.config/rollbar.json' }
 */

if (dust) {
  dust.helpers.rollbar = function(chunk, context, bodies, params) {
    let conf;
    const baseDir = path.join(path.dirname(require.main.filename));
    if (context.get('rollbarConfig')) {
      // we have a rollbar config in our context, attempt to parse it
      try {
        conf = JSON.stringify(context.get('rollbarConfig'));
      } catch (e) {
        console.error('Error parsing rollbarConfig from Dust context');
        throw e;
      }
    } else if (params.configPath) {
      // we have a path from which we will attempt to parse the rollbar config
      try {
        conf = JSON.stringify(require(path.join(baseDir, params.configPath)));
      } catch (e) {
        console.error('Error reading Rollbar config from filesystem')
        throw e;
      }
    } else {
      throw new Error('No Rollbar config was provided to rollie');
      return;
    }

    const head = `
      <script>
        var _rollbarConfig = ${conf};
        ${rollbarSnippet}
      </script>
    `
    return chunk.write(head);
  }
}
