import Ember from 'ember';
import MathHelper from '../mixins/math-helper';

const {
  Component
} = Ember;

export default Component.extend(MathHelper, {
  classNames: ['time-line-navigator']
});
