import { Layout } from "../components/layout";
import { Component } from 'react';
import { Spinner } from '../components/Icons/spinner';
import { Button } from "antd";
import { protocol, host, port } from '../utils/functions';
import '../styles/main.scss'
import { Result } from "../components/main.components/result";

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
      episodeSelected: null,
      linkSelected: null
    }
  }

  loadSeasonList = () => {
    const { media, opened, seasonSelected } = this.state
    return (
      <div>
        <hr />
        Temporadas:
        <div className="seasons">
          {media[opened].serie.seasons.map((x, index) =>
            <Button shape="circle" style={{ background: seasonSelected === x.season_number ? 'gold' : null }} onClick={() => this.fetchEpisode(opened, x.season_number)} key={index}>{x.season_number}</Button>)}
        </div>
      </div>
    )
  }

  loadEpisodeList = () => {
    const { media, opened, seasonSelected, episodeSelected } = this.state
    return (
      <div>
        Episodios:
        <div>
          {media[opened].serie.seasons[seasonSelected].epi.episodes.map((x, index) =>
            <Button shape="circle-outline" style={{ background: episodeSelected === x.episode_number ? 'gold' : null }} onClick={() => this.fetchingLinks(opened, seasonSelected, x.episode_number)} key={index}>{x.episode_number}</Button>)}
        </div>
      </div>
    )
  }

  loadDetails = async (i) => {
    const { media } = this.state
    let search = media[i].id
    let type = media[i].media_type === 'tv' ? 1 : 0

    this.setState({
      linkSelected: null,
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

  setSelectedLink = (link, el) => {
    const { media } = this.state
    let finalLink

    switch (true) {
      case media[el].links[link].link.includes('gamovideo'):
        finalLink = `${media[el].links[link].link.replace('gamovideo.com/', 'gamovideo.com/embed-')}-640x360.html`
        break;
      case media[el].links[link].link.includes('verystream'):
        finalLink = media[el].links[link].link.replace('/stream/','/e/')
        break;
      case media[el].links[link].link.includes('openload') || media[el].links[link].link.includes('streamango'):
        finalLink = media[el].links[link].link.replace('/f/','/embed/')
        break;
      case media[el].links[link].link.includes('flix555'):
        finalLink = `${media[el].links[link].link.replace('flix555.com/','flix555.com/embed-')}.html`
        break;
      default:
        finalLink = media[el].links[link].link
        break;
    }

    this.setState({
      linkSelected: finalLink
    })

  }

  fetchingLinks = async (el, season, episode) => {
    const { media } = this.state
    this.setState({loading: true})
    let search = media[el].id
    let type = media[el].media_type === 'tv' ? 1 : 0
    season && episode && this.setState({ episodeSelected: episode })
    media[el].links = []
    const tvURL = type ? `&s=${season}&e=${episode}` : ''
    
    await fetch(`${protocol}://${host}${port}/adede/?term=${search}&is=${type}${tvURL}`)
      .then(data => data.json())
      .then(d => { media[el].links = media[el].links.concat(d) })

    await fetch(`${protocol}://${host}${port}/search-api/?id=${search}`)
      .then(data => data.json())
      .then(d => { media[el].links = media[el].links.concat(d) })

    let links = null
    if(media[el].links.length > 0) {
      const someLink = media[el].links.filter(link => link.status === 200 && link.language === 'Castellano' && link.link.includes('openload'))
      links = someLink.length > 0 ? someLink[0].link.replace('/f/', '/embed/') : null
    }

    this.setState({
      loading: false,
      media,
      linkSelected: links
    })
  }

  handleInputSeach = (value) => {
    if (value.length > 2 && this.state.statusDelay) {
      this.setState({
        setSelectedLink: null,
        media: [],
        opened: null,
        seasonSelected: null,
        episodeSelected: null,
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
    const { media, episodes, overview, opened, noResults, statusDelay, linkSelected, loading } = this.state

    return (
      <Layout title={'ScraperDede'}>
        <div className="container">

          <input autoFocus={true} className="inputSearch" placeholder=" Buscar..." onChange={(e) => this.handleInputSeach(e.target.value)} />
          <div className="delay">{!statusDelay && <Spinner color={'#000'} size={{ width: 40, height: 40 }} />}</div>
          <div className="results">
            {noResults && <div>Sin resultados</div>}
            {media && 
            <Result 
            stateParent={{
              media,
              opened,
              overview,
              episodes,
              loading,
              linkSelected
            }} 
            handles={{
              loadDetails: this.loadDetails,
              loadSeasonList: this.loadSeasonList,
              loadEpisodeList: this.loadEpisodeList,
              setSelectedLink: this.setSelectedLink
            }} />}
          </div>
          <p>
            📣 Esta aplicación web busca enlaces, no almacena ningun medio audiovisual, ni tiene una base de datos. No saca beneficio alguno, funciona sin publicidad añadida. <br /> Se recomienda instalar un bloqueador de anuncios para mejorar la experiencia ❤
          </p>
        </div>
      </Layout>
    )
  }
}

