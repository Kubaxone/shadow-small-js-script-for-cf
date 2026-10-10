/**
 * Welcome To Shadow! A Small Software Designed to fix data!
 * 
 * Put this anywhere! for example, shadower.example.com, shadow.example.com, shadowed.example.com
 *
 * quick note! i recommend putting this on diffrent subdomains for bot to not detect
 * 
 * quick logic: if this endpoint dosnt respond with 200 refuse the action.
 */

export default {
  async fetch(request, env, ctx) {
    // For this to work either ping or embed it on your site!

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const country = request.headers.get("CF-IPCountry") || "XX";
    const userAgent = request.headers.get("User-Agent") || "";

    console.log("Shadow check:", ip, country, userAgent);

    // Block Russia
    if (country === "RU") {
      console.error("Shadow blocked request: Russia");
      return new Response("Request blocked", { status: 400 });
    }

    // Reject requests without a User-Agent
    if (!userAgent.trim()) {
      console.error("Shadow blocked request: missing User-Agent");
      return new Response("Request blocked", { status: 400 });
    }

    // Basic bot signal check
    if (/bot|crawler|spider|scrapy|curl|wget|python-requests|headlesschrome|phantomjs|selenium|playwright|puppeteer/i.test(userAgent)) {
      console.error("Shadow blocked request: bot-like User-Agent");
      return new Response("Request blocked", { status: 400 });
    }

    return new Response('[{"name":"Template"}, {"log": 1}]');
  }
};
