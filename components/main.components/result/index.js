import React from 'react'
import { languageFlag } from '../../../utils/functions';
import { Row, Col } from 'antd';
import { Spinner } from '../../Icons/spinner';

export const Result = ({ 
    stateParent: { media, opened, overview, episodes, loading, linkSelected }, 
    handles: { loadDetails, loadSeasonList, loadEpisodeList, setSelectedLink } 
}) => (
    <React.Fragment>
        {media.map((m, i) =>
                <Row
                  key={i}
                  className="result">
                  <Col>
                    <Row type="flex" justify="center" onClick={() => loadDetails(i)}>
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
                      {i === opened && media[opened].serie && loadSeasonList()}
                      {i === opened && m.media_type === 'tv' && episodes && loadEpisodeList()}
                      {i === opened && linkSelected && 
                        <iframe 
                        src={linkSelected} 
                        scrolling="no" 
                        frameBorder="0" 
                        allowFullScreen={true} 
                        webkitallowfullscreen="true" 
                        mozallowfullscreen="true"></iframe>}
                      {i === opened && loading && <Row type="flex" justify="center"><Spinner color={'#000'} size={{ width: 40, height: 40 }} /></Row>}
                    </Row>
                    <Row>
                      {i === opened && m.links && m.links.map((x, index) =>
                        <div
                          className="link"
                          style={{ background: index % 2 === 0 ? '#ffd57a' : '#ffc956', cursor: 'pointer' }}
                          key={index}
                          onClick={() => setSelectedLink(index, i)}>
                          <div>
                            {x.host ? x.host : 'otro'}
                          </div>
                          <div>
                            {languageFlag(x.language) === 'otro' ?
                              <div className="otro"></div>
                              :
                              <img style={{ width: 15 }} src={`static/icons/flags/${languageFlag(x.language)}.svg`} />
                            }
                          </div>
                          <div>
                            📺 {x.quality}
                          </div>
                          <div>
                            🔊 {x.sound}
                          </div>
                          <div>
                            <Row type="flex" justify="center">
                              {x.status === 200 ? <span style={{ color: 'green' }}>✔</span> : <span style={{ color: 'red' }}>❌</span>}
                            </Row>
                          </div>
                          <div>
                            <a href={x.link} target="_blank" >🔗</a>
                          </div>
                        </div>
                      )}
                    </Row>
                  </Col>
                </Row>)}
    </React.Fragment>
)