import Ember from 'ember';
import DS from 'ember-data';

const {
  $
} = Ember;

const {
  Transform
} = DS;

export default Transform.extend({
  deserialize: function(value) {
    if (!$.isPlainObject(value)) {
      return {};
    } else {
      return value;
    }
  },
  serialize: function(value) {
    if (!$.isPlainObject(value)) {
      return {};
    } else {
      return value;
    }
  }
});