import Ember from 'ember';
import MathHelperMixin from '../../../mixins/math-helper';
import { module, test } from 'qunit';

module('Unit | Mixin | math helper');

// Replace this with your real tests.
test('it works', function(assert) {
  var MathHelperObject = Ember.Object.extend(MathHelperMixin);
  var subject = MathHelperObject.create();
  assert.ok(subject);
});
