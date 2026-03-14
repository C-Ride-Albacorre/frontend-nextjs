
'use server';

import { dashboardStatsService } from "./service";


export async function getDashboardStatsAction() {
  const res = await dashboardStatsService();
  return res.data.data;
}
