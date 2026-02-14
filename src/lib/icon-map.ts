import {
  GraduationCap,
  Palette,
  Briefcase,
  UserCheck,
  Globe,
  Award,
  Search,
  GitCompareArrows,
  MessageSquareText,
  FileCheck2,
  PlaneTakeoff,
  BookOpen,
  FileSearch,
  MapPinned,
  Sparkles,
  Gift,
  Eye,
  Shield,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  Palette,
  Briefcase,
  UserCheck,
  Globe,
  Award,
  Search,
  GitCompareArrows,
  MessageSquareText,
  FileCheck2,
  PlaneTakeoff,
  BookOpen,
  FileSearch,
  MapPinned,
  Sparkles,
  Gift,
  Eye,
  Shield,
  BarChart3,
};

export const ICON_NAMES = Object.keys(ICON_MAP);

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Gift;
}
