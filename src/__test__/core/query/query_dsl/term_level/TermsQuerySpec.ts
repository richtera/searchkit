import {
  TermsQuery
} from "../../../../../"

test("TermsQuery", ()=> {
  expect(TermsQuery("color", ["red", "blue"])).toEqual({
    terms:{
      color:["red", "blue"]
    }
  })
})
