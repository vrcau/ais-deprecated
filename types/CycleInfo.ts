export default class CycleInfo {
  cycle: number;
  lastCycleUpdatedAt: number;
  airports: number;
  charts: number;
  notams: number;

  constructor(
    cycle: number,
    lastCycleUpdatedAt: number,
    airports: number,
    charts: number,
    notams: number
  ) {
    this.cycle = cycle;
    this.lastCycleUpdatedAt = lastCycleUpdatedAt;
    this.airports = airports;
    this.charts = charts;
    this.notams = notams;
  }
}
