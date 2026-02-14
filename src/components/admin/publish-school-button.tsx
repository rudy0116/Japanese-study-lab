"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PublishSchoolButton({
  schoolId,
  isPublished = false,
  onPublished,
}: {
  schoolId: number;
  isPublished?: boolean;
  onPublished?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/schools/${schoolId}/publish`, {
        method: isPublished ? "DELETE" : "POST",
      });
      if (res.ok) {
        onPublished?.();
        window.location.reload();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "处理中..." : isPublished ? "取消发布" : "公开"}
    </Button>
  );
}
