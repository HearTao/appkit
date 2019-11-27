import a from './a.js'

function greet(r: HTTPRequest) {
  r.log(a)
  r.return(HTTPStatusCode.OK, a())
}