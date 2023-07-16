import { Moment } from 'moment';
import moment from 'moment/moment';

export const getTime = (dateTime: string | null | undefined) => dateTime
  ? moment(dateTime).local().format("HH:mm:ss")
  : null;
