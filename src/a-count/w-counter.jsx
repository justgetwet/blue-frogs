import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import createPersistedReducer from 'use-persisted-reducer'

export default function Wcounter(props) {
  const { register, handleSubmit, reset } = useForm()
  const onReset = useCallback(() => reset(), [reset])
  const KEY0 = props.start || 'w-start-key'
  const KEY1 = props.count1 || 'w-count-key1'
  const KEY2 = props.count2 || 'w-count-key2'
  const [prob1, setProb1] = useState(0)
  const [prob2, setProb2] = useState(0)
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

  useEffect(() => {
    const games = localStorage.getItem(KEY0)
    document.getElementById('Start').value = games ? games : 0
  }, [])

  const onChangeStartGame = (startGame) => {
    localStorage.setItem(KEY0, startGame)
  }

  const onSubmit = (formData) => {
    if (formData.endGame) {
      const playGames = formData.endGame - formData.startGame
      setProb1( playGames / count1['flag1'])
      setProb2( playGames / count2['flag2'])
    }
  }

  const allReset = () => {
    onReset()
    setProb1(0)
    setProb2(0)
    localStorage.removeItem(KEY0)
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
          className="inline bg-dclPink text-4xl m-4 px-2"
          onClick={() => dispatch1(1)}
          value=" ➕  "
        />
        <div className="flex-grow"></div>
      </div>
      <form className="block m-4" onSubmit={handleSubmit(onSubmit)}>
        <dl>
          <dt>Start: </dt>
          <dd>
            <input
              id="Start"
              name="startGame"
              type="number"
              onChange={(e) => onChangeStartGame(e.target.value)}
              className="inline bg-dclPurple text-dclRed"
              ref={register}
            />
          </dd>
        </dl>
        <dl>
          <dt>Check: </dt>
          <dd>
            <input
              name="endGame"
              type="number"
              className="inline bg-dclPurple text-dclRed"
              ref={register}
            />
          </dd>
        </dl>
        {/* another flag */}
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
            className="inline bg-dclOrange text-4xl m-4 px-2"
            onClick={() => dispatch2(1)}
            value=" ➕  "
          />
          <div className="flex-grow"></div>
        </div>

        <label className="block mb-2">
          <input type="submit" className="bg-dclOrange p-1" value="Calc!" />
        </label>
        <dl>
          <dt>flag 1 Probability: </dt>
          <dd>{prob1 === 0 ? 0 : Math.round(prob1 * 100) / 100}</dd>
        </dl>
        <dl>
          <dt>flag 2 Probability: </dt>
          <dd>{prob2 === 0 ? 0 : Math.round(prob2 * 100) / 100}</dd>
        </dl>


        <label className="block mt-2">
          <input
            type="button"
            className="bg-dclOrange p-1"
            onClick={() => {
              dispatch1(-count1['flag1'])
              dispatch2(-count2['flag2'])
              allReset()
            }}
            value="Reset"
          />
        </label>
      </form>
    </>
  )
}

