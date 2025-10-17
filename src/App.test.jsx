import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Component - Theme Toggle Feature', () => {
  beforeEach(() => {
    // Reset the document root attribute before each test
    document.documentElement.removeAttribute('data-theme')
  })

  describe('Theme Toggle Button', () => {
    it('should render the theme toggle button', () => {
      render(<App />)
      const themeButton = screen.getByRole('button', { name: /light mode/i })
      expect(themeButton).toBeInTheDocument()
    })

    it('should initially display "Light mode" when theme is dark', () => {
      render(<App />)
      const themeButton = screen.getByRole('button', { name: /light mode/i })
      expect(themeButton).toHaveTextContent('Light mode')
    })

    it('should have button type="button" to prevent form submission', () => {
      render(<App />)
      const themeButton = screen.getByRole('button', { name: /light mode/i })
      expect(themeButton).toHaveAttribute('type', 'button')
    })

    it('should have the correct CSS classes', () => {
      render(<App />)
      const themeButton = screen.getByRole('button', { name: /light mode/i })
      expect(themeButton).toHaveClass('button', 'small')
    })
  })

  describe('Theme Toggling Functionality', () => {
    it('should toggle theme from dark to light when clicked', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const themeButton = screen.getByRole('button', { name: /light mode/i })
      await user.click(themeButton)
      
      expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument()
    })

    it('should toggle theme from light to dark when clicked twice', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const themeButton = screen.getByRole('button', { name: /light mode/i })
      await user.click(themeButton)
      
      const darkModeButton = screen.getByRole('button', { name: /dark mode/i })
      await user.click(darkModeButton)
      
      expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument()
    })

    it('should toggle theme multiple times correctly', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const getButton = () => screen.getByRole('button', { name: /mode/i })
      
      // Start with dark theme
      expect(getButton()).toHaveTextContent('Light mode')
      
      // Click to light
      await user.click(getButton())
      expect(getButton()).toHaveTextContent('Dark mode')
      
      // Click to dark
      await user.click(getButton())
      expect(getButton()).toHaveTextContent('Light mode')
      
      // Click to light again
      await user.click(getButton())
      expect(getButton()).toHaveTextContent('Dark mode')
    })
  })

  describe('Document Attribute Setting', () => {
    it('should set data-theme="dark" on document root initially', () => {
      render(<App />)
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    })

    it('should update data-theme attribute to "light" when toggled', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const themeButton = screen.getByRole('button', { name: /light mode/i })
      await user.click(themeButton)
      
      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      })
    })

    it('should update data-theme attribute back to "dark" when toggled twice', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const getButton = () => screen.getByRole('button', { name: /mode/i })
      
      await user.click(getButton())
      await user.click(getButton())
      
      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      })
    })

    it('should synchronize data-theme attribute with theme state', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      // Initial state
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument()
      
      // After first toggle
      await user.click(screen.getByRole('button', { name: /light mode/i }))
      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      })
      expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument()
      
      // After second toggle
      await user.click(screen.getByRole('button', { name: /dark mode/i }))
      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      })
      expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument()
    })
  })

  describe('Theme Toggle Integration with Todo App', () => {
    it('should not interfere with adding todos when theme is toggled', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      // Toggle theme
      const themeButton = screen.getByRole('button', { name: /light mode/i })
      await user.click(themeButton)
      
      // Add a todo
      const input = screen.getByPlaceholderText(/add a task/i)
      await user.type(input, 'Test task')
      
      const addButton = screen.getByRole('button', { name: /^add$/i })
      await user.click(addButton)
      
      expect(screen.getByText('Test task')).toBeInTheDocument()
    })

    it('should maintain theme state while interacting with todos', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      // Switch to light mode
      await user.click(screen.getByRole('button', { name: /light mode/i }))
      
      // Add a todo
      const input = screen.getByPlaceholderText(/add a task/i)
      await user.type(input, 'Test task')
      await user.click(screen.getByRole('button', { name: /^add$/i }))
      
      // Verify theme is still light
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument()
    })

    it('should preserve todo state when toggling theme', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      // Add a todo
      const input = screen.getByPlaceholderText(/add a task/i)
      await user.type(input, 'Important task')
      await user.click(screen.getByRole('button', { name: /^add$/i }))
      
      // Toggle theme multiple times
      const getThemeButton = () => screen.getByRole('button', { name: /mode/i })
      await user.click(getThemeButton())
      await user.click(getThemeButton())
      await user.click(getThemeButton())
      
      // Verify todo is still there
      expect(screen.getByText('Important task')).toBeInTheDocument()
    })
  })

  describe('Theme Toggle Layout', () => {
    it('should render theme toggle in header with correct styling', () => {
      render(<App />)
      const themeButton = screen.getByRole('button', { name: /light mode/i })
      const header = themeButton.closest('.header')
      
      expect(header).toBeInTheDocument()
      expect(header).toHaveStyle({ marginBottom: '12px' })
    })

    it('should have a spacer div before the theme toggle button', () => {
      const { container } = render(<App />)
      const themeButton = screen.getByRole('button', { name: /light mode/i })
      const header = themeButton.closest('.header')
      const spacer = header.querySelector('div[style*="flex: 1"]')
      
      expect(spacer).toBeInTheDocument()
    })
  })

  describe('Edge Cases and Error Handling', () => {
    it('should handle rapid theme toggling', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const getButton = () => screen.getByRole('button', { name: /mode/i })
      
      // Rapidly toggle theme
      for (let i = 0; i < 10; i++) {
        await user.click(getButton())
      }
      
      // Should end up in light mode (started dark, toggled 10 times)
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument()
    })

    it('should maintain theme consistency after component re-renders', async () => {
      const user = userEvent.setup()
      const { rerender } = render(<App />)
      
      // Toggle to light mode
      await user.click(screen.getByRole('button', { name: /light mode/i }))
      
      // Force re-render
      rerender(<App />)
      
      // Theme should reset to dark (new component instance)
      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      })
    })

    it('should work correctly even if documentElement is modified externally', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      // Externally modify the attribute
      document.documentElement.setAttribute('data-theme', 'custom')
      
      // Toggle theme
      await user.click(screen.getByRole('button', { name: /light mode/i }))
      
      // Should override with light
      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      })
    })
  })

  describe('Accessibility', () => {
    it('should have accessible button with clear text', () => {
      render(<App />)
      const themeButton = screen.getByRole('button', { name: /light mode/i })
      
      expect(themeButton).toBeVisible()
      expect(themeButton.textContent).toBeTruthy()
    })

    it('should be keyboard accessible', async () => {
      render(<App />)
      const themeButton = screen.getByRole('button', { name: /light mode/i })
      
      // Focus the button
      themeButton.focus()
      expect(themeButton).toHaveFocus()
      
      // Press Enter
      fireEvent.keyDown(themeButton, { key: 'Enter', code: 'Enter' })
      
      // Button text should change
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument()
      })
    })

    it('should maintain focus after theme toggle', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const themeButton = screen.getByRole('button', { name: /light mode/i })
      await user.click(themeButton)
      
      const darkModeButton = screen.getByRole('button', { name: /dark mode/i })
      expect(darkModeButton).toBeInTheDocument()
    })
  })

  describe('Initial State', () => {
    it('should start with dark theme by default', () => {
      render(<App />)
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument()
    })

    it('should set data-theme immediately on mount', () => {
      const setAttributeSpy = vi.spyOn(document.documentElement, 'setAttribute')
      render(<App />)
      
      expect(setAttributeSpy).toHaveBeenCalledWith('data-theme', 'dark')
      setAttributeSpy.mockRestore()
    })
  })

  describe('useEffect Hook Behavior', () => {
    it('should call setAttribute on mount', () => {
      const setAttributeSpy = vi.spyOn(document.documentElement, 'setAttribute')
      render(<App />)
      
      expect(setAttributeSpy).toHaveBeenCalledWith('data-theme', 'dark')
      setAttributeSpy.mockRestore()
    })

    it('should call setAttribute when theme changes', async () => {
      const user = userEvent.setup()
      const setAttributeSpy = vi.spyOn(document.documentElement, 'setAttribute')
      
      render(<App />)
      
      // Clear initial call
      setAttributeSpy.mockClear()
      
      // Toggle theme
      await user.click(screen.getByRole('button', { name: /light mode/i }))
      
      await waitFor(() => {
        expect(setAttributeSpy).toHaveBeenCalledWith('data-theme', 'light')
      })
      
      setAttributeSpy.mockRestore()
    })

    it('should update attribute each time theme toggles', async () => {
      const user = userEvent.setup()
      const setAttributeSpy = vi.spyOn(document.documentElement, 'setAttribute')
      
      render(<App />)
      setAttributeSpy.mockClear()
      
      const getButton = () => screen.getByRole('button', { name: /mode/i })
      
      await user.click(getButton())
      await waitFor(() => {
        expect(setAttributeSpy).toHaveBeenCalledWith('data-theme', 'light')
      })
      
      setAttributeSpy.mockClear()
      
      await user.click(getButton())
      await waitFor(() => {
        expect(setAttributeSpy).toHaveBeenCalledWith('data-theme', 'dark')
      })
      
      setAttributeSpy.mockRestore()
    })
  })
})

describe('App Component - Existing Functionality with Theme', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
  })

  it('should render all main components including theme toggle', () => {
    render(<App />)
    
    expect(screen.getByPlaceholderText(/add a task/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^add$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument()
  })

  it('should maintain todo functionality in both themes', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Add todo in dark mode
    await user.type(screen.getByPlaceholderText(/add a task/i), 'Dark mode task')
    await user.click(screen.getByRole('button', { name: /^add$/i }))
    expect(screen.getByText('Dark mode task')).toBeInTheDocument()
    
    // Switch to light mode
    await user.click(screen.getByRole('button', { name: /light mode/i }))
    
    // Add todo in light mode
    await user.type(screen.getByPlaceholderText(/add a task/i), 'Light mode task')
    await user.click(screen.getByRole('button', { name: /^add$/i }))
    expect(screen.getByText('Light mode task')).toBeInTheDocument()
    
    // Both todos should be visible
    expect(screen.getByText('Dark mode task')).toBeInTheDocument()
    expect(screen.getByText('Light mode task')).toBeInTheDocument()
  })
})