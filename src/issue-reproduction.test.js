import { createThing } from "@inrupt/solid-client";

test("calling createThing should not throw an error", () => {
  createThing({ url: "http://test.com" });
});
