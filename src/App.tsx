import style from './App.module.css';
import Form from './components/Form/Form';
import useWeather from './hooks/useWeather';

function App() {
  const { fetchWeather } = useWeather();

  return (
    <>
      <h1 className={style.title}>Buscador de Clima</h1>
      <div className={style.container}>
        <div>
          <Form fetchWeather={fetchWeather} />
        </div>
        <div>2</div>
      </div>
    </>
  );
}

export default App;
