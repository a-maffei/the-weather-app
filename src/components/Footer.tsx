import React from 'react'

type Props = {
  time: number
}

const Footer = ({ time }: Props): JSX.Element => {
  return (
    <div className="w-full py-5">
      <p
        className={`text-center text-sm ${
          19 <= time || time < 5 ? 'text-zinc-100' : 'text-zinc-700'
        }`}
      >
        Developed with React, Typescript, Tailwind CSS and a lot of panettone by{' '}
        <a href="https://github.com/a-maffei" className="underline">
          Alessandra
        </a>{' '}
        (during her bootcamp Winter break).
      </p>
    </div>
  )
}

export default Footer
