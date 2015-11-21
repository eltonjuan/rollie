import {rollbarSnippet} from './rollbar-snippet';
import assign from 'object-assign';
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
        // delete from params so we can merge additional params below
        delete params.configPath;
      } catch (e) {
        console.error('Error reading Rollbar config from filesystem')
        throw e;
      }
    } else {
      throw new Error('No Rollbar config was provided to rollie');
      return;
    }

    if (params.scrub) {
      if (params.scrub instanceof Array) {
        params.scrub.forEach(k => {
          delete conf[k];
        });
      } else {
        delete conf[params.scrub];
      }
    }

    delete params.scrub;

    assign(conf, params);

    const head = `
      <script>
        var _rollbarConfig = ${JSON.stringify(conf)};
        ${rollbarSnippet}
      </script>
    `
    return chunk.write(head);
  }
}
