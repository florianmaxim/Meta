let scope;
let el;

export default class Hints {
  constructor(){
    el = document.createElement('div');
    el.style.zIndex = '9999999999';
    el.style.opacity = '0.75';
    el.style.position = 'fixed';


    el.style.width = '100vw';
    el.style.height = '100vh';
    el.style.background = 'linear-gradient(rgba(240,142,145,1), rgba(137,137,137,1))';

    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.flexDirection = innerWidth>innerHeight?'row':'column';

    el.style.textAlign = 'center';

    el.style.fontFamily = 'Helvetica';
    el.style.fontSize = '5vh';

    addEventListener('resize', (e) => {
      el.style.flexDirection = innerWidth>innerHeight?'row':'column';
    })

    let press = document.createElement('span');

    press.style.margin = '1vh';
    press.style.padding = '2vh';

    press.style.fontFamily = 'Helvetica';
    press.style.fontSize = '5vh';

    press.style.textShadow = '0px 0px 3px rgba(139,147,166,1)';
    press.style.color = 'white';

    press.innerHTML = 'Press';

    el.appendChild(press)

    let space = document.createElement('span');

    space.style.fontFamily = 'Helvetica';
    space.style.fontSize = '5vh';

    space.style.textShadow = '0px 0px 3px rgba(139,147,166,1)';
    space.style.color = 'white';

    space.style.margin = '1vh';
    space.style.marginLeft = '0';

    space.style.padding = '2vh';

    space.style.borderRadius = '5vh';
    space.style.border = '5px solid white';


    space.innerHTML = 'Space';

    el.appendChild(space)

    let plus = document.createElement('span');

    plus.style.fontFamily = 'Helvetica';
    plus.style.fontSize = '5vh';

    plus.style.textShadow = '0px 0px 3px rgba(139,147,166,1)';
    plus.style.color = 'white';

    plus.style.margin = '1vh';

    plus.innerHTML = '&';

    el.appendChild(plus)

    let enter = document.createElement('span');

    enter.style.fontFamily = 'Helvetica';
    enter.style.fontSize = '5vh';

    enter.style.textShadow = '0px 0px 3px rgba(139,147,166,1)';
    enter.style.color = 'white';

    enter.style.margin = '1vh';
    space.style.marginRight = '0';

    enter.style.padding = '2vh';
    enter.style.borderRadius = '5vh';
    enter.style.border = '5px solid white';

    enter.innerHTML = 'Enter';

    el.appendChild(enter)

    let to = document.createElement('span');

    to.style.fontFamily = 'Helvetica';
    to.style.fontSize = '5vh';

    to.style.textShadow = '0px 0px 3px rgba(139,147,166,1)';
    to.style.color = 'white';

    to.style.margin = '1vh';
    to.style.padding = '2vh';

    to.innerHTML = 'to enter space.';

    el.appendChild(to)

    let close = document.createElement('div');

    close.style.zIndex = '999999999';
    close.style.position = 'fixed';

    close.style.margin = '32px';

    close.style.right = '0';
    close.style.top = '0';


    close.style.width = '32px';
    close.style.height = '32px';

    close.style.background = 'url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDIxLjkgMjEuOSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjEuOSAyMS45IiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij4KICA8cGF0aCBkPSJNMTQuMSwxMS4zYy0wLjItMC4yLTAuMi0wLjUsMC0wLjdsNy41LTcuNWMwLjItMC4yLDAuMy0wLjUsMC4zLTAuN3MtMC4xLTAuNS0wLjMtMC43bC0xLjQtMS40QzIwLDAuMSwxOS43LDAsMTkuNSwwICBjLTAuMywwLTAuNSwwLjEtMC43LDAuM2wtNy41LDcuNWMtMC4yLDAuMi0wLjUsMC4yLTAuNywwTDMuMSwwLjNDMi45LDAuMSwyLjYsMCwyLjQsMFMxLjksMC4xLDEuNywwLjNMMC4zLDEuN0MwLjEsMS45LDAsMi4yLDAsMi40ICBzMC4xLDAuNSwwLjMsMC43bDcuNSw3LjVjMC4yLDAuMiwwLjIsMC41LDAsMC43bC03LjUsNy41QzAuMSwxOSwwLDE5LjMsMCwxOS41czAuMSwwLjUsMC4zLDAuN2wxLjQsMS40YzAuMiwwLjIsMC41LDAuMywwLjcsMC4zICBzMC41LTAuMSwwLjctMC4zbDcuNS03LjVjMC4yLTAuMiwwLjUtMC4yLDAuNywwbDcuNSw3LjVjMC4yLDAuMiwwLjUsMC4zLDAuNywwLjNzMC41LTAuMSwwLjctMC4zbDEuNC0xLjRjMC4yLTAuMiwwLjMtMC41LDAuMy0wLjcgIHMtMC4xLTAuNS0wLjMtMC43TDE0LjEsMTEuM3oiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+Cg==)'
    el.appendChild(close);

    this.element = el;

  }

  show(){
    el.style.display = 'flex';
  }

  hide(){
    el.style.display = 'none';
  }
}
