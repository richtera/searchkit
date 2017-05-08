import * as React from "react";
import {mount} from "enzyme";
import {SortingSelector} from "../src/SortingSelector";
import {SearchkitManager } from "../../../../core";
import {Toggle} from "../../../ui";
import * as ReactTestRenderer from 'react-test-renderer'
const bem = require("bem-cn");
import * as _ from "lodash"
import {
  fastClick, hasClass, jsxToHTML, printPrettyHtml
} from "../../../__test__/TestHelpers"

describe("SortingSelector tests", () => {

  beforeEach(()=> {
    this.searchkit = SearchkitManager.mock()
    spyOn(this.searchkit, "performSearch")
    this.setWrapper = (isEnzyme) => {
      const c = (
        <SortingSelector searchkit={this.searchkit} options={[
          {label:"Relevance"},
          {label:"Latest Releases", field:"released", order:"desc"},
          {label:"Earliest Releases", field:"released", order:"asc", key:"earliest"}
        ]} translations={{"Relevance":"Relevance translated"}}/>
      )
      this.wrapper = isEnzyme ? mount(c) : ReactTestRenderer.create(c)
      this.accessor = this.searchkit.accessors.accessors[0]
    }
    this.setResults = ()=> {
      this.searchkit.setResults({
        hits:{
          hits:[1,2],
          total:2
        }
      })
    }
  })

  test("is disabled when no results", ()=> {
    this.setWrapper()
    expect(this.wrapper).toMatchSnapshot()
  })

  test("renders with results", ()=> {
    this.setWrapper()
    this.setResults()
    expect(this.wrapper).toMatchSnapshot()
  })

  test("renders with selected value", ()=> {
    this.setWrapper()
    this.accessor.state = this.accessor.state.setValue("released_desc")
    this.setResults()
    this.setWrapper()
    expect(this.wrapper).toMatchSnapshot()
  })

  test("renders with defaultOption", ()=> {
    this.setWrapper()
    this.accessor.options.options[2].defaultOption = true
    this.setResults()
    this.setWrapper()
    expect(this.wrapper).toMatchSnapshot()
  })

  test("select new sort option", ()=> {
    this.setWrapper(true)
    this.accessor.state = this.accessor.state.setValue("released_desc")
    this.setResults()
    let earlyOption = this.wrapper.find("select").children().at(2)
    earlyOption.simulate("change")
    expect(this.accessor.state.getValue()).toBe("earliest")
    expect(this.searchkit.performSearch).toHaveBeenCalled()
  })

  test("handle prop reload without breaking computed keys", ()=> {
    this.setWrapper(true)
    this.wrapper.setProps({options:[
      {label:"Relevance"},
      {label:"Latest Releases", field:"released", order:"desc"},
      {label:"Earliest Releases", field:"released", order:"asc", key:"earliest"}
    ]})
    this.setResults()
    expect(this.wrapper.find('.sk-select')).toMatchSnapshot()
  })

  test("custom mod, className, listComponent", ()=> {
    this.wrapper = ReactTestRenderer.create(
      <SortingSelector searchkit={this.searchkit}
        mod="my-select" className="custom-class" listComponent={Toggle} options={[
        {label:"Relevance"},
        {label:"Latest Releases", field:"released", order:"desc"},
        {label:"Earliest Releases", field:"released", order:"asc", key:"earliest"}
      ]}/>
    )
    expect(this.wrapper).toMatchSnapshot()

  })

})
