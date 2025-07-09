# Modal Component Usage Guide

The `Modal` component is a flexible, reusable modal that adapts to your theme and can be customized for different use cases.

## Basic Usage

```jsx
import Modal from './components/Modal'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title="My Modal Title"
    >
      <p>This is the modal content!</p>
    </Modal>
  )
}
```

## Props

### Required Props
- `open: boolean` - Controls modal visibility
- `onClose: () => void` - Called when modal should close
- `title: string` - Modal title
- `children: React.ReactNode` - Modal content

### Optional Props
- `buttons?: ModalButton[]` - Array of button configurations
- `maxWidth?: 'sm' | 'md' | 'lg' | 'xl'` - Modal size (default: 'lg')
- `showCloseButton?: boolean` - Show/hide X button (default: true)
- `accentColor?: string` - Custom accent color class (default: theme-based blue)

## Button Configuration

```jsx
const buttons = [
  {
    label: 'Cancel',
    onClick: () => setIsOpen(false),
    variant: 'secondary' // or 'primary'
  },
  {
    label: 'Open Link',
    onClick: () => {},
    variant: 'primary',
    href: 'https://example.com',
    external: true // opens in new tab
  }
]
```

## Examples

### Simple Confirmation Modal
```jsx
<Modal
  open={showConfirm}
  onClose={() => setShowConfirm(false)}
  title="Confirm Action"
  maxWidth="sm"
  buttons={[
    { label: 'Cancel', onClick: () => setShowConfirm(false), variant: 'secondary' },
    { label: 'Confirm', onClick: handleConfirm, variant: 'primary' }
  ]}
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

### Contact Modal
```jsx
<Modal
  open={showContact}
  onClose={() => setShowContact(false)}
  title="Get in Touch"
  accentColor="bg-green-500"
  buttons={[
    { 
      label: 'Email Me', 
      onClick: () => {}, 
      variant: 'primary',
      href: 'mailto:your-email@example.com' 
    }
  ]}
>
  <p>I'd love to hear from you!</p>
</Modal>
```

### Project Details Modal
```jsx
<Modal
  open={showProject}
  onClose={() => setShowProject(false)}
  title={project.title}
  maxWidth="xl"
  accentColor="bg-purple-500"
  buttons={[
    { 
      label: 'View Code', 
      onClick: () => {}, 
      variant: 'secondary',
      href: project.githubUrl,
      external: true 
    },
    { 
      label: 'Live Demo', 
      onClick: () => {}, 
      variant: 'primary',
      href: project.demoUrl,
      external: true 
    }
  ]}
>
  <div className="space-y-4">
    <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-lg" />
    <p className="text-muted-foreground">{project.description}</p>
  </div>
</Modal>
```

## Features

- ✅ **Theme-aware** - Automatically adapts to light/dark themes
- ✅ **Responsive** - Works on all screen sizes
- ✅ **Accessible** - Keyboard navigation, escape key, focus management
- ✅ **Smooth animations** - Fade in/out with backdrop blur
- ✅ **Flexible buttons** - Support for links, external links, and custom actions
- ✅ **Customizable** - Size, colors, and content fully configurable
- ✅ **Body scroll lock** - Prevents background scrolling when modal is open
