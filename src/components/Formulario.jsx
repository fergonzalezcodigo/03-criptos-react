import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import Error from "./Error"
import useSelectMonedas from "../hooks/useSelectMonedas"
import { monedas } from "../data/Monedas"

const InputSubmit = styled.input`
  background-color: #9497FF;
  border-radius: 5px;
  border: none;
  color: #FFF;
  font-size: 20px;
  font-weight: 700;
  padding: 10px;
  text-transform: uppercase;
  width: 100%;
  transition: background-color .3s ease;
  margin-top: 30px;

  &:hover{
    background-color: #7A7DFE;
    cursor: pointer;
  }
`
const Formulario = ({setMonedas}) => {

  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)

  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu criptomoneda', criptos)

  useEffect(() => {
    const consultarApi = async() => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      //console.log(resultado.Data)

      const arrayCriptos = resultado.Data.map(cripto => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        //console.log(objeto)
        return objeto
      })
      setCriptos(arrayCriptos)
    }
    consultarApi();
  },[])

  const handleSubmit = e => {
    e.preventDefault()
    if([moneda, criptomoneda].includes('')){
      setError(true)
      return
    }
    setError(false)
    setMonedas({
      moneda,
      criptomoneda
    })
  }
  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form
        onSubmit={handleSubmit}
      >
        <SelectMonedas/>
        <SelectCriptomoneda/>

        <InputSubmit type="submit" value="Cotizar"></InputSubmit>
      </form>
    </>
  )
}

export default Formulario