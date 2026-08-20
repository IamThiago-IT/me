"use client";

import { MetadataSetter } from "@/components/MetadataSetter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import {
	Code2,
	Cpu,
	Globe,
	Hammer,
	MemoryStick,
	Monitor,
	NotepadText,
	Package,
	Terminal,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
	SiNextdotjs,
	SiNodedotjs,
	SiPostgresql,
	SiPrisma,
	SiReact,
	SiTailwindcss,
	SiTypescript,
	SiVercel,
} from "react-icons/si";

type SetupItem = {
	icon: React.ReactNode;
	label: string;
	value: string;
};

type TechStack = {
	name: string;
	icon: React.ReactNode;
};

type SetupData = {
	hardware: SetupItem[];
	software: SetupItem[];
	techStack: TechStack[];
	notes?: string;
};

const defaultSetup: SetupData = {
	hardware: [
		{ icon: <Monitor className="w-4 h-4" />, label: "OS", value: "Windows 11" },
		{
			icon: <Cpu className="w-4 h-4" />,
			label: "CPU",
			value: "Intel Core i7-10750H",
		},
		{ icon: <MemoryStick className="w-4 h-4" />, label: "RAM", value: "16 GB" },
	],
	software: [
		{ icon: <Code2 className="w-4 h-4" />, label: "Editor", value: "VS Code" },
		{
			icon: <Terminal className="w-4 h-4" />,
			label: "Terminal",
			value: "Windows Terminal",
		},
		{ icon: <Hammer className="w-4 h-4" />, label: "Node", value: "v18.16.0" },
		{ icon: <Globe className="w-4 h-4" />, label: "Browser", value: "Chrome" },
	],
	techStack: [
		{ name: "React", icon: <SiReact className="w-3.5 h-3.5" /> },
		{ name: "Next.js", icon: <SiNextdotjs className="w-3.5 h-3.5" /> },
		{ name: "TypeScript", icon: <SiTypescript className="w-3.5 h-3.5" /> },
		{ name: "Node.js", icon: <SiNodedotjs className="w-3.5 h-3.5" /> },
		{ name: "Tailwind CSS", icon: <SiTailwindcss className="w-3.5 h-3.5" /> },
		{ name: "Prisma", icon: <SiPrisma className="w-3.5 h-3.5" /> },
		{ name: "Vercel", icon: <SiVercel className="w-3.5 h-3.5" /> },
		{ name: "PostgreSQL", icon: <SiPostgresql className="w-3.5 h-3.5" /> },
	],
	notes: "Development machine for web apps",
};

function SetupSkeleton() {
	return (
		<main className="p-3 sm:p-4 md:p-6">
			<Skeleton className="h-8 w-48 mb-6" />
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
				{["hardware", "software", "stack"].map((section) => (
					<Card key={section}>
						<CardHeader>
							<Skeleton className="h-5 w-24" />
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{["row-1", "row-2", "row-3"].map((row) => (
									<div key={row} className="flex items-center gap-3">
										<Skeleton className="w-4 h-4 rounded" />
										<Skeleton className="h-4 w-16" />
										<Skeleton className="h-4 w-24" />
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				))}
			</div>
			<div className="mt-6">
				<Skeleton className="h-5 w-24 mb-3" />
				<div className="flex flex-wrap gap-2">
					{["react", "next", "ts", "node", "tailwind", "prisma"].map((tech) => (
						<Skeleton key={tech} className="h-6 w-20 rounded-md" />
					))}
				</div>
			</div>
		</main>
	);
}

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.08 },
	},
};

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Page() {
	const { t } = useI18n();
	const [loading, setLoading] = useState(true);
	const [setup] = useState<SetupData>(defaultSetup);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 600);
		return () => clearTimeout(timer);
	}, []);

	if (loading) return <SetupSkeleton />;

	return (
		<main className="p-3 sm:p-4 md:p-6">
			<MetadataSetter title={t.setup.title} />

			<motion.h1
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
			>
				{t.setup.title}
			</motion.h1>

			<motion.div
				variants={container}
				initial="hidden"
				animate="show"
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
			>
				<motion.div variants={item}>
					<Card className="h-full">
						<CardHeader>
							<CardTitle className="text-base flex items-center gap-2">
								<Monitor className="w-4 h-4 text-muted-foreground" />
								{t.setup.hardware}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2.5">
								{setup.hardware.map((h) => (
									<li key={h.label} className="flex items-center gap-3 text-sm">
										<span className="text-muted-foreground">{h.icon}</span>
										<span className="text-muted-foreground w-10">
											{h.label}
										</span>
										<span className="font-medium">{h.value}</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div variants={item}>
					<Card className="h-full">
						<CardHeader>
							<CardTitle className="text-base flex items-center gap-2">
								<Code2 className="w-4 h-4 text-muted-foreground" />
								{t.setup.software}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2.5">
								{setup.software.map((s) => (
									<li key={s.label} className="flex items-center gap-3 text-sm">
										<span className="text-muted-foreground">{s.icon}</span>
										<span className="text-muted-foreground w-18">
											{s.label}
										</span>
										<span className="font-medium">{s.value}</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div variants={item}>
					<Card className="h-full">
						<CardHeader>
							<CardTitle className="text-base flex items-center gap-2">
								<Package className="w-4 h-4 text-muted-foreground" />
								{t.setup.techStack}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								{setup.techStack.map((tech) => (
									<Badge
										key={tech.name}
										variant="secondary"
										className="gap-1.5 text-xs"
									>
										{tech.icon}
										{tech.name}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</motion.div>

			{setup.notes && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.35 }}
					className="mt-4 sm:mt-6"
				>
					<Card>
						<CardHeader>
							<CardTitle className="text-base flex items-center gap-2">
								<NotepadText className="w-4 h-4 text-muted-foreground" />
								{t.setup.notes}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">{setup.notes}</p>
						</CardContent>
					</Card>
				</motion.div>
			)}
		</main>
	);
}
