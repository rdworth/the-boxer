/*!
 * jQuery Boxer
 * http://github.com/rdworth/the-boxer
 *
 * Copyright 2010, Richard D. Worth
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *	jquery.ui.widget.js
 *	jquery.ui.mouse.js
 */
(function($) {

$.widget("the.boxer", $.ui.mouse, {

	options: $.extend( {}, $.ui.mouse.options, {
		appendTo: "body",
		distance: 0
 	}),
 
	_init: function() {
		this._mouseInit();

		this.element
			.addClass( "the-boxer" + ( this.options.disabled ? " the-boxer-disabled" : "" ) );

		this.box = $();
	},

	destroy: function() {
		this._mouseDestroy();

		this.element
			.removeClass( "the-boxer the-boxer-disabled" );
	},

	_mouseStart: function(event) {
		if ( this.options.disabled ) {
			return;
		}

		this.opos = [ event.pageX, event.pageY ];

		this.box = $( "<div></div>" )
			.addClass( "the-boxer-box" )
			.css({
				"border": "1px dotted black",
				"z-index": 100,
				"position": "absolute",
				"left": event.clientX,
				"top": event.clientY,
				"width": 0,
				"height": 0
			})
			.appendTo( this.options.appendTo );

		this._trigger( "start", event, { box: this.box } );
	},

	_mouseDrag: function(event) {
		if ( this.options.disabled ) {
			return;
		}

		var x1 = this.opos[ 0 ],
			y1 = this.opos[ 1 ],
			x2 = event.pageX,
			y2 = event.pageY;

		this.box.css({
			"left": Math.min( x1, x2 ),
			"top": Math.min( y1, y2 ),
			"width": x1 > x2 ? x1 - x2 : x2 - x1,
			"height": y1 > y2 ? y1 - y2 : y2 - y1
		});
		
		this._trigger( "drag", event, { box: this.box } );
	},

	_mouseStop: function(event) {
		if ( this.options.disabled ) {
			return;
		}

		this.box
			.removeClass( "the-boxer-box" )
			.appendTo( this.element );

		this._trigger( "stop", event, { box: this.box } );

		this.box = $();
	}

});

}( jQuery ));
