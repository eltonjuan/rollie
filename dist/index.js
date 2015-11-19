'use strict';

var _rollbarSnippet = require('./rollbar-snippet');

/**
 * Rollbar Dust Helper
 *
 * Usage: In your page's JavaScript, reference this helper: 
 *   import 'rolly'
 *
 * In your page's Dust template, you can now reference this helper: 
 * 
 * {@rollbar accessToken='YOUR_ROLLBAR_ACCESS_TOKEN' }
 */

if (dust) {
	dust.helpers.rollbar = function (chunk, context, bodies, params) {
		var conf = ''; // context.resolve(params.rollbarConfig) || defaultConfig
		console.log(context);
		var head = '\n\t\t\t<script>\n\t\t\t\tvar _rollbarConfig = ' + conf + ';\n\t\t\t\t' + _rollbarSnippet.rollbarSnippet + '\n\t\t\t</script>\n\t\t';

		return chunk.write(chunk);
	};
}