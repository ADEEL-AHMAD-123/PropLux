import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'teal' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200 active:scale-[0.98]',
  secondary: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm active:scale-[0.98]',
  outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border border-blue-600 active:scale-[0.98]',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 active:scale-[0.98]',
  teal: 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm shadow-teal-200 active:scale-[0.98]',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-200 active:scale-[0.98]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, iconLeft, iconRight, children, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : iconLeft ? (
          <span className="flex-shrink-0">{iconLeft}</span>
        ) : null}
        {children}
        {!loading && iconRight && <span className="flex-shrink-0">{iconRight}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
