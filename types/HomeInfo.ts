export default class HomeInfo {
  notams: number;
  airports: number;
  charts: number;

  constructor(notams: number, airports: number, charts: number) {
    this.notams = notams;
    this.airports = airports;
    this.charts = charts;
  }
}
