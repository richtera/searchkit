import * as React from "react";;
import {mount, render} from "enzyme";
import {fastClick, hasClass, jsxToHTML, printPrettyHtml} from "../../../__test__/TestHelpers"
import {CheckboxFilter} from "./CheckboxFilter";
import {SearchkitManager, Utils} from "../../../../core";
import {Toggle, ItemComponent} from "../../../ui";
import { TermQuery } from "../../../../core";
import * as ReactTestRenderer from 'react-test-renderer'

const bem = require("bem-cn");
import * as _ from "lodash"

describe("CheckboxFilter tests", () => {
  this.createWrapper = (isEnzyme) => {
    const c = (<CheckboxFilter
      id="test id" title="test title" label="test label"
      searchkit={this.searchkit}
      filter={TermQuery("test-field", "test-value")} />)
    this.wrapper = isEnzyme ? mount(c) : ReactTestRenderer.create(c)

    this.searchkit.setResults({
      hits:{
        hits:[{_id:1, title:1},{_id:2,title:2}],
        total:2
      },
      aggregations: {
        "test id1": {
          doc_count: 50
        }
      }
    })

    this.accessor = this.searchkit.accessors.getAccessors()[0]
  }

  beforeEach(() => {
    Utils.guidCounter = 0

    this.searchkit = SearchkitManager.mock()
    this.searchkit.translateFunction = (key) => {
      return {
        "test option 1": "test option 1 translated"
      }[key]
    }

  });

  it('renders correctly', () => {
    this.createWrapper(false)
    expect(this.wrapper).toMatchSnapshot()
  });

  it('clicks options', () => {
    this.createWrapper(true)
    expect(this.accessor.state.getValue()).toEqual(null)
    let option = this.wrapper.find(".sk-item-list").children().at(0)
    fastClick(option)
    expect(hasClass(option, "is-active")).toBe(true)
    expect(this.accessor.state.getValue()).toEqual(true)
    fastClick(option)
    expect(this.accessor.state.getValue()).toEqual(false) // Back to null ?
  })

  it("should configure accessor correctly", () => {
    this.createWrapper(true)
    expect(this.accessor.key).toBe("test id")
    let options = this.accessor.options

    expect(options).toEqual({
      "id": "test id",
      "title": "test title",
      "label": "test label",
      "translations": undefined,
      "filter": TermQuery("test-field", "test-value")
    })
  })

  it("can disable", () => {
    this.createWrapper(true)
    expect(hasClass(this.wrapper.find(".sk-panel"), "is-disabled")).toBe(false)
    this.searchkit.setResults({
      hits:{ total:0 },
      aggregations: {
        "test id1": {
          doc_count: 50
        }
      }
    })
    expect(hasClass(this.wrapper.find(".sk-panel"), "is-disabled")).toBe(true)

    expect(this.accessor.state.getValue()).toEqual(null)
    let option = this.wrapper.find(".sk-item-list").children().at(0)
    fastClick(option)
    expect(this.accessor.state.getValue()).toEqual(true)

    expect(hasClass(this.wrapper.find(".sk-panel"), "is-disabled")).toBe(false)
  })
});
