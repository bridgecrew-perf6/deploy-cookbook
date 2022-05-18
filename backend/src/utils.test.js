const util = require("./utils");

// eslint-disable-next-line no-undef
test("Full date looks like a date.", () => {
  const today = util.getCurrentDate();
  today.match(
    /^([0-9]{4})-([0-1][0-9])-([0-3][0-9])\s([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$/
  );
});
