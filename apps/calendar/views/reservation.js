// ==========================================================================
// Project:   Calendar.ReservationView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Calendar.ReservationView = SC.View.extend(
/** @scope Calendar.ReservationView.prototype */ {

  classNames: ['reservation-view'],

  contentDisplayProperties: 'description sampleTypeName sampleNumber chipNumber'.w(),

  render: function(context, firstTime) {
    var description = '',
        sampleTypeName = '',
        sampleNumber = 0,
        chipNumber = 0;
   
    var content = this.get('content');
    if(content != null) {
      description = content.get('description');
      sampleTypeName = content.get('sampleType') && content.getPath('sampleType.name');
      sampleNumber = content.get('sampleNumber');
      chipNumber = content.get('chipNumber');
    }

    context = context.begin('div').addClass('reservation-view-title').push(description).end();
    context = context.begin('div').addClass('reservation-view-details');
    context = context.push(sampleTypeName).push("<br>");
    context = context.push(sampleNumber).push(" samples, ").push(chipNumber).push(" chips");
    context = context.end();

    sc_super();
  }
});
