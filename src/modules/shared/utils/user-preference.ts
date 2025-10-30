import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

type Preferences = {
  country?: string;
  scope?: "GLOBAL" | "COUNTRY";
  currency?: string;
  dateFormat?: string;
  numberFormat?: string;
  timezone?: string;
  measurementSystem?: string;
  weekStart?: string;
  timeFormat?: string;
};

export function createPresenter(prefs: Preferences) {
  const {
    country = "en",
    scope = "GLOBAL",
    currency = "INR",
    dateFormat = "DD/MM/YYYY",
    numberFormat = "1,234.56",
    timezone = "UTC",
    measurementSystem = "metric",
    weekStart = "monday",
    timeFormat = "hh:mm A",
  } = prefs;

  /** Parse numberFormat like "1,234.56" or "1.234,56" */
  function parseNumberFormat(format: string) {
    const parts = format.match(/1(.+)234(.+)56/);
    if (!parts) return { group: ",", decimal: "." };
    return { group: parts[1], decimal: parts[2] };
  }

  const { group: groupSeparator, decimal: decimalSeparator } =
    parseNumberFormat(numberFormat);

  /** 📅 Format date according to timezone and format */
  function formatDate(date: Date | string) {
    return dayjs(date).tz(timezone).format(dateFormat);
  }

  /** 🕒 Format time according to 12h/24h preference */
  function formatTime(date: Date | string) {
    // const format = timeFormat === "12h" ? "hh:mm A" : "HH:mm";
    return dayjs(date).tz(timezone).format(timeFormat);
  }

  /** 💰 Format currency based on locale and currency code */
  function formatCurrency(amount: number) {
    return new Intl.NumberFormat(country, {
      style: "currency",
      currency,
    }).format(amount);
  }

  /** 🔢 Format number according to custom format pattern */
  function formatNumber(value: number) {
    const [intPart, fracPart] = value.toFixed(2).split(".");
    const withGrouping = intPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      groupSeparator
    );
    return `${withGrouping}${decimalSeparator}${fracPart}`;
  }

  /** 📏 Convert between metric and imperial systems */
  function convertMeasurement(
    value: number,
    type: "distance" | "weight" | "temperature"
  ): string {
    if (measurementSystem === "imperial") {
      switch (type) {
        case "distance":
          return `${(value * 0.621371).toFixed(2)} mi`; // km → miles
        case "weight":
          return `${(value * 2.20462).toFixed(2)} lb`; // kg → pounds
        case "temperature":
          return `${((value * 9) / 5 + 32).toFixed(1)} °F`; // °C → °F
      }
    }

    // Metric system (default)
    switch (type) {
      case "distance":
        return `${value.toFixed(2)} km`;
      case "weight":
        return `${value.toFixed(2)} kg`;
      case "temperature":
        return `${value.toFixed(1)} °C`;
    }
  }

  /** 📆 Return start of week based on preference */
  function getWeekStart() {
    return weekStart;
  }

  /** 🌍 Return scope (GLOBAL or COUNTRY level) */
  function getScope() {
    return scope;
  }

  return {
    formatDate,
    formatTime,
    formatCurrency,
    formatNumber,
    convertMeasurement,
    getWeekStart,
    getScope,
  };
}
