import Ember from 'ember';
import MathHelper from '../mixins/math-helper';
import moment from 'moment';

const {
  Component
} = Ember;

export default Component.extend(MathHelper, {
  classNames: ['time-line-column'],

  didInsertElement: function () {
    let position = this.scale(
      this.get('date'),
      moment(this.get('story.start')).format('X'),
      moment(this.get('story.end')).format('X'),
      0,
      100
    );

    this.$().css({
      left: position + "%"
    });
  }
});
