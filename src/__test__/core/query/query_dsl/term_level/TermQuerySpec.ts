import {
  TermQuery
} from "../../../../../"

test("TermQuery", ()=> {
  expect(TermQuery("color", "red")).toEqual({
    term:{
      color:"red"
    }
  })
})
