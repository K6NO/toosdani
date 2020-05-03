export function renderNavigation () {
    document.addEventListener('DOMContentLoaded', function() {
        let htmlObject = `
        <div class="container">
              <nav class="navbar navbar-expand-lg navbar-light">            
              <a class="navbar-brand" href="/"><img class='nav-image' src="img/logo-honlap-160px.png" alt="logo"></a>
              <button class="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarToogle" aria-controls="navbarToogle" aria-expanded="false" aria-label="Toggle navigation">MENU</button>
              <div class="collapse navbar-collapse" id="navbarToogle">
                  <ul class=" navbar-nav ml-auto">
                      <li class="nav-item">
                          <a class="nav-link" href="/">Home</a>
                      </li>
                      <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="/works.html" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Works
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="/works.html?category=kabin">Kabin</a>
                          <a class="dropdown-item" href="/works.html?category=product">Product Design</a>
                          <a class="dropdown-item" href="/works.html?category=graphic">Graphic Design</a>
                          <a class="dropdown-item" href="/works.html?category=form">Form Study</a>
                          <a class="dropdown-item" href="/works.html?category=installation">Installation</a>
                        </div>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="/#contact">Contact</a>
                      </li>
                  </ul>
              </div>
              </nav>
          </div>`;
        document.getElementById('myNavigation').innerHTML = htmlObject;
    });
}