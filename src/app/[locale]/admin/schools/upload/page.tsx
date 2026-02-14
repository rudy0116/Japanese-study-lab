"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileSpreadsheet, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface UploadResult {
  message: string;
  results: {
    success: number;
    updated: number;
    failed: number;
    errors: string[];
  };
}

export default function UploadSchoolsPage() {
  const t = useTranslations();
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

      const response = await fetch("/api/admin/upload-schools", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "上传失败");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "上传失败，请重试");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">批量上传学校数据</h1>
        <p className="mt-2 text-muted-foreground">
          上传 Excel 文件，一键导入或更新学校信息
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
          {/* 文件选择 */}
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

          {/* 错误提示 */}
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <div className="flex items-center gap-2 text-destructive">
                <XCircle className="h-5 w-5" />
                <span className="font-medium">错误</span>
              </div>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          )}

          {/* 上传按钮 */}
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

          {/* 结果展示 */}
          {result && (
            <div className="space-y-4">
              <div className="rounded-lg border border-primary/25 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">{result.message}</span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
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

          {/* 下载模板 */}
          <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4">
            <div>
              <h3 className="font-semibold">需要模板文件？</h3>
              <p className="text-sm text-muted-foreground">
                下载 Excel 模板，按照格式填写后上传
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                window.open("/api/admin/download-template", "_blank");
              }}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              下载模板
            </Button>
          </div>

          {/* 使用说明 */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <h3 className="mb-2 font-semibold">使用说明</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Excel 文件必须包含以下列：中文名称、日文名称</li>
              <li>• 其他列为可选，但建议尽可能填写完整</li>
              <li>• 如果学校已存在（根据中文名称匹配），将自动更新</li>
              <li>• 支持的文件格式：.xlsx, .xls</li>
              <li>• 建议单次上传不超过 500 条记录</li>
              <li>• 使用率、比例等字段请填写百分比数字（如：30 表示 30%）</li>
              <li>• 布尔字段（有宿舍、签证支持等）填写"是"或"否"</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
