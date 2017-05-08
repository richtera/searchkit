import {
  SourceFilterAccessor, ImmutableQuery
} from "../../../"

describe("SourceFilterAccessor", ()=> {

  beforeEach(()=> {
    this.accessor = new SourceFilterAccessor(["title.*"])
    this.query = new ImmutableQuery()
  })

  test("constructor()", ()=> {
    expect(this.accessor.source).toEqual(["title.*"])
  })

  test("buildSharedQuery()", ()=> {
    let query = this.accessor.buildSharedQuery(this.query)
    expect(query).not.toBe(this.query)
    expect(query.query._source).toEqual(["title.*"])
  })

})
