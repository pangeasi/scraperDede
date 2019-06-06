
import { Component } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import { Row, Col, Icon } from 'antd'


const iconDev = () => (
    <svg
        width="30"
        height="40"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2001">
        <path
            d="M328 512l81.6 108.8a32 32 0 0 1-51.2 38.4l-96-128a32 32 0 0 1 0-38.4l96-128a32 32 0 1 1 51.2 38.4L328 512zM710.4 620.8a32 32 0 0 0 51.2 38.4l96-128a32 32 0 0 0 0-38.4l-96-128a32 32 0 1 0-51.2 38.4l81.6 108.8-81.6 108.8zM559.232 646.944a32 32 0 0 1-62.464-13.888l64-288a32 32 0 0 1 62.464 13.888l-64 288zM874.56 739.904a32 32 0 1 1 41.984 48.32l-220.48 195.936a32 32 0 0 1-20.96 7.84H195.04C140.16 992 96 946.624 96 891.072V132.928C96 77.376 140.16 32 195.04 32h633.92C883.84 32 928 77.376 928 132.928v134.976a32 32 0 0 1-64 0V132.928C864 112.32 848.096 96 828.96 96H195.04C175.904 96 160 112.32 160 132.928v758.144C160 911.68 175.904 928 195.04 928h468.096l211.456-188.096zM928 763.2a32 32 0 0 1-64 0V672a32 32 0 0 1 64 0v91.2z"
            p-id="2002"
            data-spm-anchor-id="a313x.7781069.1998910419.i1">
        </path>
    </svg>
)

const iconHome = () => (
    <svg width="30" height="40" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1954"><path d="M254.88 944a32 32 0 0 1-31.52-37.344l46.304-272.992-196.128-193.28a32 32 0 0 1 17.792-54.432l270.752-39.776 121.152-248.16c10.72-22.016 46.816-22.016 57.504 0l121.152 248.16 270.752 39.776a32 32 0 0 1 17.824 54.432l-196.128 193.28 45.248 266.816a32 32 0 0 1-29.888 43.52h-0.64c-5.152 0-10.304-1.248-15.04-3.744L512 811.584l-242.08 128.672a32.224 32.224 0 0 1-15.04 3.744zM164.224 439.904l162.24 159.904c7.424 7.328 10.816 17.856 9.088 28.128l-38.208 225.312 199.648-106.112a31.968 31.968 0 0 1 30.016 0l199.648 106.112-38.208-225.312a32 32 0 0 1 9.088-28.128l162.208-159.904-223.84-32.896a32 32 0 0 1-24.096-17.632L512 184.96l-99.808 204.416a31.968 31.968 0 0 1-24.096 17.632l-223.872 32.896z" p-id="1955"></path></svg>
)

export class Layout extends Component {
    render() {
        const { title, children } = this.props
        return (
            <div>
                <Head>
                    <title>{title}</title>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                    <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/antd/3.2.0/antd.min.css' />
                </Head>
                <header>
                    <nav>
                        <Row>
                            <Col md={6}>
                                <Row type="flex" justify="center" gutter={60}>
                                    <Col>
                                        <Link href={'/'}>
                                            <a>
                                                <Row type="flex" justify="center">
                                                    <Icon component={iconHome} />
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    Inicio
                                                </Row>
                                            </a>
                                        </Link>
                                    </Col>
                                    <Col>
                                        <Link href={'/about'}>
                                            <a>
                                                <Row type="flex" justify="center">
                                                    <Icon component={iconDev} />
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    Desarrollo
                                                </Row>
                                            </a>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={0} md={14}></Col>
                        </Row>

                    </nav>
                </header>
                <Row style={{ marginTop: 20 }}>
                    <Col xs={1} md={6}></Col>
                    <Col xs={22} md={12}>
                        {children}
                    </Col>
                    <Col xs={1} md={6}></Col>
                </Row>
                <footer></footer>
                <style jsx>{`
                nav {
                    background: gold;
                    font-size: 1.2em;
                    margin: 0;
                    padding: 12px 0;
                }
                .navs {
                    padding: 20px;
                }
                nav > a {
                    font-weight: bold;
                }

                footer {
                    position: relative;
                    bottom: 0px;
                    padding: 0 20px 30px 30px;
                }
                
                `}</style>
                <style jsx global>{`
                body {
                    font-family: sans-serif;
                    margin: 0;
                }
                `}</style>
            </div>
        )
    }
}