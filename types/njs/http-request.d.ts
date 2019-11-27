/**
 * HTTP Methods
 * https://github.com/nginx/njs/blob/master/nginx/ngx_http_js_module.c#L1775
 */
declare const enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PROPFIND = 'PROPFIND',
  PUT = 'PUT',
  MKCOL = 'MKCOL',
  DELETE = 'DELETE',
  COPY = 'COPY',
  MOVE = 'MOVE',
  PROPPATCH = 'PROPPATCH',
  LOCK = 'LOCK',
  UNLOCK = 'UNLOCK',
  PATCH = "PATCH",
  TRACE = 'TRACE'
}

/**
 * HTTP Status Code
 * https://github.com/nginx/nginx/blob/master/src/http/ngx_http_request.h#L72
 */
declare const enum HTTPStatusCode {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  PARTIAL_CONTENT = 206,
  SPECIAL_RESPONSE = 300,
  MOVED_PERMANENTLY = 301,
  MOVED_TEMPORARILY = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NOT_ALLOWED = 405,
  REQUEST_TIME_OUT = 408,
  CONFLICT = 409,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  REQUEST_ENTITY_TOO_LARGE = 413,
  REQUEST_URI_TOO_LARGE = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  RANGE_NOT_SATISFIABLE = 416,
  MISDIRECTED_REQUEST = 421,
  TOO_MANY_REQUESTS = 429,
  CLOSE = 444,
  NGINX_CODES = 494,
  REQUEST_HEADER_TOO_LARGE = 494,
  _CERT_ERROR = 495,
  _NO_CERT = 496,
  TO_HTTPS = 497,
  CLIENT_CLOSED_REQUEST = 499,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIME_OUT = 504,
  VERSION_NOT_SUPPORTED = 505,
  INSUFFICIENT_STORAGE = 507,
}

interface HTTPRequestOptions {
  /**
   * arguments string, by default an empty string is used
   */
  args: string
  /**
   * request body, by default the request body of the parent request object is used
   */
  body: HTTPRequest['requestBody']
  /**
   * HTTP method, by default the `GET` method is used
   */
  method: HTTPMethod
}

interface HTTPRequest extends Common {
  readonly args: {
    readonly [name: string]: string
  }


  finish(): void

  readonly headersIn: {
    readonly [header: string]: string
  }

  headersOut: {
    [header: string]: string
  }

  readonly httpVersion: string


  internalRedirect(uri: string): void

  readonly method: string

  parent: HTTPRequest

  readonly remoteAddress: string
  readonly requestBody: string

  readonly responseBody: string

  return(status: number, text?: string): void

  send(text: string): void

  sendHeader(): void

  status: string

  readonly uri: string

  /**
   * creates a subrequest with the given uri and options, and installs an optional completion callback.
   * 
   * A [subrequest](http://nginx.org/en/docs/dev/development_guide.html#http_subrequests) shares its input headers with the client request. To send headers different from original headers to a proxied server, the [proxy_set_header](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header) directive can be used. To send a completely new set of headers to a proxied server, the [proxy_pass_request_headers](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass_request_headers) directive can be used.
   * 
   * If options is a string, then it holds the subrequest arguments string. Otherwise, options is expected to be an object with the following keys:
   * - **args** - arguments string, by default an empty string is used
   * - **body** - request body, by default the request body of the parent request object is used
   * - **method** - HTTP method, by default the GET method is used
   * 
   * @param uri request uri
   * @param options subrequest options, can be string or object
   * @param callback callback function
   */
  subrequest(uri: string, options?: string | HTTPRequestOptions, callback?: () => void): void
}