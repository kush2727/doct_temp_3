import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppointmentForm } from '../AppointmentForm'

describe('AppointmentForm Integration', () => {
  it('renders all form steps', () => {
    render(<AppointmentForm />)
    expect(screen.getByText('Select Appointment Type')).toBeInTheDocument()
  })

  it('navigates through form steps', async () => {
    const user = userEvent.setup()
    render(<AppointmentForm />)

    // Step 1: Select appointment type
    const consultationRadio = screen.getByDisplayValue('consultation')
    await user.click(consultationRadio)

    // Click Next
    const nextButton = screen.getByText('Next')
    await user.click(nextButton)

    // Should be on Step 2
    await waitFor(() => {
      expect(screen.getByText('Select Date & Time')).toBeInTheDocument()
    })
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<AppointmentForm />)

    // Try to proceed without selecting appointment type
    const nextButton = screen.getByText('Next')
    await user.click(nextButton)

    // Should still be on Step 1
    expect(screen.getByText('Select Appointment Type')).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()
    render(<AppointmentForm onSubmit={handleSubmit} />)

    // Step 1: Select appointment type
    const consultationRadio = screen.getByDisplayValue('consultation')
    await user.click(consultationRadio)
    await user.click(screen.getByText('Next'))

    // Step 2: Select date and time
    await waitFor(() => {
      expect(screen.getByText('Select Date & Time')).toBeInTheDocument()
    })
    const dateInput = screen.getByDisplayValue('')
    await user.type(dateInput, '2024-01-15')
    const timeInputs = screen.getAllByDisplayValue('')
    await user.type(timeInputs[0], '10:00')
    await user.click(screen.getByText('Next'))

    // Step 3: Patient information
    await waitFor(() => {
      expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument()
    })
    await user.type(screen.getByPlaceholderText('John Doe'), 'John Smith')
    await user.type(screen.getByPlaceholderText('john@example.com'), 'john@example.com')
    await user.type(screen.getByPlaceholderText('+1 (555) 000-0000'), '+1 (555) 123-4567')
    await user.type(
      screen.getByPlaceholderText('Please describe your symptoms or reason for visit'),
      'I have been experiencing chest pain'
    )
    await user.click(screen.getByText('Next'))

    // Step 4: Confirmation
    await waitFor(() => {
      expect(screen.getByText('Confirm Your Appointment')).toBeInTheDocument()
    })
    await user.click(screen.getByText('Confirm Appointment'))

    // Wait for submission
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled()
    })
  })

  it('navigates back to previous steps', async () => {
    const user = userEvent.setup()
    render(<AppointmentForm />)

    // Step 1: Select appointment type
    const consultationRadio = screen.getByDisplayValue('consultation')
    await user.click(consultationRadio)
    await user.click(screen.getByText('Next'))

    // Step 2: Click Previous
    await waitFor(() => {
      expect(screen.getByText('Select Date & Time')).toBeInTheDocument()
    })
    const previousButton = screen.getByText('Previous')
    await user.click(previousButton)

    // Should be back on Step 1
    expect(screen.getByText('Select Appointment Type')).toBeInTheDocument()
  })
})
