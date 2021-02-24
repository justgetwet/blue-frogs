import React, { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'

function Calc(games, bb, rb, bbpay, rbpay, base) {
  return Math.round(bbpay * bb + rbpay * rb - (50 / base) * games)
}

export default function Coins(props) {
  const { register, handleSubmit, watch, reset, errors } = useForm()
  const [gamesCount, setGamesCount] = useState(0)
  const [bbCount, setBBCount] = useState(0)
  const [rbCount, setRBCount] = useState(0)
  const onReset = useCallback(() => reset(), [reset])
  
  const bbpay = props.bbpayout ? parseInt(props.bbpayout) : 360
  const rbpay = props.rbpayout ? parseInt(props.rbpayout) : 90
  const base = props.base ? parseInt(props.base) : 36

  const allClear = () => {
    onReset()
    setGamesCount(0)
    setBBCount(0)
    setRBCount(0)
  }

  const onSubmit = (formData) => {
    console.log(watch)
    console.log(formData)
    if (formData.games) {
      setGamesCount(parseInt(formData.games))
      setBBCount(parseInt(formData.bb))
      setRBCount(parseInt(formData.rb))
    }
  }

  return (
    <>
      <form
        className="grid grid-cols-1 gap-1 m-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <dl>
          <dt>Total Games: </dt>
          <dd>
            <input
              name="games"
              type="number"
              autoComplete="off"
              className="bg-dclPurple text-dclRed font-bold"
              ref={register}
            />
          </dd>
        </dl>
        <dl>
          <dt>Big Bonus: </dt>
          <dd>
            <input
              name="bb"
              type="number"
              autoComplete="off"
              className="bg-dclPurple text-dclRed font-bold"
              ref={register}
            />
          </dd>
        </dl>
        <dl>
          <dt>Reg Bonus: </dt>
          <dd>
            <input
              name="rb"
              type="number"
              autoComplete="off"
              className="bg-dclPurple text-dclRed font-bold"
              ref={register}
            />
          </dd>
        </dl>
        <label className="block">
          <input type="submit" className="bg-dclOrange p-1" value="Calc!" />
        </label>
        <dl>
          <dt>Big Probability: </dt>
          <dd>
            {bbCount === 0
              ? Math.round(gamesCount)
              : Math.round((gamesCount / bbCount) * 10) / 10}
          </dd>
        </dl>
        <dl>
          <dt>Reg Probability: </dt>
          <dd>
            {rbCount === 0
              ? Math.round(gamesCount)
              : Math.round((gamesCount / rbCount) * 10) / 10}
          </dd>
        </dl>
        <dl>
          <dt>Setting 1 Coins: </dt>
          <dd>
            {gamesCount &&
              Calc(gamesCount, bbCount, rbCount, bbpay, rbpay, base)}
          </dd>
        </dl>
        <label className="block">
          <input
            type="button"
            className="bg-dclOrange p-1"
            onClick={allClear}
            value="Reset"
          />
        </label>
      </form>
    </>
  )
}
