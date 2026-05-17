"use client";

import { MetadataSetter } from "@/components/MetadataSetter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
	AlertTriangle,
	ArrowRight,
	Box,
	Check,
	Copy,
	Info,
	LayoutGrid,
	Moon,
	MousePointer2,
	Palette,
	Radius,
	Scaling,
	Sparkles,
	Sun,
	Type,
	X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

const colors = {
	background: { light: "oklch(1 0 0)", dark: "oklch(0.141 0.005 285.823)" },
	foreground: { light: "oklch(0.141 0.005 285.823)", dark: "oklch(0.985 0 0)" },
	card: { light: "oklch(1 0 0)", dark: "oklch(0.21 0.006 285.885)" },
	"card-foreground": {
		light: "oklch(0.141 0.005 285.823)",
		dark: "oklch(0.985 0 0)",
	},
	popover: { light: "oklch(1 0 0)", dark: "oklch(0.21 0.006 285.885)" },
	"popover-foreground": {
		light: "oklch(0.141 0.005 285.823)",
		dark: "oklch(0.985 0 0)",
	},
	primary: {
		light: "oklch(0.21 0.006 285.885)",
		dark: "oklch(0.92 0.004 286.32)",
	},
	"primary-foreground": {
		light: "oklch(0.985 0 0)",
		dark: "oklch(0.21 0.006 285.885)",
	},
	secondary: {
		light: "oklch(0.967 0.001 286.375)",
		dark: "oklch(0.274 0.006 286.033)",
	},
	"secondary-foreground": {
		light: "oklch(0.21 0.006 285.885)",
		dark: "oklch(0.985 0 0)",
	},
	muted: {
		light: "oklch(0.967 0.001 286.375)",
		dark: "oklch(0.274 0.006 286.033)",
	},
	"muted-foreground": {
		light: "oklch(0.552 0.016 285.938)",
		dark: "oklch(0.705 0.015 286.067)",
	},
	accent: {
		light: "oklch(0.967 0.001 286.375)",
		dark: "oklch(0.274 0.006 286.033)",
	},
	"accent-foreground": {
		light: "oklch(0.21 0.006 285.885)",
		dark: "oklch(0.985 0 0)",
	},
	destructive: {
		light: "oklch(0.577 0.245 27.325)",
		dark: "oklch(0.704 0.191 22.216)",
	},
	border: { light: "oklch(0.92 0.004 286.32)", dark: "oklch(1 0 0 / 10%)" },
	input: { light: "oklch(0.92 0.004 286.32)", dark: "oklch(1 0 0 / 15%)" },
	ring: {
		light: "oklch(0.705 0.015 286.067)",
		dark: "oklch(0.552 0.016 285.938)",
	},
	"chart-1": {
		light: "oklch(0.646 0.222 41.116)",
		dark: "oklch(0.488 0.243 264.376)",
	},
	"chart-2": {
		light: "oklch(0.6 0.118 184.704)",
		dark: "oklch(0.696 0.17 162.48)",
	},
	"chart-3": {
		light: "oklch(0.398 0.07 227.392)",
		dark: "oklch(0.769 0.188 70.08)",
	},
	"chart-4": {
		light: "oklch(0.828 0.189 84.429)",
		dark: "oklch(0.627 0.265 303.9)",
	},
	"chart-5": {
		light: "oklch(0.769 0.188 70.08)",
		dark: "oklch(0.645 0.246 16.439)",
	},
};

const typographyScale = [
	{
		name: "h1",
		classes: "text-4xl sm:text-5xl md:text-6xl font-bold",
		sample: "Heading 1",
	},
	{
		name: "h2",
		classes: "text-3xl sm:text-4xl font-bold",
		sample: "Heading 2",
	},
	{
		name: "h3",
		classes: "text-2xl sm:text-3xl font-semibold",
		sample: "Heading 3",
	},
	{
		name: "h4",
		classes: "text-xl sm:text-2xl font-semibold",
		sample: "Heading 4",
	},
	{
		name: "h5",
		classes: "text-lg sm:text-xl font-semibold",
		sample: "Heading 5",
	},
	{
		name: "h6",
		classes: "text-base sm:text-lg font-semibold",
		sample: "Heading 6",
	},
	{
		name: "body",
		classes: "text-base leading-relaxed",
		sample: "Body text - The quick brown fox",
	},
	{
		name: "small",
		classes: "text-sm",
		sample: "Small text - UI labels and hints",
	},
	{
		name: "xs",
		classes: "text-xs",
		sample: "Extra small - Captions and metadata",
	},
];

const spacingScale = [
	{ name: "0.5", value: "0.125rem", pixels: "2px", tw: "space-0.5" },
	{ name: "1", value: "0.25rem", pixels: "4px", tw: "space-1" },
	{ name: "2", value: "0.5rem", pixels: "8px", tw: "space-2" },
	{ name: "3", value: "0.75rem", pixels: "12px", tw: "space-3" },
	{ name: "4", value: "1rem", pixels: "16px", tw: "space-4" },
	{ name: "5", value: "1.25rem", pixels: "20px", tw: "space-5" },
	{ name: "6", value: "1.5rem", pixels: "24px", tw: "space-6" },
	{ name: "8", value: "2rem", pixels: "32px", tw: "space-8" },
	{ name: "10", value: "2.5rem", pixels: "40px", tw: "space-10" },
	{ name: "12", value: "3rem", pixels: "48px", tw: "space-12" },
	{ name: "16", value: "4rem", pixels: "64px", tw: "space-16" },
];

const radiusScale = [
	{
		name: "sm",
		value: "calc(var(--radius) - 4px)",
		pixels: "~2.25px",
		tw: "rounded-sm",
	},
	{
		name: "md",
		value: "calc(var(--radius) - 2px)",
		pixels: "~4.25px",
		tw: "rounded-md",
	},
	{ name: "lg", value: "var(--radius)", pixels: "10px", tw: "rounded-lg" },
	{
		name: "xl",
		value: "calc(var(--radius) + 4px)",
		pixels: "~14px",
		tw: "rounded-xl",
	},
];

const lucideIcons = [
	{ name: "ArrowRight", icon: ArrowRight },
	{ name: "Sparkles", icon: Sparkles },
	{ name: "Check", icon: Check },
	{ name: "X", icon: X },
	{ name: "Info", icon: Info },
	{ name: "AlertTriangle", icon: AlertTriangle },
	{ name: "Moon", icon: Moon },
	{ name: "Sun", icon: Sun },
	{ name: "Copy", icon: Copy },
	{ name: "LayoutGrid", icon: LayoutGrid },
	{ name: "Type", icon: Type },
	{ name: "Palette", icon: Palette },
	{ name: "Scaling", icon: Scaling },
	{ name: "Radius", icon: Radius },
	{ name: "MousePointer2", icon: MousePointer2 },
	{ name: "Box", icon: Box },
];

export default function DesignPage() {
	const { theme, setTheme } = useTheme();
	const [copiedColor, setCopiedColor] = useState<string | null>(null);

	const copyColor = (value: string) => {
		navigator.clipboard.writeText(value);
		setCopiedColor(value);
		setTimeout(() => setCopiedColor(null), 2000);
	};

	return (
		<div className="max-w-5xl mx-auto">
			<MetadataSetter title="Design System" />

			<div className="mb-12">
				<h1 className="text-4xl sm:text-5xl font-bold mb-4">Design System</h1>
				<p className="text-lg text-muted-foreground max-w-2xl">
					Documentação completa de tipografia, cores, componentes e padrões
					visuais do projeto.
				</p>
			</div>

			<Tabs defaultValue="typography" className="space-y-12">
				<TabsList className="flex flex-wrap gap-2 h-auto bg-transparent p-0">
					{[
						{ value: "typography", label: "Typography", icon: Type },
						{ value: "colors", label: "Colors", icon: Palette },
						{ value: "spacing", label: "Spacing", icon: Scaling },
						{ value: "radius", label: "Radius", icon: Radius },
						{ value: "buttons", label: "Buttons", icon: MousePointer2 },
						{ value: "components", label: "Components", icon: LayoutGrid },
						{ value: "animations", label: "Animations", icon: Sparkles },
						{ value: "icons", label: "Icons", icon: Box },
					].map((tab) => (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
						>
							<tab.icon className="h-4 w-4" />
							<span className="hidden sm:inline">{tab.label}</span>
						</TabsTrigger>
					))}
				</TabsList>

				{/* Typography */}
				<TabsContent value="typography" className="space-y-8">
					<div>
						<h2 className="text-2xl font-bold mb-2">Typography Scale</h2>
						<p className="text-muted-foreground mb-6">
							Fonte base:{" "}
							<code className="bg-muted px-1.5 py-0.5 rounded text-sm">
								Inter
							</code>
						</p>
					</div>

					<div className="space-y-6">
						{typographyScale.map((item) => (
							<div
								key={item.name}
								className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-6"
							>
								<div>
									<span className="text-sm font-medium text-muted-foreground">
										{item.name}
									</span>
								</div>
								<div className={item.classes}>{item.sample}</div>
								<div>
									<code className="text-xs bg-muted px-2 py-1 rounded block">
										{item.classes}
									</code>
								</div>
							</div>
						))}
					</div>

					<div className="mt-8 p-4 bg-muted rounded-lg">
						<h3 className="font-semibold mb-2">Font Weights</h3>
						<div className="space-y-2">
							<p className="font-normal">
								Normal (400) - Body text and paragraphs
							</p>
							<p className="font-medium">Medium (500) - Subtle emphasis</p>
							<p className="font-semibold">Semibold (600) - Subheadings</p>
							<p className="font-bold">Bold (700) - Headings and titles</p>
						</div>
					</div>
				</TabsContent>

				{/* Colors */}
				<TabsContent value="colors" className="space-y-8">
					<div>
						<h2 className="text-2xl font-bold mb-2">Color Palette</h2>
						<p className="text-muted-foreground mb-6">
							Base:{" "}
							<code className="bg-muted px-1.5 py-0.5 rounded text-sm">
								zinc
							</code>{" "}
							| Format:{" "}
							<code className="bg-muted px-1.5 py-0.5 rounded text-sm">
								OKLCH
							</code>
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{Object.entries(colors).map(([name, value]) => (
							<button
								type="button"
								key={name}
								onClick={() => copyColor(value.light)}
								className="group relative overflow-hidden rounded-lg border transition-all hover:shadow-md hover:scale-[1.02] text-left"
							>
								<div
									className="h-20 w-full border-b"
									style={{
										background: `oklch(${value.light})`,
										borderBottom:
											name === "background" ||
											name === "card" ||
											name === "popover"
												? "1px solid var(--border)"
												: "none",
									}}
								/>
								<div className="p-3">
									<p className="text-sm font-medium truncate">{name}</p>
									<p className="text-xs text-muted-foreground font-mono truncate mt-1">
										{value.light}
									</p>
								</div>
								{copiedColor === value.light && (
									<div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
										Copied!
									</div>
								)}
							</button>
						))}
					</div>

					{/* Chart Colors */}
					<div className="mt-8">
						<h3 className="text-xl font-semibold mb-4">Chart Colors</h3>
						<div className="flex gap-4">
							{["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"].map(
								(name) => (
									<div
										key={name}
										className="flex-1 h-16 rounded-lg"
										style={{
											background: `oklch(${colors[name as keyof typeof colors].light})`,
										}}
									/>
								),
							)}
						</div>
					</div>
				</TabsContent>

				{/* Spacing */}
				<TabsContent value="spacing" className="space-y-8">
					<div>
						<h2 className="text-2xl font-bold mb-2">Spacing Scale</h2>
						<p className="text-muted-foreground mb-6">
							Sistema de espaçamento baseado em rem units
						</p>
					</div>

					<div className="space-y-4">
						{spacingScale.map((item) => (
							<div
								key={item.name}
								className="grid grid-cols-12 gap-4 items-center"
							>
								<div className="col-span-2">
									<code className="text-sm font-medium">{item.tw}</code>
								</div>
								<div className="col-span-3">
									<span className="text-sm text-muted-foreground">
										{item.value}
									</span>
								</div>
								<div className="col-span-2">
									<span className="text-xs text-muted-foreground">
										{item.pixels}
									</span>
								</div>
								<div className="col-span-5">
									<div
										className="h-6 bg-primary/20 rounded"
										style={{ width: `calc(${item.value} * 4)` }}
									/>
								</div>
							</div>
						))}
					</div>

					<div className="mt-8 p-4 bg-muted rounded-lg">
						<h3 className="font-semibold mb-2">Container Max Widths</h3>
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
							<div>
								<code className="text-xs">max-w-4xl</code>
								<p className="text-sm text-muted-foreground mt-1">
									56rem (896px)
								</p>
							</div>
							<div>
								<code className="text-xs">max-w-6xl</code>
								<p className="text-sm text-muted-foreground mt-1">
									72rem (1152px)
								</p>
							</div>
							<div>
								<code className="text-xs">max-w-7xl</code>
								<p className="text-sm text-muted-foreground mt-1">
									80rem (1280px)
								</p>
							</div>
							<div>
								<code className="text-xs">max-w-2xl</code>
								<p className="text-sm text-muted-foreground mt-1">
									42rem (672px)
								</p>
							</div>
						</div>
					</div>
				</TabsContent>

				{/* Border Radius */}
				<TabsContent value="radius" className="space-y-8">
					<div>
						<h2 className="text-2xl font-bold mb-2">Border Radius</h2>
						<p className="text-muted-foreground mb-6">
							Base radius:{" "}
							<code className="bg-muted px-1.5 py-0.5 rounded text-sm">
								0.625rem (10px)
							</code>
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{radiusScale.map((item) => (
							<div key={item.name} className="space-y-3">
								<div
									className={cn(
										"h-24 w-24 bg-primary/20 border-2 border-primary/40",
										item.tw,
									)}
								/>
								<div>
									<p className="font-medium">{item.name}</p>
									<p className="text-sm text-muted-foreground">{item.pixels}</p>
									<code className="text-xs bg-muted px-1.5 py-0.5 rounded mt-1 block">
										{item.tw}
									</code>
								</div>
							</div>
						))}
					</div>
				</TabsContent>

				{/* Buttons */}
				<TabsContent value="buttons" className="space-y-8">
					<div>
						<h2 className="text-2xl font-bold mb-2">Button Variants</h2>
						<p className="text-muted-foreground mb-6">
							Todas as variantes e tamanhos disponíveis
						</p>
					</div>

					<div className="space-y-8">
						<div>
							<h3 className="text-lg font-semibold mb-4">Variants</h3>
							<div className="flex flex-wrap gap-4">
								<Button variant="default">Default</Button>
								<Button variant="destructive">Destructive</Button>
								<Button variant="outline">Outline</Button>
								<Button variant="secondary">Secondary</Button>
								<Button variant="ghost">Ghost</Button>
								<Button variant="link">Link</Button>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-4">Sizes</h3>
							<div className="flex flex-wrap items-center gap-4">
								<Button size="sm">Small</Button>
								<Button size="default">Default</Button>
								<Button size="lg">Large</Button>
								<Button size="icon">
									<ArrowRight className="h-4 w-4" />
								</Button>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-4">States</h3>
							<div className="flex flex-wrap gap-4">
								<Button>Normal</Button>
								<Button disabled>Disabled</Button>
								<Button className="animate-pulse">Loading...</Button>
							</div>
						</div>
					</div>
				</TabsContent>

				{/* Components */}
				<TabsContent value="components" className="space-y-8">
					<div>
						<h2 className="text-2xl font-bold mb-2">Components</h2>
						<p className="text-muted-foreground mb-6">
							Componentes reutilizáveis do projeto
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Card Example */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Card</h3>
							<Card>
								<CardHeader>
									<CardTitle>Card Title</CardTitle>
									<CardDescription>Card description goes here</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground">
										Card content with supporting text and information.
									</p>
								</CardContent>
								<CardFooter>
									<Button size="sm">Action</Button>
								</CardFooter>
							</Card>
						</div>

						{/* Form Example */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Form Elements</h3>
							<Card>
								<CardHeader>
									<CardTitle>Sample Form</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="email">Email</Label>
										<Input id="email" placeholder="email@example.com" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="message">Message</Label>
										<Textarea id="message" placeholder="Type your message..." />
									</div>
								</CardContent>
								<CardFooter>
									<Button>Submit</Button>
								</CardFooter>
							</Card>
						</div>

						{/* Badge Example */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Badges</h3>
							<div className="flex flex-wrap gap-2">
								<Badge>Default</Badge>
								<Badge variant="secondary">Secondary</Badge>
								<Badge variant="outline">Outline</Badge>
								<Badge variant="destructive">Destructive</Badge>
							</div>
						</div>

						{/* Alerts Example */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Status Indicators</h3>
							<div className="space-y-3">
								<div className="flex items-center gap-2 text-green-600 dark:text-green-400">
									<Check className="h-4 w-4" />
									<span className="text-sm">Success state</span>
								</div>
								<div className="flex items-center gap-2 text-red-600 dark:text-red-400">
									<X className="h-4 w-4" />
									<span className="text-sm">Error state</span>
								</div>
								<div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
									<AlertTriangle className="h-4 w-4" />
									<span className="text-sm">Warning state</span>
								</div>
								<div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
									<Info className="h-4 w-4" />
									<span className="text-sm">Info state</span>
								</div>
							</div>
						</div>
					</div>
				</TabsContent>

				{/* Animations */}
				<TabsContent value="animations" className="space-y-8">
					<div>
						<h2 className="text-2xl font-bold mb-2">Animations</h2>
						<p className="text-muted-foreground mb-6">
							Animações e transições disponíveis no projeto
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card>
							<CardHeader>
								<CardTitle>Fade In Up</CardTitle>
								<CardDescription>Entrance animation</CardDescription>
							</CardHeader>
							<CardContent className="flex justify-center py-8">
								<div className="animate-fade-in-up bg-primary/10 px-6 py-3 rounded-lg">
									<p className="font-medium">Animated Element</p>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Underline Animation</CardTitle>
								<CardDescription>Hover to see effect</CardDescription>
							</CardHeader>
							<CardContent className="flex justify-center py-8">
								<span className="underline-animate text-lg font-medium cursor-pointer">
									Hover me
								</span>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Hover Scale</CardTitle>
								<CardDescription>Scale on hover</CardDescription>
							</CardHeader>
							<CardContent className="flex justify-center py-8">
								<Button className="transition-all hover:scale-105 hover:shadow-lg">
									Hover to scale
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Transition Colors</CardTitle>
								<CardDescription>Smooth color transitions</CardDescription>
							</CardHeader>
							<CardContent className="flex justify-center py-8">
								<div className="px-6 py-3 rounded-lg bg-muted transition-colors hover:bg-primary hover:text-primary-foreground cursor-pointer">
									<p className="font-medium">Hover for color change</p>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="mt-8 p-4 bg-muted rounded-lg">
						<h3 className="font-semibold mb-2">Animation Classes</h3>
						<div className="space-y-2 mt-4">
							<code className="block text-sm">.animate-fade-in-up</code>
							<code className="block text-sm">.animate-fade-in-up-1</code>
							<code className="block text-sm">.animate-fade-in-up-2</code>
							<code className="block text-sm">.animate-fade-in-up-3</code>
							<code className="block text-sm">.underline-animate</code>
						</div>
					</div>
				</TabsContent>

				{/* Icons */}
				<TabsContent value="icons" className="space-y-8">
					<div>
						<h2 className="text-2xl font-bold mb-2">Icon Library</h2>
						<p className="text-muted-foreground mb-6">
							Ícones do{" "}
							<code className="bg-muted px-1.5 py-0.5 rounded text-sm">
								lucide-react
							</code>{" "}
							utilizados no projeto
						</p>
					</div>

					<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
						{lucideIcons.map(({ name, icon: Icon }) => (
							<div
								key={name}
								className="flex flex-col items-center gap-2 p-3 rounded-lg border transition-all hover:shadow-md hover:border-primary/50"
							>
								<Icon className="h-6 w-6" />
								<span className="text-xs text-center text-muted-foreground">
									{name}
								</span>
							</div>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
