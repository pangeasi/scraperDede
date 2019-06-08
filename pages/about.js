import { Component } from 'react'
import { Layout } from '../components/layout';

const isDevelopment = process.env.NODE_ENV === 'development'
const protocol = isDevelopment ? 'http' : 'https'
const host = isDevelopment ? 'localhost' : 'scraperdede.now.sh'
const port = isDevelopment ? ':4000' : ''

class AboutPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      message: ''
    }
  }

  send = () => {
    const { message } = this.state
    message !== '' 
    &&
    fetch(`${protocol}://${host}${port}/msg4admin/?msg=${message}`)
      .then(data => data.json())
      .then(() => {
        this.setState({message: ''})
      })
  }
  render() {
    return (
      <Layout title={'About'}>
        <div className="container">
          <div>Esta aplicación esta en desarrollo, por favor si encuentras algun error comunicamelo.</div>
          <div>
            <textarea value={this.state.message} rows={5} onChange={(e) => this.setState({message: e.target.value})}></textarea>
            <button onClick={() => this.send()}>enviar</button>
          </div>
          <div>
            <h3><i>Novedades:</i></h3>
            <ul>
              <li>Estilos mejorados responsive para mobile, tablet, desktop</li>
              <li>Añadida la calidad de sonido</li>
              <li>Añadida la calidad de video</li>
              <li>Mejora de estilos</li>
              <li>Añadido el idiomas y servidores</li>
              <li>Se añadio un sombreado cuando marcas la temporada o el capítulo, para saber por cual vas</li>
              <li>Tanto series como películas pueden encontrarse en esta aplicación, ⚠️ puede ser que haya algunos errores</li>
            </ul>
          </div>
        </div>
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
          } 
          textarea {
            width: 100%
          }
        `}</style>
      </Layout>
    )
  }
}

export default AboutPage
