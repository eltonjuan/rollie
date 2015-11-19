
# Rollie

Rollie is a super-simple, small (some might even call it cute) Dust helper to aid with [Rollbar](https://www.rollbar.com) integration. Named after an amazing baseball player with an amazing mustache. 

## Installation
```bash
$ npm install rollie
```

## Usage
Simply `import` or `require` the Rollie module, and let Rollie work its magic! Rollie will register itself as a helper under `dust.helpers`.

### JavaScript
```javascript
import 'rollie';

// the rest of your awesome application goes here
```

Once `rollie` is imported into your application, there are two ways to use it from within your Dust template:

#### Option 1 - `rollbarConfig` variable
```html
<head>
    {@rollbar /}
</head>
```
With the first option, Rollie will look for a variable `rollbarConfig` within the current Dust context and attempt to parse it.

#### Option 2 - File path
```html
<head>
    {@rollbar configPath="config/rollbar.json" /}
</head>
```
With the second option, Rollie will use the application's entry point by referencing `require.main.filename` and then attempt to resolve and parse the `.json` config file provided in the `configPath` parameter. This path should be relative to the root of your project.

**Note:** Rollie doesn't make any attempt to validate your Rollbar configuration object! So take a look at their [docs](https://rollbar.com/docs/notifier/rollbar.js/) and follow the instructions!

![Rollie Fingers](https://i.imgur.com/QUhKvJ7.jpg)


