import AdminDashboardAside from "@/components/Dashboard/DashboardAside";
import Dashboard from "@/components/Dashboard/DashboardAside";
import { auth } from "@/lib/auth";
import { BarChart } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Settings } from "lucide-react";
import { Icon } from "lucide-react";
import { ShieldAlert } from "lucide-react";
import { Users } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

const DashboardPage = async () => {
  const { user } = await auth.api.getSession({ headers: await headers() });
  return <></>;
};

export default DashboardPage;
