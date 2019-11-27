
declare const enum StreamSessionEvent {
  Upload = 'upload',
  Download = 'download'
}

/**
 * The stream session object is available only in the [ngx_stream_js_module](http://nginx.org/en/docs/stream/ngx_stream_js_module.html) module. All string properties of the object are [byte strings](http://nginx.org/en/docs/njs/reference.html#string).
 */
interface StreamSession extends Common {
  allow(): void
  deny(): void

  decline(): void
  done(code: number): void

  /**
   * registers a callback for the specified event ([0.2.4](http://nginx.org/en/docs/njs/changes.html#njs0.2.4)).
   * 
   * An event may be one of the following strings:
   * - **upload** - new data from a client
   * - **download** - new data to a client
   * 
   * The completion callback has the following prototype: callback(data, flags), where data is string, flags is an object with the following properties:
   * - **last** - a boolean value, true if data is a last buffer.
   * 
   * @param event event name
   * @param callback callback function
   */
  on(event: StreamSessionEvent, callback: (data: string, flags: { last: boolean }) => void): void
  /**
   * unregisters the callback set by the [s.on()](http://nginx.org/en/docs/njs/reference.html#s_on) method ([0.2.4](http://nginx.org/en/docs/njs/changes.html#njs0.2.4))
   * @param event event name
   */
  off(event: StreamSessionEvent): void

  readonly remoteAddress: string

  send(data: string, options: { last: boolean, flush: boolean }): void
}
