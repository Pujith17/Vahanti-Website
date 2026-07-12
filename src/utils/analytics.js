/**
 * Light abstraction for tracking analytics events.
 * Currently logs to console, but can be easily wired up to
 * Google Analytics, PostHog, Plausible, or Mixpanel later.
 */
export const trackEvent = (eventName, eventProperties = {}) => {
  try {
    // Format timestamp
    const timestamp = new Date().toISOString();
    
    // Log event in development/production console
    console.log(`[Analytics Event] [${timestamp}] ${eventName}`, eventProperties);
    
    // If window.gtag or window.plausible exists in the future, we can plug it in here:
    // if (window.gtag) {
    //   window.gtag('event', eventName, eventProperties);
    // }
  } catch (error) {
    console.error('Failed to track analytics event:', error);
  }
};
