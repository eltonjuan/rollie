import {rollbarSnippet, defaultConfig} from './rollbar-snippet';

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
	dust.helpers.rollbar = function(chunk, context, bodies, params) {
		const conf = ''// context.resolve(params.rollbarConfig) || defaultConfig
		console.log(context);
		const head = `
			<script>
				var _rollbarConfig = ${conf};
				${rollbarSnippet}
			</script>
		`

		return chunk.write(chunk);
	}
}
