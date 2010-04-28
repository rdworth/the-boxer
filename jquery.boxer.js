// Boxer plugin
$.widget("ui.boxer", $.extend({}, $.ui.mouse, {

  _init: function() {
    this.element.addClass("ui-boxer");

    this.dragged = false;

    this._mouseInit();

    this.helper = $(document.createElement('div'))
      .css({border:'1px dotted black'})
      .addClass("ui-boxer-helper");
  },

  destroy: function() {
    this.element
      .removeClass("ui-boxer ui-boxer-disabled")
      .removeData("boxer")
      .unbind(".boxer");
    this._mouseDestroy();

    return this;
  },

  _mouseStart: function(event) {
    var self = this;

    this.opos = [event.pageX, event.pageY];

    if (this.options.disabled)
      return;

    var options = this.options;

    this._trigger("start", event);

    $(options.appendTo).append(this.helper);

    this.helper.css({
      "z-index": 100,
      "position": "absolute",
      "left": event.clientX,
      "top": event.clientY,
      "width": 0,
      "height": 0
    });
  },

  _mouseDrag: function(event) {
    var self = this;
    this.dragged = true;

    if (this.options.disabled)
      return;

    var options = this.options;

    var x1 = this.opos[0], y1 = this.opos[1], x2 = event.pageX, y2 = event.pageY;
    if (x1 > x2) { var tmp = x2; x2 = x1; x1 = tmp; }
    if (y1 > y2) { var tmp = y2; y2 = y1; y1 = tmp; }
    this.helper.css({left: x1, top: y1, width: x2-x1, height: y2-y1});
    
    this._trigger("drag", event);

    return false;
  },

  _mouseStop: function(event) {
    var self = this;

    this.dragged = false;

    var options = this.options;

    var clone = this.helper.clone()
      .removeClass('ui-boxer-helper').appendTo(this.element);

    this._trigger("stop", event, { box: clone });

    this.helper.remove();

    return false;
  }

}));
$.extend($.ui.boxer, {
  defaults: $.extend({}, $.ui.mouse.defaults, {
    appendTo: 'body',
    distance: 0
  })
});

// Using the boxer plugin
$('#canvas').boxer({
  stop: function(event, ui) {
    var offset = ui.box.offset();
    ui.box.css({ border: '1px solid white', background: 'orange', padding: '0.5em' })
      .append('x:' + offset.left + ', y:' + offset.top)
      .append('<br>')
      .append('w:' + ui.box.width() + ', h:' + ui.box.height());
  }
});
