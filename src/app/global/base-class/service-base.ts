export class ServiceBase {
  public apiUrlDomain: string;

  public messages: any[] = [];

  constructor() {
    this.apiUrlDomain = 'https://localhost:44355/api/';
  }
}
