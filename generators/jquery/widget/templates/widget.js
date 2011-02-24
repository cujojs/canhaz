/*
 * ${COPYRIGHT}
 *
 * jQuery UI ${MODULE} widget
 */
(function($, window, undefined) {

    $.widget("${MODULE}", {
		options: {
			
			// Default options go here
			
		},
				
		_create: function() {
			
			// Create widget UI here
			
		},
				
		destroy: function() {

			// Destroy widget here
			this.element.next().remove();

		},
		
		_setOption: function(option, value) {

			$.Widget.prototype._setOption.apply(this, arguments);

			// React to any specific options here

		}
	});
	
})(jQuery, window);