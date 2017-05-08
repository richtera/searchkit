import * as React from "react";
import {mount} from "enzyme";
import {NoHits} from "../src/NoHits";
import {SearchkitManager} from "../../../../core";
import {
  fastClick, hasClass, jsxToHTML, printPrettyHtml
} from "../../../__test__/TestHelpers"

import {InitialLoader} from "../src/InitialLoader";

describe("InitialLoader", ()=> {

  beforeEach(()=> {
    this.searchkit = SearchkitManager.mock()
    this.wrapper = mount(
      <InitialLoader searchkit={this.searchkit}/>
    )
  })

  test("should render correctly", ()=> {
    expect(this.wrapper.html()).toEqual(jsxToHTML(
      <div className="sk-initial-loader">
        <div data-qa="initial-loading" className="sk-initial-loader__initial-loading"></div>
      </div>
    ))
    this.searchkit.initialLoading = false
    this.wrapper.update()
    expect(this.wrapper.children().length).toBe(0)
  })

  test("should render a custom component", ()=> {
    let higherOrderComp = ({bemBlocks})=> (
      <p className={bemBlocks.container("foo")}>Loading</p>
    )
    let wrapper = mount(<InitialLoader searchkit={this.searchkit} component={higherOrderComp}/>)
    expect(wrapper.html()).toEqual(jsxToHTML(
      <p className="sk-initial-loader__foo">Loading</p>
    ))
  })


})
