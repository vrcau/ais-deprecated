export default class Notam {
  title: string;
  content: string;

  end_at: Date;
  active_at: Date;

  constructor(title: string, content: string, end_at: Date, active_at: Date) {
    this.title = title;
    this.content = content;
    this.end_at = end_at;
    this.active_at = active_at;
  }
}
