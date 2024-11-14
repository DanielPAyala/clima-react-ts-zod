import style from './App.module.css';
import Form from './components/Form/Form';

function App() {
  return (
    <>
      <h1 className={style.title}>Buscador de Clima</h1>
      <div className={style.container}>
        <div>
          <Form />
        </div>
        <div>2</div>
      </div>
    </>
  );
}

export default App;
