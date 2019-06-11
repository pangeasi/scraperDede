export const languageFlag = (lang) => {
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

const isDevelopment = process.env.NODE_ENV === 'development'
export const protocol = isDevelopment ? 'http' : 'https'
export const host = isDevelopment ? 'localhost' : 'scraperdede.now.sh/faas'
export const port = isDevelopment ? ':4000' : ''
