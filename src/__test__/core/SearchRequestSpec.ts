import {
  SearchRequest,
  SearchkitManager,
  AxiosESTransport,
  ImmutableQuery
} from "../../"

describe("SearchRequest", ()=> {

  beforeEach(()=> {
    this.searchkit = SearchkitManager.mock()
    this.transport = new AxiosESTransport("http://localhost:9200")

    this.query = new ImmutableQuery().setSize(10)

    this.request = new SearchRequest(
      this.transport, this.query.getJSON(), this.searchkit)
  })

  test("constructor()", ()=> {
    expect(this.request.active)
      .toBe(true)
    expect(this.request.transport)
      .toBe(this.transport)
    expect(this.request.searchkit).toBe(
      this.searchkit)
    expect(this.request.query).toBe(
      this.query.getJSON())
  })


  test("run() - success", (done)=> {
    spyOn(this.request.transport, "search")
      .and.returnValue(Promise.resolve([
        "r1", "r2", "r2"
      ]))
    this.request.run().then(()=> {
      expect(this.searchkit.results)
        .toEqual(["r1", "r2", "r2"])
      done()
    })
  })

  test("run() - error", ()=> {
    console.error = jest.genMockFn()

    let error = new Error("oh no")
    spyOn(this.request.transport, "search")
      .and.returnValue(Promise.reject(error))
    this.request.run().then(()=> {
      expect(this.searchkit.error).toBe(error)
      expect(console.error).toBeCalled()
    })
  })

  test("deactivate()", ()=> {
    this.request.deactivate()
    expect(this.request.active).toBe(false)
  })

  test("setResponses()", ()=> {
    this.request.setResults("results")
    expect(this.searchkit.results).toBe("results")
    delete this.searchkit.results
    this.request.deactivate()
    this.request.setResults("results")
    expect(this.searchkit.results).toBe(undefined)
  })

  test("setError()", ()=> {
    let error = new Error("oh no")
    this.request.setError(error)
    expect(this.searchkit.error).toBe(error)
    delete this.searchkit.error
    this.request.deactivate()
    this.request.setError(error)
    expect(this.searchkit.error).toBe(undefined)
  })

})
