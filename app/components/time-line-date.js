import Ember from 'ember';
import moment from 'moment';
import MathHelper from '../mixins/math-helper';


const {
  Component,
  computed,
  run: {
    bind
  }
} = Ember;

export default Component.extend(MathHelper, {
  classNames: ['time-line-date'],
  classNameBindings: ['modifierActive'],

  modifierActive: computed('day', 'chapters', function () {
    let sameDate = this.get('chapters').find(bind(this, function (chapter) {
      return moment(chapter.get('date')).format('YYYY-MM-DD') === moment(this.get('day')).format('YYYY-MM-DD');
    }));
    return sameDate ? 'time-line-date--active' : '';
  }),

  didInsertElement: function () {
    let position = this.scale(
      moment(this.get('day')).format('X'),
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
