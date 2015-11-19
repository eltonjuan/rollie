import {rollbarSnippet} from './rollbar-snippet';
import path from 'path';

if (dust) {
  dust.helpers.rollbar = function(chunk, context, bodies, params) {
    let conf;
    const baseDir = path.join(path.dirname(require.main.filename));
    if (context.get('rollbarConfig')) {
      // we have a rollbar config in our context, attempt to parse it
      try {
        conf = context.get('rollbarConfig');
      } catch (e) {
        console.error('Error parsing rollbarConfig from Dust context');
        throw e;
      }
    } else if (params.configPath) {
      // we have a path from which we will attempt to parse the rollbar config
      try {
        conf = require(path.join(baseDir, params.configPath));
      } catch (e) {
        console.error('Error reading Rollbar config from filesystem')
        throw e;
      }
    } else {
      throw new Error('No Rollbar config was provided to rollie');
      return;
    }

    Object.keys(params).map(key => {
      if (conf.hasOwnProperty(key)) {
        conf[key] = params[key];
      }
    });

    const head = `
      <script>
        var _rollbarConfig = ${JSON.stringify(conf)};
        ${rollbarSnippet}
      </script>
    `
    return chunk.write(head);
  }
}
