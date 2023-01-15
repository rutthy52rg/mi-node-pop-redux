import { getAdvertDetail } from "../selectors";

describe("getAdvertDetail", () => {
  test("should return tweet by tweetId ", () => {
    const advertId = "1";
    const adverts = [
      {
        id: advertId,
      },
    ];
    const state = {
      adverts: { data: adverts },
    };
    expect(getAdvertDetail(advertId)(state)).toBe(adverts[0]);
  });

  test("should not return any tweet ", () => {
    const adverId = "1";
    const adverts = [];
    const state = {
      adverts: { data: adverts },
    };
    expect(getAdvertDetail(adverId)(state)).toBe(undefined);
  });
});
