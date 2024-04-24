import React from 'react';

import { RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/common/components/ui/common/Button';
import { cn } from 'src/common/helpers/helpers';

export function RefreshButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const navigate = useNavigate();

  return (
    <Button
      type='button'
      className={cn('flex self-end max-h-[46px]', className)}
      onClick={() => {
        if (!onClick) navigate(0);
        onClick?.();
      }}
    >
      <RefreshCcw className='w-6 h-6' />
    </Button>
  );
}
