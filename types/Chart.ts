export default class Chart {
  name: string;
  url: string;
  type: string;

  constructor(name: string, url: string, type: string) {
    this.name = name;
    this.url = url;
    this.type = type;
  }
}
