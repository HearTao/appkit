interface Common {
  /**
   * writes a sent string to the error log on the error level of logging
   * @param text text
   */
  error(text: string): void
  /**
   * writes a sent string to the error log on the warning level of logging
   * 
   * @param text test
   */
  warn(text: string): void
  /**
   * writes a sent string to the error log on the info level of logging
   * @param text test
   */
  log(text: string): void

  variables: {
    [name: string]: string
  }
}