import Ember from 'ember';
import SlyMixin from '../../../mixins/sly';
import { module, test } from 'qunit';

module('Unit | Mixin | sly');

// Replace this with your real tests.
test('it works', function(assert) {
  var SlyObject = Ember.Object.extend(SlyMixin);
  var subject = SlyObject.create();
  assert.ok(subject);
});
