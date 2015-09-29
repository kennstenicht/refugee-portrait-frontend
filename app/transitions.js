export default function() {
  this.transition(
    this.hasClass('preview-test__overlay-wrapper'),
    this.use('fade', { duration: 3000 }),
    this.reverse('fade', { duration: 3000 })
  );
}