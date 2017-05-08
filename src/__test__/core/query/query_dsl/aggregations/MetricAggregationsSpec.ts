import {
  MinMetric, CardinalityMetric, TopHitsMetric,
  GeoBoundsMetric, MaxMetric, AvgMetric, SumMetric
} from "../../../../../"

describe("MetricAggregations", ()=> {

  beforeEach(()=> {
    this.testFieldMetric = (Metric, op)=>{
      let aggs = Metric("key", "field")
      expect(aggs).toEqual({
        key:{
          [op]:{field:"field"}
        }
      })
    }
  })

  test("CardinalityMetric", ()=> {
    this.testFieldMetric( CardinalityMetric, "cardinality" )
  })

  test("MinMetric", ()=> {
    this.testFieldMetric( MinMetric, "min" )
  })

  test("MaxMetric", ()=> {
    this.testFieldMetric( MaxMetric, "max" )
  })

  test("AvgMetric", ()=> {
    this.testFieldMetric( AvgMetric, "avg" )
  })

  test("SumMetric", ()=> {
    this.testFieldMetric( SumMetric, "sum" )
  })

  test("TopHitsMetric", ()=> {
    expect(TopHitsMetric("sometophits", {
      size:1, _source:false
    })).toEqual({
      sometophits:{
        top_hits:{
          size:1, _source:false
        }
      }
    })

  })

  test("GeoBoundsMetric", ()=> {
    expect(GeoBoundsMetric("bounds", "location"))
      .toEqual({
        bounds:{
          geo_bounds:{
            field:"location"
          }
        }
      })
    expect(GeoBoundsMetric(
      "bounds", "location",
      {wrap_longitude:true}
    )).toEqual({
      bounds:{
        geo_bounds:{
          field:"location",
          wrap_longitude:true
        }
      }
    })
  })


})
