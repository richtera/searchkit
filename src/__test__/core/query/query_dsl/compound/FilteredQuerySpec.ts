import {
  FilteredQuery
} from "../../../../../"

test("FilteredQuery", ()=> {
  let filtered = {
    filter:{
      term:{color:"red"}
    },
    query:{
      match:{
        keywords:"sky"
      }
    }
  }
  expect(FilteredQuery(filtered))
    .toEqual({filtered:filtered})

})
