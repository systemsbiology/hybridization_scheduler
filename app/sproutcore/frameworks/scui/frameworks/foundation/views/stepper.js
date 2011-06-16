// ==========================================================================
// SCUI.StepperView
// ==========================================================================

/** @class

  This view renders a stepper control button for incrementing/decrementing 
  values in a bound text field.
  
  To use bind the value of this view to the value of text field or label.

  @extends SC.View
  @author Brandon Blatnick
*/

SCUI.StepperView = SC.View.extend(
  /** @scope SC.CheckboxView.prototype */ {

  layout: { top: 0, left: 0, width: 19, height: 27 },
  
  /* Value to be binded to apprioprate label or text field */
  value: 0,
  
  /* amount to increment or decrement upon clicking stepper */
  increment: 1,
  
  /* max value allowed, infinity if not set */
  max: null,
  
  /* min value allowed, neg infinity if not set */
  min: null,
  
  /* if value should wraparound to the min if max is reached (and vise versa) */
  valueWraps: NO,

  createChildViews: function() {
    var childViews = [];
    var value = this.get('value');
    var increment = this.get('increment');
    var that = this;

    var view = this.createChildView(SC.ButtonView.design({
      classNames: ['scui-stepper-view-top'],
      layout: { top: 0, left: 0, width: 19, height: 13 },
      mouseUp: function() {
        sc_super();
        var value = that.get('value');
        value = value - 0; // make sure its a number
        var max = that.get('max');
        value = value + increment;
        var wraps = that.get('valueWraps');
        
        if (max === null || value <= max) that.set('value', value); // should == to check for null and undefined
        else if (wraps) {
          var min = that.get('min');
          if (min !== null) { // should be != to check for null and undefined
            value = value - max - increment;
            value = value + min;
            that.set('value', value);
          }
        }
      }
    }));
    childViews.push(view);

    view = this.createChildView(SC.ButtonView.design({
      classNames: ['scui-stepper-view-bottom'],
      layout: { top: 14, left: 0, width: 19, height: 13 },
      mouseUp: function() {
        sc_super();
        var value = that.get('value');
        value = value - 0; // make sure its a number
        var min = that.get('min');
        value = value - increment;
        var wraps = that.get('valueWraps');
        
        if (min === null || value >= min) that.set('value', value); // should be == to check for null and undefined
        else if (wraps) {
          var max = that.get('max');
          if (max !== null) { // should be != to check for null and undefined
            value = min - value - increment;
            value = max - value;
            that.set('value', value);
          }
        }
      }
    }));
    childViews.push(view);

    this.set('childViews', childViews);
  }
});

