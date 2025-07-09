'use client'

import React, { useEffect } from 'react'
import { useTheme } from 'next-themes'

interface ModalButton {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
    href?: string
    external?: boolean
}

interface ModalProps {
    open: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    buttons?: ModalButton[]
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
    showCloseButton?: boolean
    accentColor?: string
}

export default function Modal({
    open,
    onClose,
    title,
    children,
    buttons = [],
    maxWidth = 'lg',
    showCloseButton = true,
    accentColor
}: ModalProps) {
    const { resolvedTheme } = useTheme()

    // Handle escape key press
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        if (open) {
            document.addEventListener('keydown', handleEscape)
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [open, onClose])

    if (!open) return null

    // Clean black and white theme-aware classes
    const modalBg = resolvedTheme === 'dark'
        ? 'bg-black'
        : 'bg-white'
    const borderColor = resolvedTheme === 'dark'
        ? 'border-white/20 shadow-2xl shadow-black/50'
        : 'border-black/20 shadow-2xl shadow-black/10'
    const textColor = resolvedTheme === 'dark' ? 'text-white' : 'text-black'

    // Max width classes
    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl'
    }

    // Default accent color - blue theme
    const defaultAccentColor = accentColor || 'bg-blue-300'

    const handleButtonClick = (button: ModalButton) => {
        if (button.href) {
            if (button.external) {
                window.open(button.href, '_blank')
            } else {
                window.location.href = button.href
            }
        }
        button.onClick()
    }

    const getButtonStyles = (variant: 'primary' | 'secondary' = 'secondary') => {
        if (variant === 'primary') {
            return 'bg-blue-400 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-400/25 border border-blue-400/30 transition-all duration-300'
        } else {
            return resolvedTheme === 'dark'
                ? 'bg-white/10 hover:bg-blue-300/20 text-white border border-white/30 hover:border-blue-300/50 backdrop-blur-sm transition-all duration-300'
                : 'bg-black/10 hover:bg-blue-300/20 text-black border border-black/30 hover:border-blue-300/50 backdrop-blur-sm transition-all duration-300'
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className={`${modalBg} ${borderColor} ${textColor} rounded-2xl ${maxWidthClasses[maxWidth]} w-full max-h-[80vh] flex flex-col border transform transition-all duration-500 animate-in zoom-in-95 relative overflow-hidden`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Minimalist decorative elements */}
                <div className="absolute top-6 right-6 w-20 h-20 opacity-5">
                    <div className={`w-full h-full rounded-full ${resolvedTheme === 'dark' ? 'bg-white' : 'bg-black'} blur-xl`}></div>
                </div>
                <div className="absolute bottom-6 left-6 w-16 h-16 opacity-5">
                    <div className={`w-full h-full rounded-full ${resolvedTheme === 'dark' ? 'bg-white' : 'bg-black'} blur-xl`}></div>
                </div>

                {/* Close button */}
                {showCloseButton && (
                    <button
                        onClick={onClose}
                        className={`absolute cursor-pointer top-4 right-4 w-8 h-8 flex items-center justify-center transition-all duration-300 z-20 hover:bg-blue-300/20 hover:text-blue-400 ${resolvedTheme === 'dark'
                            ? 'text-white/60'
                            : 'text-black/60'
                            }`}
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}

                {/* Header */}
                <div className="flex-shrink-0 px-8 pt-8 pb-4 space-y-4 relative z-10">
                    <h2 className="text-2xl font-bold tracking-tight">
                        {title}
                    </h2>
                    <div className={`h-px w-16 ${defaultAccentColor} opacity-80`}></div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-8 pb-4 space-y-4 relative z-10">
                    {children}
                </div>

                {/* Footer with action buttons */}
                {buttons.length > 0 && (
                    <div className="flex-shrink-0 px-8 pb-8 pt-4 flex flex-col sm:flex-row justify-end gap-3 relative z-10">
                        {buttons.map((button, index) => (
                            <button
                                key={index}
                                onClick={() => handleButtonClick(button)}
                                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 cursor-pointer hover:scale-105 ${getButtonStyles(button.variant)}`}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
