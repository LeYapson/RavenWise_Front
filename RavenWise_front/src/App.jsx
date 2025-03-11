import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/styles/global.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
        <div class="tenor-gif-embed" data-postid="21814603" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/mmg-digo-glu-glu-gif-21814603">Mmg Digo Glu Glu GIF</a>from <a href="https://tenor.com/search/mmg+digo+glu+glu-gifs">Mmg Digo Glu Glu GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
        </a>
        </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        MAMAGUEVO IM A FISH
      </p>
    </>
  )
}

export default App
