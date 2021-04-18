import React from 'react'
import createPersistedReducer from 'use-persisted-reducer'

export default function SideLampHouoh() {
  const KEY1 = 'sidelamp1'
  const KEY2 = 'sidelanp2'
  const KEY3 = 'sidelamp3'
  const KEY4 = 'sidelanp4'
  const KEY5 = 'sidelamp5'
  const usePersistedReducer1 = createPersistedReducer(KEY1)
  const usePersistedReducer2 = createPersistedReducer(KEY2)
  const usePersistedReducer3 = createPersistedReducer(KEY3)
  const usePersistedReducer4 = createPersistedReducer(KEY4)
  const usePersistedReducer5 = createPersistedReducer(KEY5)

  const initialState1 = { flag1: 0 }
  const [count1, dispatchBlue] = usePersistedReducer1((state, action) => {
    return { flag1: state['flag1'] + action }
  }, initialState1)

  const initialState2 = { flag2: 0 }
  const [count2, dispatchYellow] = usePersistedReducer2((state, action) => {
    return { flag2: state['flag2'] + action }
  }, initialState2)

  const initialState3 = { flag3: 0 }
  const [count3, dispatchGreen] = usePersistedReducer3((state, action) => {
    return { flag3: state['flag3'] + action }
  }, initialState3)

  const initialState4 = { flag4: 0 }
  const [count4, dispatchRed] = usePersistedReducer4((state, action) => {
    return { flag4: state['flag4'] + action }
  }, initialState4)

  const initialState5 = { flag5: 0 }
  const [count5, dispatchRainbow] = usePersistedReducer5((state, action) => {
    return { flag5: state['flag5'] + action }
  }, initialState5)

  const allReset = () => {
    localStorage.removeItem(KEY1)
    localStorage.removeItem(KEY2)
    localStorage.removeItem(KEY3)
    localStorage.removeItem(KEY4)
    localStorage.removeItem(KEY5)
  }

  return (
    <>
      <div className="flex mt-8">
        <div className="flex-grow"></div>
        <input
          type="button"
          className="inline bg-dclPurple text-xl m-2 px-1"
          onClick={() => dispatchBlue(-1)}
          value=" ➖  "
        />
        <div className="inline m-2 p-2 text-2xl">{count1['flag1']}</div>
        <input
          type="button"
          className="inline bg-dclOrange text-xl m-2 px-1"
          onClick={() => dispatchBlue(1)}
          value=" 左＋ "
        />
        <div className="flex-grow"></div>
      </div>
      {/* another flag */}
      <div className="flex mt-8">
        <div className="flex-grow"></div>
        <input
          type="button"
          className="inline bg-dclPurple text-xl m-2 px-1"
          onClick={() => dispatchYellow(-1)}
          value=" ➖  "
        />
        <div className="inline m-2 p-2 text-2xl">{count2['flag2']}</div>
        <input
          type="button"
          className="inline bg-dclOrange text-xl m-2 px-1"
          onClick={() => dispatchYellow(1)}
          value=" 右＋ "
        />
        <div className="flex-grow"></div>
      </div>

      <div className="flex mt-8">
        <div className="flex-grow"></div>
        <input
          type="button"
          className="inline bg-dclPurple text-xl m-2 px-1"
          onClick={() => dispatchGreen(-1)}
          value=" ➖  "
        />
        <div className="inline m-2 p-2 text-2xl">{count3['flag3']}</div>
        <input
          type="button"
          className="inline bg-yellow-300 text-xl m-2 px-1"
          onClick={() => dispatchGreen(1)}
          value=" ➕  "
        />
        <div className="flex-grow"></div>
      </div>
      {/* another flag */}
      <div className="flex mt-8">
        <div className="flex-grow"></div>
        <input
          type="button"
          className="inline bg-dclPurple text-xl m-2 px-1"
          onClick={() => dispatchRed(-1)}
          value=" ➖  "
        />
        <div className="inline m-2 p-2 text-2xl">{count4['flag4']}</div>
        <input
          type="button"
          className="inline bg-green-500 text-xl m-2 px-1"
          onClick={() => dispatchRed(1)}
          value=" ➕  "
        />
        <div className="flex-grow"></div>
      </div>

      {/* another flag */}
      <div className="flex mt-8">
        <div className="flex-grow"></div>
        <input
          type="button"
          className="inline bg-dclPurple text-xl m-2 px-1"
          onClick={() => dispatchRainbow(-1)}
          value=" ➖  "
        />
        <div className="inline m-2 p-2 text-2xl">{count5['flag5']}</div>
        <input
          type="button"
          className="inline bg-red-500 text-xl m-2 px-1"
          onClick={() => dispatchRainbow(1)}
          value=" ➕  "
        />
        <div className="flex-grow"></div>
      </div>

      <div className="block mt-2">
        <input
          type="button"
          className="bg-dclOrange p-1"
          onClick={() => {
            dispatchBlue(-count1['flag1'])
            dispatchYellow(-count2['flag2'])
            dispatchGreen(-count3['flag3'])
            dispatchRed(-count4['flag4'])
            dispatchRainbow(-count5['flag5'])
            allReset()
          }}
          value="Reset"
        />
      </div>
    </>
  )
}
