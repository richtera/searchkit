import {
  MultiMatchQuery
} from "../../../../../"


describe("MultiMatchQuery", ()=> {


  test("empty string", ()=> {
    expect(MultiMatchQuery("", {
      fields:["title"]
    })).toBe(undefined)
  })

  test("with string + options", ()=> {
    let query = MultiMatchQuery("foo", {
      type:"phrase_prefix",
      fields:["title"]
    })
    expect(query).toEqual({
      multi_match:{
        query:"foo",
        type:"phrase_prefix",
        fields:["title"]
      }
    })
  })


})
