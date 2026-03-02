"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";

interface UploadResult {
  message: string;
  results: {
    success: number;
    updated: number;
    failed: number;
    coursesImported: number;
    feesImported: number;
    errors: string[];
  };
}

export default function AdminUploadSchoolsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (
        selectedFile.name.endsWith(".xlsx") ||
        selectedFile.name.endsWith(".xls")
      ) {
        setFile(selectedFile);
        setError(null);
        setResult(null);
      } else {
        setError("请选择 Excel 文件 (.xlsx 或 .xls)");
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("请先选择文件");
      return;
    }

    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("publish", "0"); // 默认导入为草稿

      const response = await fetch("/api/admin/upload-schools", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "上传失败");
      }

      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "上传失败，请重试");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/admin/schools"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          返回学校管理
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">一键上传 Excel</h1>
        <p className="mt-2 text-muted-foreground">
          上传 Excel 文件，批量导入或更新学校信息（导入后为草稿，可在学校列表中手动公开）
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            上传 Excel 文件
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">选择文件</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                disabled={uploading}
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
              />
            </div>
            {file && (
              <p className="text-sm text-muted-foreground">
                已选择: {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <div className="flex items-center gap-2 text-destructive">
                <XCircle className="h-5 w-5" />
                <span className="font-medium">错误</span>
              </div>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!file || uploading}
            size="lg"
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                上传中...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                开始上传
              </>
            )}
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="rounded-lg border border-primary/25 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">{result.message}</span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-5">
                <div className="rounded-lg border bg-background p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {result.results.success}
                  </div>
                  <div className="text-sm text-muted-foreground">新增成功</div>
                </div>
                <div className="rounded-lg border bg-background p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {result.results.updated}
                  </div>
                  <div className="text-sm text-muted-foreground">更新成功</div>
                </div>
                <div className="rounded-lg border bg-background p-4">
                  <div className="text-2xl font-bold text-red-600">
                    {result.results.failed}
                  </div>
                  <div className="text-sm text-muted-foreground">失败</div>
                </div>
                <div className="rounded-lg border bg-background p-4">
                  <div className="text-2xl font-bold text-purple-600">
                    {result.results.coursesImported}
                  </div>
                  <div className="text-sm text-muted-foreground">课程导入</div>
                </div>
                <div className="rounded-lg border bg-background p-4">
                  <div className="text-2xl font-bold text-orange-600">
                    {result.results.feesImported}
                  </div>
                  <div className="text-sm text-muted-foreground">费用导入</div>
                </div>
              </div>
              {result.results.errors.length > 0 && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                  <div className="mb-2 font-medium text-destructive">错误详情</div>
                  <ul className="max-h-48 space-y-1 overflow-y-auto text-sm">
                    {result.results.errors.map((err, idx) => (
                      <li key={idx} className="text-muted-foreground">
                        • {err}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4">
            <div>
              <h3 className="font-semibold">需要模板？</h3>
              <p className="text-sm text-muted-foreground">
                可先下载模板填写，或使用「一键下载 Excel」导出的文件编辑后上传
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => window.open("/api/admin/download-template", "_blank")}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              下载模板
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
