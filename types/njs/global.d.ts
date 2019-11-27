declare var process: {
  argv: string[]
  env: {
    [name: string]: string | undefined
  }

  pid: number
  ppid: number
}