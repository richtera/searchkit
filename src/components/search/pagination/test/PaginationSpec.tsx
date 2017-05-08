import * as React from "react";
import {mount} from "enzyme";
import {Pagination, PaginationSelect} from "../src/Pagination";
import {SearchkitManager, ImmutableQuery} from "../../../../core";
import {Select} from "../../../ui";
import * as ReactTestRenderer from 'react-test-renderer'
import {
  fastClick, hasClass, jsxToHTML, printPrettyHtml
} from "../../../__test__/TestHelpers"
import * as sinon from "sinon";

describe("Pagination tests", () => {

  beforeEach(() => {

    this.searchkit = SearchkitManager.mock()
    this.searchkit.addDefaultQuery((query)=> {
      return query.setSize(10)
    })

    this.createEnzymeWrapper = (showNumbers=true, pageScope=3, props={}) => {
      this.wrapper = mount(
        <Pagination searchkit={this.searchkit}
                    showNumbers={showNumbers}
                    pageScope={pageScope}
                    {...props}
                    translations={{ "pagination.previous": "Previous Page" }} />
      );
      this.accessor = this.searchkit.accessors.statefulAccessors["p"]
    }

    this.createWrapper = ({page=null, withPages=true, pageScope=3, props={} }={}) => {

      const c = (<Pagination
                  searchkit={this.searchkit}
                  showNumbers={withPages}
                  pageScope={pageScope}
                  {...props}
                  translations={{ "pagination.previous": "Previous Page" }} />
                )

      if (page) {
        this.wrapper = ReactTestRenderer.create(c)
        this.accessor = this.searchkit.accessors.statefulAccessors["p"]
        this.accessor.state = this.accessor.state.setValue(page)
      } else {
        this.accessor = this.searchkit.accessors.statefulAccessors["p"]
      }
      this.wrapper = ReactTestRenderer.create(c)
    }

    this.searchkit.query = new ImmutableQuery().setSize(10)


    this.searchkit.setResults({
      hits:{
        total:80
      }
    })


  });

  describe("rendering", () => {

    it("renders text", () => {
      this.createWrapper({})
      expect(this.wrapper).toMatchSnapshot()
    })

    it("renders without pages", () => {
      this.createWrapper({ withPages: false })
      expect(this.wrapper).toMatchSnapshot()
    })

    it('renders first page options', () => {
      this.createWrapper({})
      expect(this.wrapper).toMatchSnapshot()
    })

    it('renders second page options', () => {
      this.createWrapper({ page: 2 })
      expect(this.wrapper).toMatchSnapshot()
    })

    it('renders eighth page options', () => {
      this.createWrapper({ page: 8 })
      expect(this.wrapper).toMatchSnapshot()
    })

    it("handles showNumbers prop", () => {
      this.createWrapper({ withPages: false })
      expect(this.wrapper).toMatchSnapshot()
    })

    it("handles pageScope prop", () => {
      this.createWrapper({ withPages: true, pageScope: 1 })
      expect(this.wrapper).toMatchSnapshot()
    })

    it("renders no pagination on no results", () => {
      this.searchkit.setResults({hits:{total:0}})
      this.createWrapper({})
      expect(this.wrapper).toMatchSnapshot()
    })

    it("both disabled on only one total page", () => {
      this.searchkit.setResults({ hits: { total: 10 } })
      this.createWrapper()
      expect(this.wrapper).toMatchSnapshot()
    })

  });

  describe("interacting", () => {

    it("interact prev disabled", () => {
      this.createEnzymeWrapper()
      this.accessor.state = this.accessor.state.setValue(1)

      fastClick(this.wrapper.find(".sk-toggle__item").first())
      expect(this.accessor.state.getValue()).toBe(1)
    });

    it("click previous, next", ()=> {
      this.createEnzymeWrapper()
      this.accessor.state = this.accessor.state.setValue(3)
      this.wrapper.update()
      fastClick(this.wrapper.find(".sk-toggle__item").first())
      expect(this.accessor.state.getValue()).toBe(2)
      fastClick(this.wrapper.find(".sk-toggle__item").last())
      fastClick(this.wrapper.find(".sk-toggle__item").last())
      expect(this.accessor.state.getValue()).toBe(4)
    })

    it("ability to click last page", ()=> {
      this.createEnzymeWrapper()
      this.accessor.state = this.accessor.state.setValue(7)
      this.wrapper.update()
      fastClick(this.wrapper.find(".sk-toggle__item").last())
      expect(this.accessor.state.getValue()).toBe(8)
      fastClick(this.wrapper.find(".sk-toggle__item").last())
      expect(this.accessor.state.getValue()).toBe(8)
    })

    it("dividers should not alter state", ()=> {
      this.createEnzymeWrapper()
      this.accessor.state = this.accessor.state.setValue(2)
      this.wrapper.update()
      fastClick(this.wrapper.find("[data-key='ellipsis-6']"))
      //this was NaN before bug fix
      expect(this.accessor.state.getValue()).toBe(2)
    })

  })

  it("PaginationSelect", () => {
    this.wrapper = ReactTestRenderer.create(
      <PaginationSelect searchkit={this.searchkit} />
    )
    expect(this.wrapper).toMatchSnapshot()
  })

});
