import Forecast from './components/Forecast'
import Search from './components/Search'
import useForecast from './hooks/useForecast'
import Footer from './components/Footer'
import { Spinner } from './components/Spinner'

const App = (): JSX.Element => {
  const {
    setForecast,
    setTerm,
    loading,
    forecast,
    options,
    term,
    onOptionSelect,
    onSubmit,
    onInputChange,
  } = useForecast()

  const date = new Date()
  const currentTime = date.getHours()

  const resetForecast = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setForecast(null)
    setTerm('')
    console.log(forecast)
  }

  return (
    <div
      className={`bg-gradient-to-br h-auto w-full ${
        19 <= currentTime || currentTime <= 5
          ? 'from-indigo-900 via-blue-300 to-blue-900'
          : 'from-sky-400 via-rose-400 to-lime-400'
      } 
    `}
    >
      <main
        className={`flex box-border justify-center items-center
      } 
      `}
      >
        {forecast ? (
          <Forecast data={forecast} resetForecast={resetForecast} />
        ) : loading ? (
          <Spinner />
        ) : (
          <Search
            term={term}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          />
        )}
      </main>
      <Footer time={currentTime} />
    </div>
  )
}

export default App
