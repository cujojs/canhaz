/**
 * @license Copyright (c) 2011 Brian Cavalier
 * LICENSE: see the LICENSE.txt file. If file is missing, this file is subject
 * to the MIT License at: http://www.opensource.org/licenses/mit-license.php.
 */

/*
	File: ${MODULE}.js
	Describe your wire plugin here
*/
define([], function() {
	
	return {
		wire$resolvers: {
		},
		wire$setters: [
		],
		/*
			Function: wire$init
			Does any initialization for this plugin as soon as it is loaded. This is only
			called once when the plugin is loaded, and never again.
		*/
		wire$init: function() {
			console.log("${MODULE}: wire$init");
		},
		/*
			Function: wire$wire
			Invoked when wiring starts and provides two promises: one for wiring the context,
			and one for destroying the context.  Plugins should register resolve, reject, and
			promise handlers as necessary to do their work.
			
			Parameters:
				ready - promise that will be resolved when the context has been wired, rejected
					if there is an error during the wiring process, and will receive progress
					events for object creation, property setting, and initialization.
				destroy - promise that will be resolved when the context has been destroyed,
					rejected if there is an error while destroying the context, and will
					receive progress events for objects being destroyed.
		*/
		wire$wire: function(ready, destroy) {
			console.log("${MODULE}: wire$wire", arguments);

			ready.then(
				function() {
					console.log("${MODULE}: ready resolved", arguments);
				},
				function() {
					console.log("${MODULE}: ready rejected", arguments);
				},
				function() {
					console.log("${MODULE}: ready progress", arguments);
				}
			);

			destroy.then(
				function() {
					console.log("${MODULE}: destroy resolved", arguments);
				},
				function() {
					console.log("${MODULE}: destroy rejected", arguments);
				},
				function() {
					console.log("${MODULE}: destroy progress", arguments);
				}
			);
		}
	};
});