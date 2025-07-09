// Example usage of the generic Modal component

import Modal from './Modal'

// Types for the example components
interface ConfirmationModalProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
}

interface ContactModalProps {
    open: boolean
    onClose: () => void
}

interface Project {
    title: string
    image: string
    description: string
    technologies: string[]
    githubUrl: string
    demoUrl: string
}

interface ProjectModalProps {
    open: boolean
    onClose: () => void
    project: Project
}

// Example 1: Simple confirmation modal
export function ConfirmationModal({ open, onClose, onConfirm, title, message }: ConfirmationModalProps) {
    const buttons = [
        {
            label: 'Cancel',
            onClick: onClose,
            variant: 'secondary' as const
        },
        {
            label: 'Confirm',
            onClick: onConfirm,
            variant: 'primary' as const
        }
    ]

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
            buttons={buttons}
            maxWidth="sm"
        >
            <p className="text-muted-foreground">{message}</p>
        </Modal>
    )
}

// Example 2: Contact modal
export function ContactModal({ open, onClose }: ContactModalProps) {
    const buttons = [
        {
            label: 'Email Me',
            onClick: () => { },
            variant: 'primary' as const,
            href: 'mailto:your-email@example.com'
        },
        {
            label: 'LinkedIn',
            onClick: () => { },
            variant: 'secondary' as const,
            href: 'https://linkedin.com/in/your-profile',
            external: true
        }
    ]

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Get in Touch"
            buttons={buttons}
            maxWidth="md"
            accentColor="bg-green-500"
        >
            <p className="text-muted-foreground">
                I'd love to hear from you! Feel free to reach out via email or connect with me on LinkedIn.
            </p>
        </Modal>
    )
}

// Example 3: Project details modal
export function ProjectModal({ open, onClose, project }: ProjectModalProps) {
    const buttons = [
        {
            label: 'View Code',
            onClick: () => { },
            variant: 'secondary' as const,
            href: project.githubUrl,
            external: true
        },
        {
            label: 'Live Demo',
            onClick: () => { },
            variant: 'primary' as const,
            href: project.demoUrl,
            external: true
        }
    ]

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={project.title}
            buttons={buttons}
            maxWidth="xl"
            accentColor="bg-purple-500"
        >
            <div className="space-y-4">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string, index: number) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-muted rounded text-sm"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </Modal>
    )
}
