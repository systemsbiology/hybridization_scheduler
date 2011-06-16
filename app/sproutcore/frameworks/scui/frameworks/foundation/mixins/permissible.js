/*globals SCUI */

/** 

  A mixin to render unauthorized items differently (e.g., change background color or draw a lock icon).
  This is used to differentiate items that are disabled owing to permission issues).
  
  A user of this mixin must set the binding to the 'isPermitted' property.
  When 'isPermitted' is false, the class 'unauthorized' is added.
  
	@author Suvajit Gupta
*/
SCUI.Permissible = {
  
  isPermitted: null,
  isPermittedBindingDefault: SC.Binding.oneWay().bool(),

  displayProperties: ['isPermitted', 'tooltipSuffix'],
  
  /**
    @optional
    What to append to the tooltip when unauthorized
  */
  tooltipSuffix: "(unauthorized)".loc(),
  
  _isPermittedDidChange: function() {
    if(this.get('isPermitted')) {
      if(!SC.none(this._tooltip)) this.setIfChanged('toolTip', this._tooltip);
    }
    else {
      this._tooltip = this.get('toolTip');
      this.set('toolTip', (!(SC.none(this._tooltip)) ? (this._toolTip  + " ") : "") + this.get('tooltipSuffix'));
    }
  }.observes('isPermitted'),

  renderMixin: function(context, firstTime) {
    context.setClass('unauthorized', !this.get('isPermitted'));
  }
  
};

