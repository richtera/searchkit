import {
  MatchPhrasePrefix
} from "../../../../../"


describe("MatchPhrasePrefix", ()=> {


  test("empty string", ()=> {
    expect(MatchPhrasePrefix("", "title^5")).toBe(undefined)
  })

  test("with string + options", ()=> {
    expect(MatchPhrasePrefix("foo", "title^5")).toEqual({
      match_phrase_prefix:{
        title:{
          query:"foo",
          boost:5
        }
      }
    })
    expect(MatchPhrasePrefix("foo", "title")).toEqual({
      match_phrase_prefix:{
        title:{
          query:"foo",
          boost:1
        }
      }
    })


  })


})
