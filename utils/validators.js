module.exports = {
    checkStatus: ($) => {
      let statusText = $('.content-blocked > h3').text()
      let status = statusText === 'We’re Sorry!'
        || statusText === 'File not found! Much sorry!'
        || $('h1').text() === 'Sorry!'
        || $('.text-center').text().includes('Reason for deletion:')
        || $('#container').text().includes('Reason for deletion:')
        || $('.container').text().includes('File Not Found')
        || $('div > img').attr('alt') === '404 File not found!'
        || $('h1').text() === 'File Not Found'
        || $('center').text().includes('File Not Found')
        || $('body').text().includes('File Not Found')
        || $('#cuerpo').text().includes('Copyright Infringement')
        || $('body').text().includes('Forbidden')
      return status
    },
    validServer: (x) => x.link.includes('openload')
    || x.link.includes('verystream')
    || x.link.includes('streamango')
    || x.link.includes('vidoza')
    || x.link.includes('streamcherry')
    || x.link.includes('flix555')
    || x.link.includes('streamplay')
    || x.link.includes('clipwatching')
    || x.link.includes('streamcloud')
    || x.link.includes('flashx')
    || x.link.includes('powvideo')
    || x.link.includes('gamovideo')
  } 