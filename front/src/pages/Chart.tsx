import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Pie } from '@ant-design/plots'



export const Chart: React.FC = () => {

  const [data, setData] = useState<{ type: string, value: any }[]>()

  useEffect(() => {

    axios.get("http://localhost:8080/data")
      .then((res) => {
        const final = res.data.map((each: any) => each.address?.city)
        const counter = final.reduce((acc: any, curr: any) => {
          if (curr in acc) {
            acc[curr]++;
          } else {
            acc[curr] = 1;
          }
          return acc
        }, {})

        var final2: { type: string; value: any }[] = []
        Array(counter).map((each: any) => {
          var foo = Object.keys(each)
          foo.map((item) => {
            var fi = { type: item, value: each[item] }
            final2.push(fi)
          })
        })
        setData(final2)
      })
  }, [])


  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      type: 'inner',
      offset: '-40%',
      content: ({ percent }: { percent: any }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  if (data) {
    return (
      <>
        <Pie {...config} />
      </>
    )
  }
  else {
    return (
      <>
        loading...
      </>
    )
  }
}
