export class LessonOutOfRange extends Error {
  constructor(
    public idx: number,
    public nextIdx: number,
    public flattedLength: number,
  ) {
    super(
      `A lesson is out of range. Context: (idx, nextIdx, flattedLength) = (${idx}, ${nextIdx}, ${flattedLength})`,
    );
    this.name = 'LessonOutOfRange';
  }
}
