
import { api } from '@/lib/axios'

import { AxiosResponse } from 'axios'
import { IHolidays } from '@/types/holiday';


export interface ApiHoliday {
  getAll: (year: number) => Promise<IHolidays>;
}

export const apiHoliday: ApiHoliday = {
  getAll: (year) => api.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/UA`).then(qw),
};


const qw = <T>(response: AxiosResponse<T>): T => response.data;