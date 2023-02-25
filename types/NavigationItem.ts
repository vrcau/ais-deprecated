export default class NavigationItem {
  icon: string;
  name: string;
  uri: string;

  constructor(icon: string, name: string, uri: string) {
    this.icon = icon;
    this.name = name;
    this.uri = uri;
  }
}
