import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Importation des polices */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

  /* Variables globales */
  :root {
    /* Palette de couleurs raffinée */
    --bg-primary: #0a0f18;
    --bg-secondary: #111927;
    --accent-primary: #FDC758;
    --accent-secondary: #e0b347;
    --text-primary: rgba(255, 255, 255, 0.95);
    --text-secondary: rgba(255, 255, 255, 0.75);
    --overlay: rgba(10, 15, 24, 0.7);
    --border: rgba(255, 255, 255, 0.08);
    --glassmorphism: rgba(255, 255, 255, 0.03);
    
    /* Ombres et effets */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    --shadow-md: 0 2px 6px rgba(0, 0, 0, 0.25);
    --shadow-lg: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    --glow: 0 0 15px rgba(37, 99, 235, 0.5);
    
    /* Animations */
    --transition-fast: 0.2s;
    --transition-base: 0.3s;
    --transition-slow: 0.5s;
    
    /* Système */
    color-scheme: dark;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  /* Reset */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: background-color var(--transition-base) ease, 
                color var(--transition-base) ease,
                border-color var(--transition-base) ease,
                box-shadow var(--transition-base) ease,
                transform var(--transition-fast) ease;
  }

  /* Base */
  body {
    font-family: "Inter", sans-serif;
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    background-attachment: fixed;
    color: var(--text-primary);
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Typographie */
  h1, h2, h3, h4, h5, h6 {
    font-family: "Space Grotesk", sans-serif;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
    font-weight: 600;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
  }

  h1 {
    font-size: 2.75rem;
    line-height: 1.1;
  }

  h2 {
    font-size: 2.25rem;
    line-height: 1.2;
  }

  h3 {
    font-size: 1.75rem;
    line-height: 1.3;
  }

  p {
    margin-bottom: 1.25rem;
    color: var(--text-secondary);
    font-size: 1rem;
    max-width: 65ch;
  }

  /* Liens */
  a {
    color: var(--accent-primary);
    text-decoration: none;
    position: relative;
    font-weight: 500;
    
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      bottom: -2px;
      left: 0;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
      transition: width var(--transition-base) ease;
    }
    
    &:hover:after {
      width: 100%;
    }
  }

  /* Boutons */
  button, .button {
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    color: var(--text-primary);
    border: none;
    border-radius: 4px;
    padding: 0.75rem 1.5rem;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition: transform var(--transition-fast) ease, box-shadow var(--transition-fast) ease;
    backdrop-filter: blur(10px);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg), var(--glow);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: var(--shadow-sm);
    }
  }

  /* Champs de formulaire */
  input, textarea, select {
    background-color: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 0.75rem 1rem;
    color: var(--text-primary);
    font-family: "Inter", sans-serif;
    
    &:focus {
      outline: none;
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 1px var(--accent-primary);
    }
  }

  /* Cartes et conteneurs */
  .card {
    background-color: var(--glassmorphism);
    backdrop-filter: blur(15px);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: var(--shadow-md);
    transition: transform var(--transition-base) ease, box-shadow var(--transition-base) ease;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
    }
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-primary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--accent-primary);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent-secondary);
  }

  /* Conteneur */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    animation: fadeIn 0.5s ease-out forwards;
  }

  /* Grid et layout */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  /* Glassmorphism containers */
  .glass {
    background: var(--glassmorphism);
    backdrop-filter: blur(15px);
    border-radius: 8px;
    border: 1px solid var(--border);
  }
`;

export default GlobalStyles;