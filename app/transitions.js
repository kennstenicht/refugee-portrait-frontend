export default function() {
  this.transition(
    this.toRoute('chapter'),
    this.use('toUp'),
    this.reverse('toDown')
  );
}