import { Loader2 } from "lucide-react";

import { Button } from "@components/ui/button";

type ButtonProps = {
  children: string;
};

export const ButtonLoading = ({ children }: ButtonProps) => (
  <Button className='relative left-1/2 -translate-x-1/2'>
    <Loader2 className='animate-spin' />
    {children}
  </Button>
);
