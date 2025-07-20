class HomeHandler {}

class ApiHandler {
  home: HomeHandler
  constructor() {
    this.home = new HomeHandler()
  }
}

export { ApiHandler }
