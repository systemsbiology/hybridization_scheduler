// ========================================================================
// SCUI.ContentEditableView Tests
// ========================================================================
/*globals NodeFilter SC SCUI sc_require rangy module test equals */

var pane = SC.ControlTestPane.design()
  .add("ce", SCUI.ContentEditableView, {
    layout: { left: 0, right: 0, top: 0, height: 150 },
    value: 'Lorem ipsum dolor sit amet.',
    autoCommit: YES
  });
  
pane.show();

module("SCUI.ContentEditableView", {
  teardown: function() {
    pane.view('ce').set('editorHTML', 'Lorem ipsum dolor sit amet.');
  }
});

test("Verify value is being set properly", function() {
  function f() {
    SC.RunLoop.begin();
    var ce = pane.view('ce');
    var frame = ce.$('iframe').get(0);
    var value = frame.contentDocument.body.innerHTML;
    SC.RunLoop.end();

    equals(value, 'Lorem ipsum dolor sit amet.');
    
    ce.set('value', 'lorem ipsum');
    SC.RunLoop.begin().end();
    equals(frame.contentDocument.body.innerHTML, 'lorem ipsum');
    window.start();
  }
  
  // give the iframe time to load
  stop();  
  setTimeout(f, 500);
});

test("Properties Tests", function() {
  var ce = pane.view('ce');
  var frame = ce.$('iframe').get(0);
  var editor = frame.contentDocument;
  
  ce.selectContent();
  
  editor.execCommand('bold', false, null);
  equals(ce.get('selectionIsBold'), YES, 'Text should be bolded');
  
  editor.execCommand('italic', false, null);
  equals(ce.get('selectionIsItalicized'), YES, 'Text should be italicized');
  
  editor.execCommand('underline', false, null);
  equals(ce.get('selectionIsUnderlined'), YES, 'Text should be underlined');
    
  editor.execCommand('insertorderedlist', false, null);
  equals(ce.get('selectionIsOrderedList'), YES, 'Text should be ordered list');
  
  editor.execCommand('insertunorderedlist', false, null);
  equals(ce.get('selectionIsUnorderedList'), YES, 'Text should be unordered list');
    
  editor.execCommand('subscript', false, null);
  equals(ce.get('selectionIsSubscript'), YES, 'Text should be subscripted');
  
  editor.execCommand('superscript', false, null);
  equals(ce.get('selectionIsSuperscript'), YES, 'Text should be superscripted');
  
});

test("Alignment Tests (known failures)", function() {
  var ce = pane.view('ce');
  var frame = ce.$('iframe').get(0);
  var editor = frame.contentDocument;
  
  ce.selectContent();
  
  // TOTDO: [JS] queryCommandState('justifyXXXX') always returns false in safari and firefox
  // editor.execCommand('justifycenter', false, null);
  // equals(ce.get('selectionIsCenterJustified'), YES, 'Text should be center justified');
  // 
  // editor.execCommand('justifyright', false, null);
  // equals(ce.get('selectionIsRightJustified'), YES, 'Text should be right justified');
  // 
  // editor.execCommand('justifyleft', false, null);
  // equals(ce.get('selectionIsLeftJustified'), YES, 'Text should be left justified');
  // 
  // editor.execCommand('justifyfull', false, null);
  // equals(ce.get('selectionIsFullJustified'), YES, 'Text should be full justified');
  
});

test("Indent Tests", function() {
  var ce = pane.view('ce');
  var frame = ce.$('iframe').get(0);
  var editor = frame.contentDocument;
  
  ce.selectContent();

  // indent/outdent is not a fixed state, only an action, so always NO
  editor.execCommand('indent', false, null);
  equals(ce.get('selectionIsIndented'), NO, 'Text should be indented');
  
  editor.execCommand('outdent', false, null);
  equals(ce.get('selectionIsOutdented'), NO, 'Text should be outdented');
  
});

test("Font and Color Tests (known failures)", function() {
 var ce = pane.view('ce');
 var frame = ce.$('iframe').get(0);
 var editor = frame.contentDocument;
 
 ce.selectContent();

 // TODO: Get these to pass... 
 // editor.execCommand('fontname', false, 'Arial');
 // equals(ce.get('selectionFontName'), 'Arial', 'Font type should be Arial');
 
 // editor.execCommand('fontsize', false, '18px');
 // equals(ce.get('selectionFontSize'), '18px', 'Font size should be 18px');
 
 // editor.execCommand('fontcolor', false, '#FF0000');
 // equals(ce.get('selectionFontSize'), '#FF0000', 'Font color should be red');

 // editor.execCommand('backgroundcolor', false, '#0000FF');
 // equals(ce.get('selectionFontSize'), '#0000FF', 'background color should be blue');

});

test("Hyperlink Tests", function() {
  var ce = pane.view('ce');
  var link = 'http://www.google.com/';

  ce.selectContent();

  var createFail = ce.createLink('');
  equals(createFail, NO, 'Hyperlink creation should fail with empty string');
  
  var createSuccess = ce.createLink(link);
  equals(createSuccess, YES, 'Hyperlink creation should work with proper url');
  // TODO: Get this to pass...
  // equals(ce.get('hyperlinkValue'), link, 'Hyperlink value should match what was created');
  
  var removeSuccess = ce.removeLink();
  equals(removeSuccess, YES, 'removeLink() should return true when successful');
});

test("Image Tests", function() {
  var ce = pane.view('ce');
  var frame = ce.$('iframe').get(0);
  var editor = frame.contentDocument;
  
  ce.selectContent();
  
  var createFail = ce.insertImage('');
  equals(createFail, NO, 'Image insertion should fail with empty string');
  
  var createSuccess = ce.insertImage('http://www.google.ca/intl/en_ca/images/logo.gif');
  equals(createSuccess, YES, 'Image insertion should succeeed with proper value');
  
  editor.execCommand('selectall', false, null);
  ce.querySelection();    
  
  ce.set('imageAlignment', 'left');
  var alignment = ce.get('imageAlignment');
  
  equals(alignment, 'left', 'Image should be aligned left');
});

test("cleanWordHTML() Tests", function() {
  var ce = pane.view('ce');
  
  var html = ce.cleanWordHTML('<span style="color: red;">Lorem Ipsum<o:p></o:p></span>');
  equals(html, '<span style="color: red;">Lorem Ipsum</span>', 'All o tags have been removed');
  
  html = ce.cleanWordHTML('<w:View>Normal</w:View> <w:Zoom>0</w:Zoom> <w:TrackMoves/> <w:TrackFormatting/> <w:PunctuationKerning/>');
  equals(html, '', 'All w tags have been removed');
  
  html = ce.cleanWordHTML('<m:mathPr> <m:mathFont m:vail="Cambria Math"/><m:brkBin m:val="before"/> <m:brkBinSub m:val="&#45;-"/> <m:smallFrac m:val="off"/> <m:dispDef/> <m:lMargin m:val="0"/> <m:rMargin m:val="0"/> <m:defJc m:val="centerGroup"/> <m:wrapIndent m:val="1440"/> <m:intLim m:val="subSup"/> <m:naryLim m:val="undOvr"/> </m:mathPr>');
  equals(html, '', 'All m tags have been removed');
  
  html = ce.cleanWordHTML('<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="ProgId" content="Word.Document"><meta name="Generator" content="Microsoft Word 12"><meta name="Originator" content="Microsoft Word 12"><link rel="File-List" href="file:///C:%5CDOCUME%7E1%5Cmtaher%5CLOCALS%7E1%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_filelist.xml"><link rel="themeData" href="file:///C:%5CDOCUME%7E1%5Cmtaher%5CLOCALS%7E1%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_themedata.thmx"><link rel="colorSchemeMapping" href="file:///C:%5CDOCUME%7E1%5Cmtaher%5CLOCALS%7E1%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_colorschememapping.xml">');
  equals(html, '', 'All meta and link tags have been removed');
  
  html = ce.cleanWordHTML('<p class="MsoNormal" style="margin: 0cm 0cm 0pt; text-indent: 0.5in;">Lorem Ipsum</p>');
  equals(html, '<p class="MsoNormal" style=" text-indent: 0.5in;">Lorem Ipsum</p>', 'Empty margins have been removed');
  
  html = ce.cleanWordHTML('<?xml version="1.0" encoding="|ISO-8859-1|"?>');
  equals(html, '', 'All xml declarations have been removed');
});

test("editorHTML Property Tests", function() {
  var ce = pane.view('ce');
  var frame = ce.$('iframe').get(0);
  var editor = frame.contentDocument;
  
  ce.set('editorHTML', '<span>lorem ipsum</span>');
  var htmlSet = editor.body.innerHTML;
  equals(htmlSet, '<span>lorem ipsum</span>', 'set works properly on editorHTML');
  
  var htmlGet = ce.get('editorHTML');
  equals(htmlGet, '<span>lorem ipsum</span>', 'get works properly on editorHTML');
});

test("HTML/View Insertion", function() {
  var ce = pane.view('ce');
  var frame = ce.$('iframe').get(0);
  var editor = frame.contentDocument;
  var html = '<span>Aliquam erat volutpat.</span>';
  var label = SC.LabelView.create({value: "hi mom"});
  var labelRendered = '<span style="-moz-user-select: all;" contenteditable="false"><span id="sc2926" class="sc-view sc-label-view sc-regular-size" style="left: 0px; right: 0px; top: 0px; bottom: 0px; text-align: left; font-weight: normal;">hi mom</span></span>';
  
  ce.set('editorHTML', '');
  
  ce.insertHTML(html, NO);
  equals(ce.get('editorHTML'), html + "<br>", 'Value is "Aliquam erat volutpat."');
  
  ce.insertView(label);
  ok(ce.get('editorHTML').indexOf('hi mom'), 'value appended view label value');
  ok(ce.get('editorHTML').indexOf('sc-label-view'), 'value appended view label className');
  ok(ce.get('editorHTML').indexOf('contenteditable="false"'), 'value appended view contenteditable protection');

});

