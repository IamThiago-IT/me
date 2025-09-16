"use client";

import { useMetadata } from "@/hooks/useMetadata";

interface MetadataSetterProps {
  title: string;
}

export function MetadataSetter({ title }: MetadataSetterProps) {
  useMetadata(title);
  return null; // This component doesn't render anything
}