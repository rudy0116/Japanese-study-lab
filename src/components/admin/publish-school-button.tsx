"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PublishSchoolButton({
  schoolId,
  onPublished,
}: {
  schoolId: number;
  onPublished?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/schools/${schoolId}/publish`, {
        method: "POST",
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
      onClick={handlePublish}
      disabled={loading}
    >
      {loading ? "处理中..." : "公开"}
    </Button>
  );
}
