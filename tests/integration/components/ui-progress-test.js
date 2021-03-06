/* global stop, start */
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-progress', 'Integration | Component | ui progress', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#ui-progress percent=40 class="teal indicating"}}
      <div class="bar"></div>
      <div class="label">Completed</div>
    {{/ui-progress}}
  `);

  assert.equal(this.$('.ui.progress').length, 1);
});

test('binding updates progress', function(assert) {
  assert.expect(4);

  var _this = this;

  this.set('progress', 40);
  this.render(hbs`
    {{#ui-progress percent=progress class="teal indicating"}}
      <div class="bar"></div>
      <div class="label">Completed</div>
    {{/ui-progress}}
  `);

  assert.equal(this.$('.ui.progress').length, 1);
  assert.equal(this.$('.ui.progress').attr('data-percent'), 40);
  var width = this.$('.ui.progress .bar').css('width');
  this.set('progress', 60);

  stop();
  setTimeout(function() {
    start();

    assert.equal(_this.$('.ui.progress').attr('data-percent'), 60);
    assert.notEqual(_this.$('.ui.progress .bar').css('width'), width);
  }, 500);
});
