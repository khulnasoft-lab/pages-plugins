import honeycombPlugin from "khulnasoft/pages-plugin-honeycomb";
import sentryPlugin from "khulnasoft/pages-plugin-sentry";
import headersPlugin from "khulnasoft/pages-plugin-headers";
import mailchannelsPlugin from "khulnasoft/pages-plugin-mailchannels";

export const onRequest: PagesFunction[] = [
  honeycombPlugin({
    apiKey: "",
    dataset: "pages-plugin-example",
  }),
  ({ next }) => {
    try {
      return next();
    } catch (thrown) {
      return new Response(`${thrown}`, { status: 500 });
    }
  },
  // sentryPlugin({
  //   // dsn: "https://sentry.io/xyz",
  // }),
  headersPlugin({
    "Access-Control-Allow-Origin": "*",
  }),
  mailchannelsPlugin({
    personalizations: ({ formData }) => [
      {
        to: [{ name: "Greg Brimble", email: "hello@gregbrimble.com" }],
        bcc: [
          {
            name: formData.get("name").toString(),
            email: formData.get("email").toString(),
          },
        ],
      },
    ],
    from: ({ formData }) => ({
      name: formData.get("name").toString(),
      email: formData.get("email").toString(),
    }),
    respondWith: () =>
      new Response(null, {
        status: 302,
        headers: { Location: "/thank-you" },
      }),
  }),
];
