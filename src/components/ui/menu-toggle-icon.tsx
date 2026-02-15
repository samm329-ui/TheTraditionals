import { cn } from '@/lib/utils';

export function MenuToggleIcon({
    open,
    className,
    duration = 300,
    ...props
}: React.ComponentProps<'svg'> & { open: boolean; duration?: number }) {
    const halfHeight = 24 / 2;
    const thirdHeight = 24 / 3;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn('size-6', className)}
            {...props}
        >
            <line
                x1="4"
                x2="20"
                y1={thirdHeight}
                y2={thirdHeight}
                className={cn('origin-center max-w-[unset] transition-transform ease-out')}
                style={{
                    transitionDuration: `${duration}ms`,
                    transform: open ? `translateY(${thirdHeight / 2}px) rotate(45deg)` : 'none',
                }}
            />
            <line
                x1="4"
                x2="20"
                y1={thirdHeight * 2}
                y2={thirdHeight * 2}
                className={cn('origin-center max-w-[unset] transition-transform ease-out')}
                style={{
                    transitionDuration: `${duration}ms`,
                    transform: open ? `translateY(-${thirdHeight / 2}px) rotate(-45deg)` : 'none',
                }}
            />
        </svg>
    );
}
