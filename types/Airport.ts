import Chart from "./Chart";
import Notam from "./Notam";

export default class Airport {
  icao: string;
  name: string;

  constructor(icao: string, name: string) {
    this.icao = icao;
    this.name = name;
  }
}

export class AirportDetail extends Airport {
  charts: Chart[];
  notams: Notam[];

  constructor(charts: Chart[], notams: Notam[], icao: string, name: string) {
    super(icao, name);

    this.charts = charts;
    this.notams = notams;
  }
}
