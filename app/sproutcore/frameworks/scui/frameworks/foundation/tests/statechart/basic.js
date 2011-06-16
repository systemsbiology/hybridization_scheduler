// ==========================================================================
// SCUI.Statechart Unit Test
// ==========================================================================
/**
  @author Mike Ball
*/
var basic;

// ..........................................................
// CONTENT CHANGING
// 

module("SCUI.Statechart Mixin: Basic Unit test", {
  setup: function() {
    basic = SC.Object.create(SCUI.Statechart,{
      startStates: {'default': 'bar'},
      startOnInit: NO,
      
      foo: SCUI.Statechart.registerState({
        initState: function(){
          this.set('fooStateInit', true);
        },
        
        enterState: function(){

        },

        exitState: function(){

        },
        
        
        blah: function(){
          this.goState('bar');
        },
        
        whatever: function(){
          basic.set('whateverWasCalled', YES);
        }
      })
    });
    basic.mixin({
      bar: SCUI.Statechart.registerState({
        
        enterState: function(){

        },

        exitState: function(){

        },

        blah: function(){
          this.goState('bar');
        }

      })     
    });
    basic.startupStatechart();
  },
  
  teardown: function() {
    basic.destroy();
  }
});

test("basic state transition", function() {
  basic.foo.goState('foo');
  equals(basic.foo, basic.foo.state(), "should be in state foo");
  basic.foo.goState('bar');
  equals(basic.bar, basic.bar.state(), "should be in state bar");
  equals(basic.bar, basic.foo.state(), "should be in state bar");
});

test("test inState method", function(){
  basic.foo.goState('foo');
  ok(basic.isInState(basic.foo), "checking with the object, should be in state foo");
  ok(basic.isInState('foo'), "checking with the string, should be in state foo");
});

test("basic sendEvent", function(){
  basic.foo.goState('foo');
  equals(basic.get('whateverWasCalled'), null, "nothing to report");
  basic.sendEvent("whatever");
  equals(basic.get("whateverWasCalled"), YES, "whatever method was called");
});

test("test method alias", function(){
  equals(basic.sendAction, basic.sendEvent, "these methods are the same");
});

test("test basic init", function(){
  ok(basic.getPath('foo.fooStateInit'), "foo state should have had init called");
});


