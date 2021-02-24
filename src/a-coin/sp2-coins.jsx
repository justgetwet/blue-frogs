import React, { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'

function Coins(games, bb, rb) {
  const bells = [6.01, 5.91, 5.83, 5.79, 5.74, 5.61]
  const coins = bells.map((bell) =>
    Math.round(
      (games / 7.3) * 3 + (games / bell) * 7 + 312 * bb + 104 * rb - games * 3
    )
  )
  return coins
}

export default function Sp2Coins() {
  const { register, handleSubmit, watch, reset, errors } = useForm()
  const [gamesCount, setGamesCount] = useState(0)
  const [bbCount, setBBCount] = useState(0)
  const [rbCount, setRBCount] = useState(0)
  const onReset = useCallback(() => reset(), [reset])

  const allClear = () => {
    onReset()
    setGamesCount(0)
    setBBCount(0)
    setRBCount(0)
  }
  const onSubmit = (data) => {
    console.log(data)
    if (data.games) {
      setGamesCount(parseInt(data.games))
      setBBCount(parseInt(data.bb))
      setRBCount(parseInt(data.rb))
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
              defaultValue="0"
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
              defaultValue="0"
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
              defaultValue="0"
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
          <dt>Total Probability: </dt>
          <dd>
            {bbCount + rbCount === 0
              ? Math.round(gamesCount)
              : Math.round((gamesCount / (bbCount + rbCount)) * 10) / 10}
          </dd>
        </dl>
        <dl>
          {gamesCount === 0
            ? ''
            : Coins(gamesCount, bbCount, rbCount).map((coins, key) => {
                return (
                  <div key={key}>
                    <dt>Setting {key + 1} : </dt>
                    <dd>{coins}</dd>
                  </div>
                )
              })}
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
