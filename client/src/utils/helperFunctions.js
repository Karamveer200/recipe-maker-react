import { toast } from 'react-toastify';
import * as momentTimezone from 'moment-timezone';
import moment from 'moment';

export const scrollToTop = (smooth = false) => {
  if (smooth) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  } else {
    window.scrollTo(0, 0);
  }
};

export const displayErrors = (errors = []) => {
  errors.forEach((item) => toast.error(item.msg));
};

export const isArray = (arr) => {
  return Array.isArray(arr) && arr?.length > 0 ? true : false;
};

export const getUserLocalTimezone = () => {
  return momentTimezone().tz(momentTimezone.tz.guess()).format('z');
};

export const convertTimeToMomentFormat = (timeStamp) => {
  const mom = moment(timeStamp)?.locale('en');
  const date = mom?.format('MMMM DD, YYYY');
  const time = mom?.format('hh:mm A');

  return { date, time };
};

export const parseLocalStorageToArray = (key) => {
  try {
    const getExistingRecipes = localStorage.getItem(key);
    return JSON.parse(getExistingRecipes) || [];
  } catch (error) {
    console.log(error);
  }
};

export const isArrayReady = (arr) => {
  return isArray(arr) ? arr : [];
};
