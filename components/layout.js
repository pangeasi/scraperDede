import { Component } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import { Row, Col, Icon } from 'antd'
import { iconDev } from './Icons/iconDev';
import { iconHome } from './Icons/iconHome';

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