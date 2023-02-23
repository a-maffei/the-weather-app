import { ChangeEvent } from 'react'
import { optionType } from '../types'

type Props = {
  term: string
  options: []
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onOptionSelect: (option: optionType) => void
  onSubmit: () => void
}

const Search = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props): JSX.Element => {
  return (
    <section className="w-full md:max-w-[600px] px-4 py-10 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-screen bg-white bg-opacity-20 background-blur-lg drop-shadow-lg rounded text-zinc-700">
      <h1 className="text-4xl font-thin">
        Another <span className="font-black">Weather App</span>
      </h1>
      <p className="text-sm mt-4">
        Enter below a place you want to know the weather of and select an option
        fron the dropdown.
      </p>
      <div className="relative first-line:flex mt-10 md:mt-5 ">
        <input
          value={term}
          type="text"
          onChange={onInputChange}
          className="px-2 py-1 rounded-l-md border-2 border-white"
        />
        <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
          {options.map((option: optionType, index: number) => (
            <li key={option.name + '-' + index}>
              <button
                className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white py-1 px-2 cursor-pointer"
                onClick={() => onOptionSelect(option)}
              >
                {option.name}, {option.country}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="rounded-r-md border-2  hover:bg-zinc-700 border-zinc-100 text-zinc-700 px-2 py-1 cursor-pointer hover:border-zinc-700 hover:text-zinc-100"
          onClick={onSubmit}
        >
          Search
        </button>
      </div>
    </section>
  )
}

export default Search
