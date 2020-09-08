export type MetricType = 'deploy';

export default class MetricsService {
  constructor() {}

  /** Call the API on the server backend. */
  static async metricCollect(
    type: MetricType,
    jwtToken: string
  ): Promise<void> {
    await fetch('/api/collect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`
      },
      body: JSON.stringify({ eventType: type })
    }).catch(err => {
      console.error(err);
    });
  }
}
