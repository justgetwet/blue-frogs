import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import 'whatwg-fetch'

export default function Postgs(props) {
  const { register, handleSubmit, reset } = useForm()
  const onReset = useCallback(() => reset(), [reset])
  const [check, setCheck] = useState(false)
  const KEY1 = 'hall'
  const KEY2 = 'no'
  const KEY3 = 'machine'
  const KEY4 = props.prob || 'prob-key'
  const KEY5 = 'comment'

  const postData = () => {
    const hall = localStorage.getItem(KEY1)
    const no = localStorage.getItem(KEY2)
    const machine = localStorage.getItem(KEY3)
    const value = localStorage.getItem(KEY4)
    const comment = localStorage.getItem(KEY5)
    return [hall, no, machine, value, comment]
  }

  const cols = ['Hall', 'No', 'Machine', 'Value', 'Comment']

  const onSubmit = (formData) => {
    localStorage.setItem(KEY1, formData.hall)
    localStorage.setItem(KEY2, formData.no)
    localStorage.setItem(KEY3, formData.machine)
    localStorage.setItem(KEY5, formData.comment)
    // console.log(KEY4)
    setCheck(true)
  }

  const allReset = () => {
    onReset()
    localStorage.removeItem(KEY1)
    localStorage.removeItem(KEY2)
    localStorage.removeItem(KEY3)
    localStorage.removeItem(KEY5)
  }

  // const mysheet = 'https://script.google.com/macros/s/AKfycbxw2ZAu5qNbObJm1YOk6Nh7kZo6TJ66F1RkJZMjLTm_5H-IpQ/exec'

  const onPost = () => {
    console.log('posted')
    const mysheet = localStorage.getItem('GsUrl') || ''
    console.log(mysheet)
    setCheck(false)
    const items = postData()
    fetch(mysheet, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hall: items[0],
        no: items[1],
        machine: items[2],
        value: items[3],
        comment: items[4],
      }),
    })
  }

  const onChangeUrl = (value) => {
    localStorage.setItem('GsUrl', value)
  }

  return (
    <>
      <div className="text-xl mt-8 text-dclPink">
        post data for google sheet
      </div>
      <hr className="w-24 my-2 h-px border-0 bg-dclPurple"/>
      <form className="block m-4" onSubmit={handleSubmit(onSubmit)}>
        <dl>
          <dt>Hall: </dt>
          <dd>
            <input
              id="item1"
              name="hall"
              type="string"
              className="inline bg-dclPurple text-dclRed"
              ref={register}
            />
          </dd>
        </dl>
        <dl>
          <dt>No: </dt>
          <dd>
            <input
              id="item2"
              name="no"
              type="number"
              className="inline bg-dclPurple text-dclRed"
              ref={register}
            />
          </dd>
        </dl>
        <dl>
          <dt>Machine: </dt>
          <dd>
            <input
              id="item3"
              name="machine"
              type="string"
              className="inline bg-dclPurple text-dclRed"
              ref={register}
            />
          </dd>
        </dl>
        <dl>
          <dt>Comment: </dt>
          <dd>
            <input
              id="item4"
              name="comment"
              type="string"
              className="inline bg-dclPurple text-dclRed"
              ref={register}
            />
          </dd>
        </dl>
        <label className="block mt-8">
          <input
            type="submit"
            className="bg-dclOrange px-3 py-1"
            value="Set"
          />
        </label>
        <dl className="mt-4">
          {check === false
            ? 'Set input data:'
            : postData().map((value, key) => {
                return (
                  <div key={key}>
                    <dt>{`${cols[key]}` + ` :`}</dt>
                    <dd>{value || '?'}</dd>
                  </div>
                )
              })}
        </dl>

        <label className="block mt-4 mb-8">
          <input
            type="button"
            className="bg-dclOrange px-2 py-1"
            onClick={() => {
              onPost()
            }}
            value="Post"
          />
        </label>
        <label className="block my-8">
          <input
            type="button"
            className="bg-dclOrange p-1"
            onClick={() => {
              allReset()
            }}
            value="Reset"
          />
        </label>

        <dl>
          <dt>Google sheet: </dt>
          <dd>
            <input
              id="item5"
              name="url"
              type="string"
              onChange={(e) => onChangeUrl(e.target.value)}
              className="inline bg-dclPink text-dclRed"
              ref={register}
            />
          </dd>
        </dl>
        <div>{localStorage.getItem('GsUrl') || '?'}</div>
      </form>
    </>
  )
}
