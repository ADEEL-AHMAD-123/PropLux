import { cn } from '@/lib/utils'

type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline'
  | 'sale'
  | 'rent'
  | 'short-term'
  | 'new'
  | 'featured'
  | 'muted'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-blue-100 text-blue-700 border border-blue-200',
  success: 'bg-green-100 text-green-700 border border-green-200',
  warning: 'bg-amber-100 text-amber-700 border border-amber-200',
  danger: 'bg-red-100 text-red-700 border border-red-200',
  outline: 'bg-transparent text-gray-600 border border-gray-300',
  sale: 'bg-blue-600 text-white border-0',
  rent: 'bg-teal-600 text-white border-0',
  'short-term': 'bg-purple-600 text-white border-0',
  new: 'bg-green-500 text-white border-0',
  featured: 'bg-amber-500 text-white border-0',
  muted: 'bg-gray-100 text-gray-600 border border-gray-200',
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
