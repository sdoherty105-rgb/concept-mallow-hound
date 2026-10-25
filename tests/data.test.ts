import { describe, expect, it } from "vitest";
import {
  COATS,
  SIZES,
  SUBURBS,
  checkSuburb,
  formatDuration,
  recommend,
} from "@/lib/data";
import { EMPTY, validate } from "@/lib/booking";

describe("coat selector recommendations", () => {
  it("recommends a package, time and price for every coat and size", () => {
    for (const c of COATS) {
      for (const s of SIZES) {
        const r = recommend(c.id, s.id);
        expect(r.package.name).toBeTruthy();
        expect(r.price).toBeGreaterThan(0);
        expect(r.minutes).toBeGreaterThanOrEqual(30);
        expect(r.minutes % 5).toBe(0);
      }
    }
  });

  it("maps coats to sensible packages", () => {
    expect(recommend("short", "small").package.id).toBe("fresh-start");
    expect(recommend("double", "large").package.id).toBe("shed-less");
    expect(recommend("curly", "medium").package.id).toBe("full-mallow");
  });

  it("gets pricier and slower as the dog gets bigger", () => {
    for (const c of COATS) {
      const rs = SIZES.map((s) => recommend(c.id, s.id));
      for (let i = 1; i < rs.length; i++) {
        expect(rs[i].price).toBeGreaterThan(rs[i - 1].price);
        expect(rs[i].minutes).toBeGreaterThan(rs[i - 1].minutes);
      }
    }
  });

  it("computes known values", () => {
    const r = recommend("curly", "medium");
    expect(r.price).toBe(139);
    expect(r.minutes).toBe(140);
    expect(formatDuration(140)).toBe("2 hr 20 min");
    expect(formatDuration(60)).toBe("1 hr");
    expect(formatDuration(45)).toBe("45 min");
  });
});

describe("service area check", () => {
  it("finds covered suburbs regardless of case and spacing", () => {
    const r = checkSuburb("  mallow   BAY ");
    expect(r.kind).toBe("covered");
  });
  it("treats unknown places as outside, with suggestions for near matches", () => {
    const r = checkSuburb("Quandong");
    expect(r.kind).toBe("covered");
    const far = checkSuburb("Narnia");
    expect(far.kind).toBe("outside");
    const near = checkSuburb("Mar");
    expect(near.kind).toBe("outside");
    if (near.kind === "outside") expect(near.suggestions.map((s) => s.name)).toContain("Marri Springs");
  });
  it("is empty for blank input", () => {
    expect(checkSuburb("   ").kind).toBe("empty");
  });
  it("has suburbs in both zones", () => {
    expect(new Set(SUBURBS.map((s) => s.zone))).toEqual(new Set([1, 2]));
  });
});

describe("booking form validation", () => {
  const good = {
    ...EMPTY,
    ownerName: "Sam Example",
    email: "sam@example.com",
    mobile: "0400 000 000",
    suburb: "Mallow Bay",
    dogName: "Biscuit",
    coat: "curly",
    size: "small",
    date: "2030-01-10",
    demoOk: true,
  };
  it("accepts a complete form", () => {
    expect(validate(good, "2030-01-01")).toEqual({});
  });
  it("flags every missing required field", () => {
    const errs = validate(EMPTY, "2030-01-01");
    expect(Object.keys(errs).sort()).toEqual(
      ["coat", "date", "demoOk", "dogName", "email", "mobile", "ownerName", "size", "suburb"].sort(),
    );
  });
  it("rejects a bad email and past dates", () => {
    expect(validate({ ...good, email: "nope" }, "2030-01-01").email).toBeTruthy();
    expect(validate({ ...good, date: "2029-12-31" }, "2030-01-01").date).toBeTruthy();
  });
});
