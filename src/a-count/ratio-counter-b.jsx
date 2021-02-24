import React, { useState } from 'react'
import createPersistedReducer from 'use-persisted-reducer'

export default function Rcounterb(props) {
  const KEY1 = props.count1 || 'w-count-key1'
  const KEY2 = props.count2 || 'w-count-key2'
  const [ratio, setRatio] = useState(0)
  const usePersistedReducer1 = createPersistedReducer(KEY1)
  const usePersistedReducer2 = createPersistedReducer(KEY2)

  const initialState1 = { flag1: 0 }
  const [count1, dispatch1] = usePersistedReducer1((state, action) => {
    return { flag1: state['flag1'] + action }
  }, initialState1)

  const initialState2 = { flag2: 0 }
  const [count2, dispatch2] = usePersistedReducer2((state, action) => {
    return { flag2: state['flag2'] + action }
  }, initialState2)

  const onCalc = () => {
    setRatio(count1['flag1'] / count2['flag2'])
  }

  const onReset = () => {
    setRatio(0)
    localStorage.removeItem(KEY1)
    localStorage.removeItem(KEY2)
  }

  return (
    <>
      <div className="flex mt-8">
        <div className="flex-grow"></div>
        <input
          type="button"
          className="inline bg-dclPurple text-4xl m-4 px-2"
          onClick={() => dispatch1(-1)}
          value=" ➖  "
        />
        <div className="inline m-4 p-4 text-2xl">{count1['flag1']}</div>
        <input
          type="button"
          className="inline bg-dclRed text-4xl m-4 px-2"
          onClick={() => dispatch1(1)}
          value=" ➕  "
        />
        <div className="flex-grow"></div>
      </div>
      <div className="flex mt-8">
        <div className="flex-grow"></div>
        <input
          type="button"
          className="inline bg-dclPurple text-4xl m-4 px-2"
          onClick={() => dispatch2(-1)}
          value=" ➖  "
        />
        <div className="inline m-4 p-4 text-2xl">{count2['flag2']}</div>
        <input
          type="button"
          className="inline bg-dclPink text-4xl m-4 px-2"
          onClick={() => dispatch2(1)}
          value=" ➕  "
        />
        <div className="flex-grow"></div>
      </div>
      <div className="block mb-2">
        <input
          type="button"
          className="bg-dclOrange p-1"
          onClick={() => onCalc()}
          value="Calc!"
        />
      </div>
      <form>
        <dl>
          <dt>flag Ratio: </dt>
          <dd>{ratio ? Math.round(ratio * 100) / 100 : 0}</dd>
        </dl>
      </form>
      <div className="block mt-2">
        <input
          type="button"
          className="bg-dclOrange p-1"
          onClick={() => {
            dispatch1(-count1['flag1'])
            dispatch2(-count2['flag2'])
            onReset()
          }}
          value="Reset"
        />
      </div>
    </>
  )
}