"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface EmptyDataProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonIcon?: React.ReactNode;
  buttonLabel: string;
  buttonOnClick?: () => void;
}

export function EmptyState(props: EmptyDataProps) {
  return (
    <Empty className="border-2 border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">{props.icon}</EmptyMedia>
        <EmptyTitle>{props.title}</EmptyTitle>
        <EmptyDescription>{props.description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          onClick={() => {
            if (props.buttonOnClick) {
              props.buttonOnClick();
            }
          }}
        >
          {props.buttonIcon || <Plus />}
          {props.buttonLabel}
        </Button>
      </EmptyContent>
    </Empty>
  );
}
