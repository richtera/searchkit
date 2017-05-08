import {
  CustomHighlightAccessor, ImmutableQuery
} from "../../../"

describe("CustomHighlightAccessor", () => {

  beforeEach(() => {
    this.accessor = new CustomHighlightAccessor({})
  })

  test("constructor(), computeHighlightedFields()", () => {
    expect(this.accessor.highlightRequest).toEqual({})
  })

  test("buildOwnQuery()", () => {
    let query = this.accessor.buildOwnQuery(new ImmutableQuery())
    expect(query.query.highlight).toEqual({})
  })
})
