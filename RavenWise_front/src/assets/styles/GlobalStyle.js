import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap');

  :root {
    --bg-primary: #0a1220;
    --bg-secondary: #132238;
    --accent-primary: #3a8eff;
    --accent-secondary: #FDC758;
    --text-primary: rgba(255, 255, 255, 0.92);
    --text-secondary: rgba(255, 255, 255, 0.7);
    --transition-speed: 0.3s;
    color-scheme: light dark;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: background-color var(--transition-speed) ease, 
                color var(--transition-speed) ease,
                border-color var(--transition-speed) ease,
                box-shadow var(--transition-speed) ease;
  }

  body {
    font-family: "Mulish", sans-serif;
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    color: var(--text-primary);
    line-height: 1.6;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Zen Dots", sans-serif;
    letter-spacing: 0.5px;
    margin-bottom: 1rem;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  p {
    margin-bottom: 1rem;
    color: var(--text-secondary);
  }

  a {
    color: var(--accent-primary);
    text-decoration: none;
    position: relative;
    font-weight: 500;
    
    &:hover:after {
      width: 100%;
    }
  }

  button, .button {
    background-color: var(--accent-primary);
    color: var(--bg-primary);
    border: none;
    border-radius: 4px;
    padding: 0.75rem 1.5rem;
    font-family: "Mulish", sans-serif;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(58, 142, 255, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(58, 142, 255, 0.4);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(58, 142, 255, 0.3);
    }
  }

  input, textarea, select {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    padding: 0.75rem 1rem;
    color: var(--text-primary);
    font-family: "Mulish", sans-serif;
    
    &:focus {
      outline: none;
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 2px rgba(58, 142, 255, 0.2);
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

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
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

  /* Container styles for consistent layout */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    animation: fadeIn 0.5s ease-out forwards;
  }
`;

export default GlobalStyles;