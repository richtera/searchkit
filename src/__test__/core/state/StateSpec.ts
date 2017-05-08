import {State} from "../../../";

describe("State", ()=> {
  beforeEach(()=> {
    class ExampleState extends State<number>{

    }
    this.state = new ExampleState(1)
  })

  afterEach(()=> {
    //test immutability
    expect(this.state.value).toEqual(1)
  })

  test("getValue()", ()=> {
    expect(this.state.getValue()).toEqual(1)
  })

  test("create()", ()=> {
    expect(this.state.value).toEqual(1)
    expect(this.state.create(2).value).toEqual(2)
  })

  test("setValue()", ()=> {
    expect(this.state.setValue(2).value).toEqual(2)
  })

  test("hasValue()", ()=> {
    expect(this.state.hasValue()).toBe(true)
    let state = this.state.clear()
    expect(state.hasValue()).toBe(false)
  })

  test("clear()", ()=> {
    expect(this.state.clear().value).toEqual(null)
  })
})
