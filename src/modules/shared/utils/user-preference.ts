import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezonePlugin);

type Preferences = {
  timezone?: string;
  dateFormat?: string;
  timeFormat?: string;
  country?: string;
  currency?: string;
  measurementSystem?: string;
  numberFormat?: string;
};

/**
 * Returns an object with functions to format data
 * according to user preferences.
 */
export function createPresenter(prefs: Preferences) {
  const {
    timezone = "UTC",
    dateFormat = "DD/MM/YYYY",
    timeFormat = "24h",
    country = "en-IN",
    currency = "INR",
    measurementSystem = "metric",
  } = prefs;

  function formatDate(date: Date) {
    return dayjs(date).tz(timezone).format(dateFormat);
  }

  function formatTime(date: Date) {
    const format = timeFormat === "12h" ? "hh:mm A" : "HH:mm";
    return dayjs(date).tz(timezone).format(format);
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat(country, {
      style: "currency",
      currency,
    }).format(amount);
  }

  function formatNumber(value: number) {
    return new Intl.NumberFormat(country).format(value);
  }

  function convertMeasurement(value: number, type: "distance" | "weight") {
    if (measurementSystem === "imperial") {
      if (type === "distance") return (value * 0.621371).toFixed(2) + " mi";
      if (type === "weight") return (value * 2.20462).toFixed(2) + " lb";
    }
    return type === "distance"
      ? value.toFixed(2) + " km"
      : value.toFixed(2) + " kg";
  }

  return {
    formatDate,
    formatTime,
    formatCurrency,
    formatNumber,
    convertMeasurement,
  };
}
