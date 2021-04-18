// import { prefetchPathname } from 'gatsby'
import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import createPersistedReducer from 'use-persisted-reducer'

export default function Counter(props) {
  const { register, handleSubmit, reset } = useForm()
  const onReset = useCallback(() => reset(), [reset])
  const KEY1 = props.count || 'count-key'
  const KEY2 = props.start || 'start-key'
  const KEY3 = props.prob || 'prob-key'
  const usePersistedReducer = createPersistedReducer(KEY1)
  const [prob, setProb] = useState(0)

  const initialState = { game: 0 }
  const [count, dispatch] = usePersistedReducer((state, action) => {
    return { game: state['game'] + action }
  }, initialState)

  useEffect(() => {
    const startgame = localStorage.getItem(KEY2)
    document.getElementById('startgame').value = startgame || 0
  }, [])

  const onChangeStart = (value) => {
    localStorage.setItem(KEY2, value)
  }

  const onSubmit = (formData) => {
    if (formData.check) {
      const p = (formData.check - formData.start) / count['game']
      setProb(p)
      localStorage.setItem(KEY3, Math.round(p * 10) / 10)
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
      <div className="text-xl mt-8 text-dclPink">
        count data
      </div>
      <hr className="w-24 my-2 h-px border-0 bg-dclPurple"/>
      <div className="flex mt-8">
        <div className="flex-grow"></div>
        <input
          id="plusbutton"
          type="button"
          className="inline bg-dclPurple text-4xl m-4 px-2"
          onClick={() => dispatch(-1)}
          value=" ➖  "
        />
        <div className="inline m-4 p-4 text-2xl">{count['game'] || 0}</div>
        <input
          id="minusbutton"
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
              id="startgame"
              name="start"
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
              id="checkgame"
              name="check"
              type="number"
              className="inline bg-dclPurple text-dclRed"
              ref={register}
            />
          </dd>
        </dl>

        <label className="block mb-2">
          <input
            type="submit"
            className="bg-dclOrange px-2 py-1"
            value="Calc"
          />
        </label>
        <dl>
          <dt>Probability: </dt>
          <dd>{prob === 0 ? 0 : Math.round(prob * 10) / 10}</dd>
        </dl>

        <label className="block mt-2">
          <input
            type="button"
            className="bg-dclOrange p-1"
            onClick={() => {
              dispatch(-count['game'])
              allReset()
            }}
            value="Reset"
          />
        </label>
      </form>
    </>
  )
}
