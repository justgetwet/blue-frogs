import { prefetchPathname } from 'gatsby'
import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import createPersistedReducer from 'use-persisted-reducer'

// const KEY1 = "counter-key"
// const KEY2 = "start-game"

export default function Counter(props) {
  const { register, handleSubmit, reset } = useForm()
  const onReset = useCallback(() => reset(), [reset])
  const KEY1 = props.count ? props.count : 'count-key'
  const KEY2 = props.start ? props.start : 'start-key'
  const usePersistedReducer = createPersistedReducer(KEY1)
  const [prob, setProb] = useState(0)

  const initialState = { bell: 0 }
  const [count, dispatch] = usePersistedReducer((state, action) => {
    return { bell: state['bell'] + action }
  }, initialState)

  useEffect(() => {
    const games = localStorage.getItem(KEY2)
    document.getElementById('Start').value = games ? games : 0
  }, [])

  const onChangeStart = (value) => {
    localStorage.setItem(KEY2, value)
  }

  const onSubmit = (formData) => {
    if (formData.endGame) {
      setProb((formData.endGame - formData.startGame) / count['bell'])
    }
  }

  const allReset = () => {
    onReset()
    setProb(0)
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
          onClick={() => dispatch(-1)}
          value=" ➖  "
        />
        <div className="inline m-4 p-4 text-2xl">{count['bell']}</div>
        <input
          type="button"
          className="inline bg-dclPink text-4xl m-4 px-2"
          onClick={() => dispatch(1)}
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
              onChange={(e) => onChangeStart(e.target.value)}
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

        <label className="block mb-2">
          <input type="submit" className="bg-dclOrange p-1" value="Calc!" />
        </label>
        <dl>
          <dt>Bell Probability: </dt>
          <dd>{prob === 0 ? 0 : Math.round(prob * 100) / 100}</dd>
        </dl>

        <label className="block mt-2">
          <input
            type="button"
            className="bg-dclOrange p-1"
            onClick={() => {
              dispatch(-count['bell'])
              allReset()
            }}
            value="Reset"
          />
        </label>
      </form>
    </>
  )
}
