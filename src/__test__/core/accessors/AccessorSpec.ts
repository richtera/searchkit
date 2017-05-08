import {
  Accessor,
  Utils,
  SearchkitManager,
  ImmutableQuery
} from "../../../"

describe("Accessor", ()=> {

  beforeEach(()=> {
    this.searchkit = SearchkitManager.mock()
    spyOn(Utils, "guid").and.returnValue("some_uuid")
    this.accessor = new Accessor()
    this.query = new ImmutableQuery()
  })

  test("constructor()", ()=> {
    expect(this.accessor.active).toBe(true)
    expect(this.accessor.uuid).toBe("some_uuid")
    expect(this.accessor.refCount).toBe(0)
  })

  test("incrementRef(), decrementRef()", ()=> {
    this.accessor.incrementRef()
    expect(this.accessor.refCount).toBe(1)
    this.accessor.decrementRef()
    expect(this.accessor.refCount).toBe(0)
  })


  test("setActive()", ()=> {
    expect(this.accessor.setActive(false).active)
      .toBe(false)
  })

  test("setSearchkitManager()", ()=> {
    this.accessor.setSearchkitManager(this.searchkit)
    expect(this.accessor.searchkit).toBe(this.searchkit)
  })

  test("translate()", ()=> {
    expect(this.accessor.translate("foo")).toBe("foo")
    this.searchkit.translate = key => key + "_translated"
    this.accessor.setSearchkitManager(this.searchkit)
    expect(this.accessor.translate("foo")).toBe("foo_translated")
  })

  test("set + get results", ()=> {
    this.accessor.setResults("lots of hits")
    expect(this.accessor.getResults()).toBe("lots of hits")
  })

  test("getAggregations()", ()=> {
    expect(this.accessor.getAggregations(["tags", "buckets"], []))
      .toEqual([])

    this.accessor.setResults({
      aggregations:{
        tags:{
          buckets:[1,2,3]
        }
      }
    })
    expect(this.accessor.getAggregations(["tags", "buckets"], []))
      .toEqual([1,2,3])

    expect(this.accessor.getAggregations(["tags", undefined, "buckets"], []))
      .toEqual([1,2,3])

  })

  test("beforeBuildQuery()", ()=> {
    expect(this.accessor.beforeBuildQuery).toEqual(
      jasmine.any(Function)
    )
    expect(this.accessor.beforeBuildQuery()).toEqual(undefined)

  })

  test("buildSharedQuery()", ()=> {
    expect(this.accessor.buildSharedQuery(this.query))
      .toBe(this.query)
  })

  test("buildOwnQuery()", ()=> {
    expect(this.accessor.buildOwnQuery(this.query))
      .toBe(this.query)
  })

})
