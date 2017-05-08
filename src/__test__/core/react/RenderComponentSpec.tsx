import * as React from "react";
import {mount} from "enzyme";
import * as ReactTestRenderer from 'react-test-renderer'

import {
  fastClick, hasClass, jsxToHTML, printPrettyHtml
} from "../../../components/__test__/TestHelpers"

import {Panel} from "../../../components"

import {
  renderComponent,
  RenderComponentType,
  RenderComponentPropType
} from "../../../"


fdescribe("RenderComponent", ()=> {

  beforeEach(()=> {
    this.SubPanel = class SubPanel extends Panel {
    }
    this.SubPanel.defaultProps.title = "SubPanel"
    this.SubPanelElement = <Panel title="PanelElement"/>
    this.PanelReactClass = React.createClass({
      contextTypes:{
        color:React.PropTypes.string
      },
      render(){
        return (<Panel title={"PanelReactClass " + this.context.color} {...this.props}>
          {this.props.children}
        </Panel>)
      }
    })

    this.PanelFunction = (props, context)=> {
      return (
        <Panel title={"PanelFunction " + context.color}>
          {props.children}
        </Panel>
      )
    }
    this.PanelFunction.contextTypes = {
      color:React.PropTypes.string
    }

    class Provider extends React.Component<any, any>{
      static childContextTypes = {
        color: React.PropTypes.string
      }
      getChildContext(){
        return {color:"purple"}
      }
      render(){
        return this.props.children
      }
    }

    this.mount = (component, props={})=> {
      return ReactTestRenderer.create(
        <Provider>
          {renderComponent(
            component, props,
            <p>content..</p>
          )}
        </Provider>
      ).toJSON()
    }

  })

  test("React.Component class", ()=> {
    expect(this.mount(this.SubPanel)).toMatchSnapshot()
  })

  test("React Element", ()=> {
    expect(this.mount(this.SubPanelElement)).toMatchSnapshot()
  })

  test("React Class", ()=> {
    expect(this.mount(this.PanelReactClass)).toMatchSnapshot()
  })

  test("Render function", ()=> {
    expect(this.mount(this.PanelFunction)).toMatchSnapshot()
  })

  // xtest("Invalid component", ()=> {
  //   spyOn(console, "warn")
  //   try{
  //     this.mount(10)
  //     // printPrettyHtml(this.wrapper.html())
  //   } catch (e){
  //
  //   }
  //   expect(console.warn).toHaveBeenCalledWith(
  //     "Invalid component", 10
  //   )
  //
  // })

})
