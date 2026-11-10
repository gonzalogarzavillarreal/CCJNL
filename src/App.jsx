import { Route, Routes } from 'react-router-dom'
import Encabezado from './components/Encabezado.jsx'
import Pie from './components/Pie.jsx'
import SubirAlNavegar from './components/SubirAlNavegar.jsx'
import RutaProtegida from './components/RutaProtegida.jsx'
import Inicio from './pages/Inicio.jsx'
import Ingresar from './pages/Ingresar.jsx'
import Registro from './pages/Registro.jsx'
import PanelAfiliadas from './pages/PanelAfiliadas.jsx'
import NoEncontrada from './pages/NoEncontrada.jsx'

export default function App() {
  return (
    <>
      <SubirAlNavegar />
      <a className="saltar" href="#contenido">
        Saltar al contenido
      </a>
      <Encabezado />
      <main id="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/afiliadas/ingresar" element={<Ingresar />} />
          <Route path="/afiliadas/registro" element={<Registro />} />
          <Route
            path="/afiliadas"
            element={
              <RutaProtegida>
                <PanelAfiliadas />
              </RutaProtegida>
            }
          />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Pie />
    </>
  )
}
