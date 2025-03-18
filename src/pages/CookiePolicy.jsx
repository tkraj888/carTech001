import { useEffect } from "react";

function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-screen-3xl bg-light-blue-50">
      <div className="w-full">
        <div className="flex justify-center items-center bg-light-blue-200 h-auto">
          <div>
            <p className="text-4xl md:text-6xl lg:text-6xl m-6 lg:m-32 text-[#1E2761]">
              Cookie Policy
            </p>
          </div>
        </div>
        <div className="max-w-screen-3xl mx-4 my-6 md:ml-20 md:mr-12 lg:ml-36 lg:mr-24">
          <p className="text-3xl font-bold">Introduction</p>
          <p className="mt-8 text-lg">
            CarTechIndia is committed to protecting your privacy. We aim to
            provide trustworthy, industry-leading products and services so that
            you can focus on building meaningful connections. Our approach to
            privacy is to provide you with clear information about our data
            practices. That’s why we have tried to keep legal and technical
            jargon to a minimum.
          </p>
          <p className="mt-4 text-lg">
            This Cookie Policy explains what cookies are, what types of cookies
            are placed on your device when you visit our website and how we use
            them.
          </p>
          <p className="mt-4 text-lg">
            This Cookie Policy does not address how we deal with your personal
            information generally.
          </p>

          <p className="text-3xl font-bold mt-8">What are cookies?</p>
          <p className="mt-6 text-lg">
            Cookies are small text files that are sent to or accessed from your
            web browser or your device’s memory. A cookie typically contains the
            name of the domain (internet location) from which the cookie
            originated, the “lifetime” of the cookie (i.e., when it expires) and
            a randomly generated unique number or similar identifier. A cookie
            also may contain information about your device, such as user
            settings, browsing history and activities conducted while using our
            services.
          </p>

          <p className="text-3xl font-bold mt-8">Are there different types of cookies?</p>
          <p className="mt-8 text-xl"><b>First-party and third-party cookies</b></p>
          <p className="mt-2 text-lg">
            There are first-party cookies and third-party cookies. First-party
            cookies are placed on your device directly by us. For example, we
            use first-party cookies to adapt our website to your browser’s
            language preferences and to better understand your use of our
            website. Third-party cookies are placed on your device by our
            partners and service providers. For example, we use third-party
            cookies to measure user numbers on our website or to enable you to
            share content with others across social media platforms.
          </p>
          <p className="mt-8 text-xl"><b>Session and persistent cookies</b></p>
          <p className="mt-2 text-lg">
            There are session cookies and persistent cookies. Session cookies
            only last until you close your browser. We use session cookies for a
            variety of reasons, including to learn more about your use of our
            website during one single browser session and to help you to use our
            website more efficiently. Persistent cookies have a longer lifespan
            and are not automatically deleted when you close your browser. These
            types of cookies are primarily used to help you quickly sign-in to
            our website again and for analytical purposes.
          </p>

          <p className="text-3xl font-bold mt-8">What about other tracking technologies, like web beacons?</p>
          <p className="mt-8 text-lg">
            Other technologies such as web beacons (also called pixel tags or
            clear gifs), tracking URLs or software development kits (SDKs) are
            used for similar purposes. Web beacons are tiny graphics files that
            contain a unique identifier that enable us to recognize when someone
            has visited our service or opened an email that we have sent them.
            Tracking URLs are custom-generated links that help us understand
            where the traffic to our web pages comes from. SDKs are small pieces
            of code included in apps, which function like cookies and web
            beacons.
          </p>
          <p className="mt-4 text-lg">
            For simplicity, we also refer to these technologies as “cookies” in
            this Cookie Policy.
          </p>
          <p className="mt-4 text-xl font-bold">What do we use cookies for?</p>
          <p className="mt-2 text-lg">
            Like all providers of online services, we use cookies to provide,
            secure and improve our services, including by remembering your
            preferences, recognizing you when you visit our website and
            personalizing and tailoring ads to your interests. To accomplish
            these purposes, we also may link information from cookies with other
            personal information we hold about you.
          </p>
          <p className="mt-4 text-lg">
            When you visit our website, some or all of the following types of
            cookies may be set on your device.
          </p>

          <div className="mt-8">
            <p className="flex text-lg mt-8 mb-3">
              <b>Essential website cookies:</b>
              <span>
                These cookies are strictly necessary to provide you with
                services available through our website and to use some of its
                features, such as access to secure areas.
              </span>
            </p>
            <hr />
            <p className="mt-8 text-lg mb-3">
              <b>Analytics cookies:</b> These cookies help us understand how our
              website is being used, how effective marketing campaigns are, and
              help us customize and improve our websites for you.
            </p>
            <hr />
            <p className="flex text-lg mt-8 mb-3">
              <b>Advertising cookies:</b>
              <span>
                These cookies are used to make advertising messages more
                relevant to you. They perform functions like preventing the same
                ad from continuously reappearing, ensuring that ads are properly
                displayed for advertisers, selecting advertisements that are
                based on your interests and measuring the number of ads
                displayed and their performance, such as how many people clicked
                on a given ad.
              </span>
            </p>
            <hr />
            <p className="flex text-lg mt-8 mb-3">
              <b>Social networking cookies:</b>
              <span>
                These cookies are used to enable you to share pages and content
                that you find interesting on our website through third-party
                social networking and other websites. These cookies may also be
                used for advertising purposes too.
              </span>
            </p>
            <hr />
          </div>

          <p className="text-3xl font-bold mt-8">How can you control cookies?</p>

          <p className="mt-8 text-lg">
            There are several cookie management options available to you. Please
            note that changes you make to your cookie preferences may make
            browsing our website a less satisfying experience. In some cases,
            you may even find yourself unable to use all or part of our site.
          </p>
          <p className="mt-8 text-xl"><b>Browser and devices controls</b></p>
          <p className="mt-2 text-lg">
            Some web browsers provide settings that allow you to control or
            reject cookies or to alert you when a cookie is placed on your
            computer. The procedure for managing cookies is slightly different
            for each internet browser. You can check the specific steps in your
            particular browser help menu.
          </p>
          <p className="mt-4 text-lg">
            You also may be able to reset device identifiers by activating the
            appropriate setting on your mobile device. The procedure for
            managing device identifiers is slightly different for each device.
            You can check the specific steps in the help or settings menu of
            your particular device.
          </p>
          <p className="mt-8 text-xl"><b>Interest-based advertising tools</b></p>
          <p className="mt-2 text-lg">
            You can opt out of seeing online interest-based advertising from
            participating companies through the Digital Advertising Alliance,
            the Interactive Digital Advertising Alliance or Appchoices (apps
            only).
          </p>
          <p className="mt-4 text-lg">
            Opting out does not mean you will not see advertising - it means you
            won’t see personalized advertising from the companies that
            participate in the opt-out programs. Also, if you delete cookies on
            your device after you opted out, you will need to opt-out again.
          </p>

          <p className="text-3xl font-bold mt-8">Social Cookies</p>
          <p className="mt-6 text-lg">
            To allow you to share content on social media, some features of this
            website use social media plug-ins (e.g., Twitter™ “Share to Twitter”
            or LinkedIn™ “in” buttons or Facebook). Depending on your social
            media account settings, we automatically receive information from
            the social media platform when you use the corresponding button on
            our website.
          </p>
          <p className="mt-4 text-lg">
            To learn more about social media cookies, we suggest you refer to
            your social media platform’s cookie policy and privacy policy.
          </p>

          <p className="text-3xl font-bold mt-8">Adobe Flash Player™ Flash cookies</p>

          <p className="mt-6 text-lg">
            Adobe Flash Player™ is an application for viewing and interacting
            with dynamic content using the Flash platform. Flash (and similar
            applications) use a technology akin to cookies to memorize
            parameters, preferences and uses of this content. However, Adobe
            Flash Player manages this information and your choices via an
            interface separate from that supplied by your browser.
          </p>
          <p className="mt-4 text-lg">
            If your terminal is likely to display content developed using the
            Flash platform, we suggest you access your Flash cookie management
            tools directly via https://www.adobe.com.
          </p>
          <p className="mt-4 text-lg">
            <b>Google™ Cookies</b>
          </p>
          <p className="mt-4 text-lg">
            <b>Stuff Google Wants to Make Sure You Know about Google’s Data
            Collection Technology</b>
          </p>
          <p className="mt-4 text-lg">
            <b>Google™ Maps API Cookies</b>
          </p>
          <p className="mt-4 text-lg">
            Some features of our website and some CarTechIndia services rely on
            the use of Google™ Maps API Cookies. Such cookies will be stored on
            your device.
          </p>
          <p className="mt-4 text-lg">
            When browsing this website and using the services relying on Google™
            Maps API cookies, you consent to the storage, collection of such
            cookies on your device and to the access, usage and sharing by
            Google of the data collected thereby.
          </p>
          <p className="mt-4 text-lg ">
            Google™ manages the information and your choices pertaining to
            Google™ Maps API Cookies via an interface separate from that
            supplied by your browser. For more information, please see
            <i className="text-xs"> https://www.google.com/policies/technologies/cookies/.</i>
          </p>
          <p className="mt-4 text-lg">
            <b>Google Analytics</b>
          </p>
          <p className="mt-4 text-lg">
            We use Google Analytics, which is a Google service that uses cookies
            and other data collection technologies to collect information about
            your use of the website and services in order to report website
            trends.
          </p>
          <p className="mt-4 text-lg">
            You can opt out of Google Analytics by visiting
            www.google.com/settings/ads or by downloading the Google Analytics
            opt-out browser add-on at
            <i className="text-xs"> https://tools.google.com/dlpage/gaoptout.</i>
          </p>

          <p className="text-3xl font-bold mt-8">How to contact us?</p>

          <p className="mt-6 text-lg">
            If you have questions about this Cookie Policy, here’s how you can
            reach us:
          </p>
          <p className="mt-6 text-lg">Online: asif.attar@caryanam.in</p>
          <p className="mt-6 text-lg">By phone: 7755994123</p>
          {/* <p className="mt-6 text-lg">By post: CarTechIndia Pvt. Ltd. 1128, 3rd floor, Rd Number 36, Jubilee Square, Jubilee Hills, Pune, Maharashtra 500033</p> */}
        </div>
      </div>
    </div>
  );
}

export default CookiePolicy;
