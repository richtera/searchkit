import {
  MatchQuery
} from "../../../../../"


describe("MatchQuery", ()=> {


  test("empty string empty field", ()=> {
    expect(MatchQuery("color", null)).toBe(undefined)
    expect(MatchQuery(null, "red")).toBe(undefined)
  })

  test("with string = options", ()=> {    
    expect(MatchQuery("color", "red yellow", {
      operator:"AND"
    })).toEqual({
      match:{
        color:{
          query:"red yellow",
          operator:"AND"
        }
      }
    })
  })


})
