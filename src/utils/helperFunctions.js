import { toast } from 'react-toastify';
import * as momentTimezone from 'moment-timezone';

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
