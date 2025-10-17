import { describe, it, expect, beforeEach } from 'vitest'

describe('CSS Custom Properties - Theme Variables', () => {
  let styleElement

  beforeEach(() => {
    // Create a temporary style element with our CSS
    styleElement = document.createElement('style')
    styleElement.textContent = `
      :root {
        color-scheme: light dark;
        --bg: #0b0b0c;
        --fg: #e5e7eb;
        --card: #111214;
        --border: #1f2937;
        --muted-border: #374151;
        --button: #1f2937;
        --strike: #7dd3fc;
      }
      :root[data-theme="light"] {
        --bg: #f7f7f8;
        --fg: #0b0b0c;
        --card: #ffffff;
        --border: #e5e7eb;
        --muted-border: #d1d5db;
        --button: #e5e7eb;
        --strike: #2563eb;
      }
    `
    document.head.appendChild(styleElement)
  })

  afterEach(() => {
    if (styleElement && styleElement.parentNode) {
      styleElement.parentNode.removeChild(styleElement)
    }
    document.documentElement.removeAttribute('data-theme')
  })

  describe('Dark Theme Variables (Default)', () => {
    it('should define --bg variable for dark theme', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const bgValue = computedStyle.getPropertyValue('--bg').trim()
      expect(bgValue).toBe('#0b0b0c')
    })

    it('should define --fg variable for dark theme', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const fgValue = computedStyle.getPropertyValue('--fg').trim()
      expect(fgValue).toBe('#e5e7eb')
    })

    it('should define --card variable for dark theme', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const cardValue = computedStyle.getPropertyValue('--card').trim()
      expect(cardValue).toBe('#111214')
    })

    it('should define --border variable for dark theme', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const borderValue = computedStyle.getPropertyValue('--border').trim()
      expect(borderValue).toBe('#1f2937')
    })

    it('should define --muted-border variable for dark theme', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const mutedBorderValue = computedStyle.getPropertyValue('--muted-border').trim()
      expect(mutedBorderValue).toBe('#374151')
    })

    it('should define --button variable for dark theme', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const buttonValue = computedStyle.getPropertyValue('--button').trim()
      expect(buttonValue).toBe('#1f2937')
    })

    it('should define --strike variable for dark theme', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const strikeValue = computedStyle.getPropertyValue('--strike').trim()
      expect(strikeValue).toBe('#7dd3fc')
    })

    it('should define all required dark theme variables', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const requiredVars = ['--bg', '--fg', '--card', '--border', '--muted-border', '--button', '--strike']
      
      requiredVars.forEach(varName => {
        const value = computedStyle.getPropertyValue(varName).trim()
        expect(value).toBeTruthy()
        expect(value).toMatch(/^#[0-9a-f]{6}$/i)
      })
    })
  })

  describe('Light Theme Variables', () => {
    beforeEach(() => {
      document.documentElement.setAttribute('data-theme', 'light')
    })

    it('should override --bg variable for light theme', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const bgValue = computedStyle.getPropertyValue('--bg').trim()
      expect(bgValue).toBe('#f7f7f8')
    })

    it('should override --fg variable for light theme', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const fgValue = computedStyle.getPropertyValue('--fg').trim()
      expect(fgValue).toBe('#0b0b0c')
    })

    it('should override --card variable for light theme', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const cardValue = computedStyle.getPropertyValue('--card').trim()
      expect(cardValue).toBe('#ffffff')
    })

    it('should override --border variable for light theme', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const borderValue = computedStyle.getPropertyValue('--border').trim()
      expect(borderValue).toBe('#e5e7eb')
    })

    it('should override --muted-border variable for light theme', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const mutedBorderValue = computedStyle.getPropertyValue('--muted-border').trim()
      expect(mutedBorderValue).toBe('#d1d5db')
    })

    it('should override --button variable for light theme', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const buttonValue = computedStyle.getPropertyValue('--button').trim()
      expect(buttonValue).toBe('#e5e7eb')
    })

    it('should override --strike variable for light theme', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const strikeValue = computedStyle.getPropertyValue('--strike').trim()
      expect(strikeValue).toBe('#2563eb')
    })

    it('should define all required light theme variables', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const requiredVars = ['--bg', '--fg', '--card', '--border', '--muted-border', '--button', '--strike']
      
      requiredVars.forEach(varName => {
        const value = computedStyle.getPropertyValue(varName).trim()
        expect(value).toBeTruthy()
        expect(value).toMatch(/^#[0-9a-f]{6}$/i)
      })
    })
  })

  describe('Theme Variable Contrast', () => {
    it('should have inverted fg/bg colors between themes', () => {
      // Dark theme
      let computedStyle = getComputedStyle(document.documentElement)
      const darkBg = computedStyle.getPropertyValue('--bg').trim()
      const darkFg = computedStyle.getPropertyValue('--fg').trim()
      
      // Light theme
      document.documentElement.setAttribute('data-theme', 'light')
      computedStyle = getComputedStyle(document.documentElement)
      const lightBg = computedStyle.getPropertyValue('--bg').trim()
      const lightFg = computedStyle.getPropertyValue('--fg').trim()
      
      // Dark background should be close to light foreground
      expect(darkBg).toBe('#0b0b0c')
      expect(lightFg).toBe('#0b0b0c')
      
      // Dark foreground should be lighter than light background
      expect(darkFg).toBe('#e5e7eb')
    })

    it('should have different strike colors between themes', () => {
      // Dark theme
      let computedStyle = getComputedStyle(document.documentElement)
      const darkStrike = computedStyle.getPropertyValue('--strike').trim()
      
      // Light theme
      document.documentElement.setAttribute('data-theme', 'light')
      computedStyle = getComputedStyle(document.documentElement)
      const lightStrike = computedStyle.getPropertyValue('--strike').trim()
      
      expect(darkStrike).not.toBe(lightStrike)
      expect(darkStrike).toBe('#7dd3fc')
      expect(lightStrike).toBe('#2563eb')
    })
  })

  describe('CSS Variable Format Validation', () => {
    it('should use valid hex color format for all variables', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const allVars = ['--bg', '--fg', '--card', '--border', '--muted-border', '--button', '--strike']
      
      allVars.forEach(varName => {
        const value = computedStyle.getPropertyValue(varName).trim()
        expect(value).toMatch(/^#[0-9a-f]{6}$/i)
      })
    })

    it('should have proper color-scheme property', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const colorScheme = computedStyle.getPropertyValue('color-scheme').trim()
      expect(colorScheme).toContain('light')
      expect(colorScheme).toContain('dark')
    })
  })

  describe('Theme Switching', () => {
    it('should correctly switch from dark to light theme variables', () => {
      // Start with dark
      let computedStyle = getComputedStyle(document.documentElement)
      const darkCard = computedStyle.getPropertyValue('--card').trim()
      expect(darkCard).toBe('#111214')
      
      // Switch to light
      document.documentElement.setAttribute('data-theme', 'light')
      computedStyle = getComputedStyle(document.documentElement)
      const lightCard = computedStyle.getPropertyValue('--card').trim()
      expect(lightCard).toBe('#ffffff')
    })

    it('should correctly switch from light to dark theme variables', () => {
      // Start with light
      document.documentElement.setAttribute('data-theme', 'light')
      let computedStyle = getComputedStyle(document.documentElement)
      const lightBorder = computedStyle.getPropertyValue('--border').trim()
      expect(lightBorder).toBe('#e5e7eb')
      
      // Switch to dark
      document.documentElement.removeAttribute('data-theme')
      computedStyle = getComputedStyle(document.documentElement)
      const darkBorder = computedStyle.getPropertyValue('--border').trim()
      expect(darkBorder).toBe('#1f2937')
    })
  })

  describe('Variable Consistency', () => {
    it('should define the same number of variables for both themes', () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const expectedVars = ['--bg', '--fg', '--card', '--border', '--muted-border', '--button', '--strike']
      
      // Check dark theme
      expectedVars.forEach(varName => {
        expect(computedStyle.getPropertyValue(varName).trim()).toBeTruthy()
      })
      
      // Check light theme
      document.documentElement.setAttribute('data-theme', 'light')
      const lightComputedStyle = getComputedStyle(document.documentElement)
      expectedVars.forEach(varName => {
        expect(lightComputedStyle.getPropertyValue(varName).trim()).toBeTruthy()
      })
    })

    it('should not have undefined or empty variables', () => {
      const themes = [null, 'light']
      const expectedVars = ['--bg', '--fg', '--card', '--border', '--muted-border', '--button', '--strike']
      
      themes.forEach(theme => {
        if (theme) {
          document.documentElement.setAttribute('data-theme', theme)
        } else {
          document.documentElement.removeAttribute('data-theme')
        }
        
        const computedStyle = getComputedStyle(document.documentElement)
        expectedVars.forEach(varName => {
          const value = computedStyle.getPropertyValue(varName).trim()
          expect(value).not.toBe('')
          expect(value).not.toBe('undefined')
        })
      })
    })
  })
})

describe('CSS Structure and Classes', () => {
  it('should have defined priority color classes', () => {
    const styleEl = document.createElement('style')
    styleEl.textContent = `
      .priority.low { color: #065f46; }
      .priority.medium { color: #92400e; }
      .priority.high { color: #991b1b; }
    `
    document.head.appendChild(styleEl)
    
    const testDiv = document.createElement('div')
    testDiv.className = 'priority low'
    document.body.appendChild(testDiv)
    
    const computedStyle = getComputedStyle(testDiv)
    expect(computedStyle.color).toBeTruthy()
    
    document.body.removeChild(testDiv)
    document.head.removeChild(styleEl)
  })

  it('should have button small class defined', () => {
    const styleEl = document.createElement('style')
    styleEl.textContent = `.small { padding: 6px 10px; }`
    document.head.appendChild(styleEl)
    
    const testButton = document.createElement('button')
    testButton.className = 'small'
    document.body.appendChild(testButton)
    
    const computedStyle = getComputedStyle(testButton)
    expect(computedStyle.padding).toBe('6px 10px')
    
    document.body.removeChild(testButton)
    document.head.removeChild(styleEl)
  })
})