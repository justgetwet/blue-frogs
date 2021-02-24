import React, { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'

function Coins(games, bb, rb) {
  const bells = [6.7, 6.6, 6.6, 6.4, 6.3, 6.2]
  const suica = 42.4
  const cherry = 46.5
  const coins = bells.map((bell) =>
    Math.round(
      (games / 7.4) * 3 +
        (games / bell) * 8 +
        (games / suica) * 4 +
        (games / cherry ) * 2 +
        260 * bb +
        91 * rb -
        games * 3
    )
  )
  return coins
}

export default function SeaCoins() {
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
