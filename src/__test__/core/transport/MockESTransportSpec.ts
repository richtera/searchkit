import {MockESTransport, ESTransport} from "../../../"
import "jasmine-ajax"


describe("MockESTransport", ()=> {

  beforeEach(()=> {
    this.transport = new MockESTransport()
  })

  test("contructed correctly", ()=> {
    expect(this.transport).toEqual(
      jasmine.any(ESTransport)
    )
  })

  test("search()", (done)=> {
    this.transport.search("query").then((returnValue)=> {
      expect(returnValue).toEqual("query")
      done()
    })

  })

})
