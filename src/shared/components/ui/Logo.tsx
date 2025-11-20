import Image from 'next/image'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/images/Logo-ITER-300x217.png"
      alt="ITER Energy Solutions"
      width={120}
      height={87}
      className={className}
      priority
    />
  )
}
