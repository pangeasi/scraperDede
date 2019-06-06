import { Layout } from "../components/layout";
import { Component } from 'react';
import { Spinner } from '../components/Icons/spinner';
import { Row, Col } from "antd";

const isDevelopment = process.env.NODE_ENV === 'development'
const protocol = isDevelopment ? 'http' : 'https'
const host = isDevelopment ? 'localhost' : 'scraperdede.now.sh'
const port = isDevelopment ? ':4000' : ''
const DELAY_KEY = 3000


export default class IndexPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      media: [],
      statusDelay: true,
      delay: null,
      opened: null,
      seasonSelected: null,
      episodeSelected: null
    }
  }

  languageFlag = (lang) => {
    switch (`${lang}`.toLowerCase()) {
      case 'castellano':
        return 'spain'
      case 'ingles':
        return 'english'
      case 'latino':
        return 'latino'
      default:
        return 'otro'
    }
  }

  loadSeasonList = () => {
    const { media, opened, seasonSelected } = this.state
    return (
      <div>
        <div className="seasons">
          {media[opened].serie.seasons.map((x, index) =>
            <button style={{ background: seasonSelected === index ? 'yellow' : null }} onClick={() => this.fetchEpisode(opened, index)} key={index}>{x.season_number}</button>)}
        </div>
      </div>
    )
  }

  loadEpisodeList = () => {
    const { media, opened, seasonSelected, episodeSelected } = this.state
    return (
      <div>
        {media[opened].serie.seasons[seasonSelected].epi.episodes.map((x, index) =>
          <button style={{ background: episodeSelected === x.episode_number ? 'yellow' : null }} onClick={() => this.fetchingLinks(opened, seasonSelected, x.episode_number)} key={index}>{x.episode_number}</button>)}
      </div>
    )
  }

  loadDetails = async (i) => {
    let { media } = this.state
    let search = media[i].id
    let type = media[i].media_type === 'tv' ? 1 : 0

    this.setState({
      media,
      opened: i,
      overview: <div>{media[i].overview}</div>,
    })

    if (type !== 1 && !media[i].links) this.fetchingLinks(i)
    if (type) {
      if (!media[i].serie) {
        await fetch(`${protocol}://${host}${port}/search-seasons/?term=${search}`)
          .then(data => data.json())
          .then(d => {
            media[i].serie = d
          })
      }
    }
    this.setState({
      media
    })
  }

  fetchEpisode = async (i, season) => {
    const { media } = this.state
    let id = media[i].id
    this.setState({ seasonSelected: season, episodes: false })

    if (!media[i].serie.seasons[season].epi) {
      await fetch(`${protocol}://${host}${port}/search-episodes/?id=${id}&s=${season}`)
        .then(data => data.json())
        .then(d => {
          media[i].serie.seasons[season].epi = d
        })
    }
    await this.setState({
      media,
      episodes: true
    })
  }

  fetchingLinks = async (el, season, episode) => {
    const { media } = this.state
    let search = media[el].id
    let type = media[el].media_type === 'tv' ? 1 : 0
    season && episode && this.setState({ episodeSelected: episode })
    media[el].links = []
    const tvURL = season && episode ? `&s=${season}&e=${episode}` : ''
    await fetch(`${protocol}://${host}${port}/adede/?term=${search}&is=${type}${tvURL}`)
      .then(data => data.json())
      .then(d => { media[el].links = media[el].links.concat(d) })
    await fetch(`${protocol}://${host}${port}/search-api/?id=${search}`)
      .then(data => data.json())
      .then(d => { media[el].links = media[el].links.concat(d) })

    this.setState({
      media
    })
  }

  handleInputSeach = (value) => {
    if (value.length > 2 && this.state.statusDelay) {
      this.setState({
        noResults: false,
        statusDelay: !this.state.statusDelay,
        delay: setTimeout(() => {
          this.setState({ statusDelay: !this.state.statusDelay })
          if (this.state.inputSearch !== '') {
            fetch(`${protocol}://${host}${port}/search/?term=${this.state.inputSearch}`)
              .then(data => data.json())
              .then(d => {
                this.setState({
                  media: d.results ? d.results : [],
                  noResults: d.results.length < 1
                })
              })
          }
        }, DELAY_KEY)
      })
    } else {
      this.setState({
        inputSearch: value,
        media: []
      })
    }
  }

  render() {
    const { media, episodes, overview, opened, noResults, statusDelay } = this.state
    
    return (
      <Layout title={'ScraperDede'}>
        <div className="container">

          <input autoFocus={true} className="inputSearch" placeholder=" Buscar..." onChange={(e) => this.handleInputSeach(e.target.value)} />
          <div className="delay">{!statusDelay && <Spinner color={'#000'} size={{ width: 40, height: 40 }} />}</div>
          <div className="results">
            {noResults && <div>Sin resultados</div>}
            {media &&
              media.map((m, i) =>
                <Row
                  onClick={() => this.loadDetails(i)}
                  key={i}
                  className="result">
                  <Col>
                    <Row type="flex" justify="center">
                      <Col xs={6}></Col>
                      <Col style={{ width: 150 }} xs={14}>
                        <Row>
                          {m.poster_path ?
                            <img className="resultImg" src={`https://image.tmdb.org/t/p/w154/${m.poster_path}`} />
                            :
                            <div className="noPoster resultImg"></div>}
                        </Row>
                        <Row>
                          <div className="title">{m.title || m.name || m.original_name}</div>
                        </Row>
                      </Col>
                      <Col xs={6}></Col>
                    </Row>
                    <Row>
                      {i === opened && overview}
                      {i === opened && media[opened].serie && this.loadSeasonList()}
                      {i === opened && m.media_type === 'tv' && episodes && this.loadEpisodeList()}
                    </Row>
                    <Row>
                      {i === opened && m.links && m.links.map((x, index) =>
                        <a href={x.link} target="_blank" >
                          <div className="link" style={{ background: index % 2 === 0 ? '#ffd57a' : '#ffc956' }} key={index}>
                            <div>
                              {x.host ? x.host : 'otro'}
                            </div>
                            <div>
                              {this.languageFlag(x.language) === 'otro' ?
                                <div className="otro"></div>
                                :
                                <img style={{ width: 15 }} src={`static/icons/flags/${this.languageFlag(x.language)}.svg`} />
                              }
                            </div>
                            <div>
                              📺 {x.quality}
                            </div>
                            <div>
                              🔊 {x.sound}
                            </div>
                          </div>
                        </a>
                      )}
                    </Row>
                  </Col>
                </Row>)}
          </div>
          <p>
            📣 Esta aplicación web busca enlaces, no almacena ningun medio audiovisual, ni tiene una base de datos. No saca beneficio alguno, funciona sin publicidad añadida. <br /> Se recomienda instalar un bloqueador de anuncios para mejorar la experiencia ❤
          </p>
        </div>

        <style jsx>{`
                .container {
                  display: flex;
                  flex-direction: column;
                }
                .inputSearch {
                  border-radius: 15px;
                  border 2px gray solid;
                  padding: 4px 10px;
                  font-size: 1.2em;
                }
                .inputSearch:focus{
                  border-radius: 15px;
                  border 2px orange solid;
                  outline: none
                }
                .noPoster{
                  width: 130px;
                  height: 193px;
                  background: #dedfe0;
                }
                .delay {
                  margin: 20px;
                  display: flex;
                  justify-content: center;
                }
                .delay > img {
                  fill: red;
                }
                .resultImg {
                  width: 130px;
                  cursor: pointer;
                  margin-top: 30px;
                }
                .title {
                  width: 130px;
                  background: black;
                  color: white;
                  padding: 5px;
                  margin-bottom: 20px;
                }
                .link {
                  display: flex;
                }
                .link > div {
                  width: 45%;
                  padding: 5px;
                }
                .otro {
                  background: gray;
                  width: 15px;
                  height: 15px;
                  border-radius: 10px;
                }
                
                
                `}</style>
      </Layout>
    )
  }
}

