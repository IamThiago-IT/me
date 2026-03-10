"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Home,
  Calendar,
  Mail,
  FileText,
  Briefcase,
  User,
  MessageSquare,
  Newspaper,
  Settings,
  Gift,
  Clock,
  UserCircle,
  Code,
  Moon,
  Sun,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useI18n } from "@/lib/i18n"

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { t } = useI18n()

  // Function to toggle between dark and light theme
  const toggleTheme = () => {
    const html = document.documentElement
    if (html.classList.contains("dark")) {
      html.classList.remove("dark")
    } else {
      html.classList.add("dark")
    }
  }

  // Navigation helper
  const navigate = (path: string) => {
    router.push(path)
    setOpen(false)
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Determine the shortcut key symbol based on platform
  const [shortcutKey, setShortcutKey] = React.useState('Ctrl + ')

  React.useEffect(() => {
    if (/Mac/i.test(navigator.platform)) {
      setShortcutKey('⌘ +')
    }
  }, [])

  return (
    <>
      <p className="text-muted-foreground text-sm">
        {t.common.press}{" "}
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">{shortcutKey}</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t.command.searchPlaceholder} />
        <CommandList>
          <CommandEmpty>{t.command.noResults}</CommandEmpty>
          
          <CommandGroup heading={t.command.mainPages}>
            <CommandItem onSelect={() => navigate("/")}>
              <Home />
              <span>{t.command.home}</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/blog")}>
              <Newspaper />
              <span>{t.command.blog}</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/projetos")}>
              <Code />
              <span>{t.command.projects}</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/services")}>
              <Briefcase />
              <span>{t.command.services}</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading={t.command.about}>
            <CommandItem onSelect={() => navigate("/about")}>
              <User />
              <span>{t.command.aboutMe}</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/cv")}>
              <FileText />
              <span>{t.command.resume}</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/about/timeline")}>
              <Clock />
              <span>{t.command.timeline}</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/about/coverLetter")}>
              <Mail />
              <span>{t.command.coverLetter}</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading={t.command.interaction}>
            <CommandItem onSelect={() => navigate("/contato")}>
              <Mail />
              <span>{t.command.contact}</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/agendar")}>
              <Calendar />
              <span>{t.command.schedule}</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/feedbacks")}>
              <MessageSquare />
              <span>{t.command.feedbacks}</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/newsletter")}>
              <Newspaper />
              <span>{t.command.newsletter}</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading={t.command.others}>
            <CommandItem onSelect={() => navigate("/contratos")}>
              <FileText />
              <span>{t.command.contracts}</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/sponsors")}>
              <Gift />
              <span>{t.command.supporters}</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/setup")}>
              <Settings />
              <span>{t.command.setup}</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading={t.command.theme}>
            <CommandItem onSelect={toggleTheme}>
              <Moon />
              <span>{t.command.toggleTheme}</span>
              <CommandShortcut>{shortcutKey}T</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
