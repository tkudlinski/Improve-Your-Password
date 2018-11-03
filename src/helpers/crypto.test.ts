import { getHash, getPassword } from "./crypto";

it("return proper hash", () => {
  const hash = getHash("");
  expect(hash).toEqual("a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26");
});

it("return proper password", () => {
    let hash = getPassword("", 1, 16);
    expect(hash).toEqual("-a69f73cca23a9ac");
    expect(hash).toHaveLength(16)

    hash = getPassword("", 100, 16);
    expect(hash).toEqual("-c716dcab6160d28");
    expect(hash).toHaveLength(16)

    hash = getPassword("test", 100, 16);
    expect(hash).toEqual("test-fbd17bc4bfe");
    expect(hash).toHaveLength(16)

    hash = getPassword("test", 100, 64);
    expect(hash).toEqual("test-fbd17bc4bfeee08e220910d74bda9a52197d9123c46ecd79b7c2eca26c6a676345a9a8736b046c2a70fd235af5cd43049ee68b83ff945feb1cb0aba451f");
    expect(hash).toHaveLength(64)
  });
  
