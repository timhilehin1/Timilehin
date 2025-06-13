import ReactGA from "react-ga4";
// Your GA4 Measurement ID
const GA_MEASUREMENT_ID = "G-NEHH4DELW5";

export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPageView = (path: string) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

export const trackEvent = (eventName: string, parameters = {}) => {
  ReactGA.event(eventName, parameters);
};

// Specific function to track resume download
export const trackResumeDownload = () => {
  ReactGA.event("download", {
    event_category: "engagement",
    event_label: "resume_download",
    value: 1,
  });
};

export const trackButtonClick = (buttonName: string) => {
  ReactGA.event("click", {
    event_category: "engagement",
    event_label: buttonName,
    value: 1,
  });
};
