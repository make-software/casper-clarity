import { ExportUsersJob, ManagementClient } from 'auth0';
import moment from 'moment';
import { createGunzip } from 'zlib';
import request from 'request';
import { ClarityMetrics } from './server';

export class MetricsFromAuth0 {
  constructor(
    private managementClient: ManagementClient,
    private clarityMetrics: ClarityMetrics
  ) {}

  private async accountKeyStats() {
    // https://auth0.github.io/node-auth0/module-management.ManagementClient.html#exportUsers
    this.managementClient.exportUsers(
      {
        format: 'json',
        fields: [
          {
            name: 'user_metadata.accounts',
            export_as: 'userAccount'
          },
          {
            name: 'email',
            export_as: 'email'
          }
        ]
      },
      async (err, job) => {
        if (err) {
          console.error(err);
        } else {
          const jobId = job.id;
          const intervalId = setInterval(async () => {
            const jobInfo = (await this.managementClient.getJob({
              id: jobId
            })) as ExportUsersJob;
            switch (jobInfo.status) {
              case 'pending':
                break;
              case 'processing':
                break;
              case 'completed':
                clearInterval(intervalId);
                let buffer = '';
                request(jobInfo.location!)
                  .pipe(createGunzip())
                  .on('data', (d: any) => {
                    buffer += d;
                  })
                  .on('end', async () => {
                    let totalKey = 0;
                    let totalUser = 0;
                    const keyCountMap = new Map();
                    buffer
                      .trim()
                      .split('\n')
                      .forEach(b => {
                        try {
                          const userInfo = JSON.parse(b);
                          const userKeyAccount =
                            userInfo?.userAccount?.length || 0;
                          totalKey += userKeyAccount;
                          totalUser += 1;
                          keyCountMap.set(
                            userKeyAccount,
                            (keyCountMap.get(userKeyAccount) || 0) + 1
                          );
                        } catch {
                          // do nothing
                          console.error('failed to parse exported file');
                        }
                      });
                    const dailyState = await this.userStats();
                    this.clarityMetrics.accountKeyGauge.set(totalKey);
                    this.clarityMetrics.accountGauge.set(totalUser);
                    this.clarityMetrics.dailyLoginGauge.set(
                      dailyState[0].logins || 0
                    );
                    this.clarityMetrics.dailySignupGauge.set(
                      dailyState[0].signups || 0
                    );
                    return;
                  });
                break;
              case 'failed':
                clearInterval(intervalId);
                console.error(`job ${job.id} failed`);
                break;
            }
          }, 10 * 1000);
        }
      }
    );
  }

  private async userStats() {
    return await this.managementClient.getDailyStats({
      from: moment()
        .subtract(1, 'days')
        .format('YYYYMMDD'),
      to: moment()
        .subtract(1, 'days')
        .format('YYYYMMDD')
    });
  }

  public async runJob() {
    console.log(`${new Date()}: start new job`);
    await this.accountKeyStats();
  }
}
