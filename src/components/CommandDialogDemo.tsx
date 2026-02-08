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

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

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
  const shortcutKey = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform) ? '⌘ +' : 'Ctrl + '

  return (
    <>
      <p className="text-muted-foreground text-sm">
        Press{" "}
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">{shortcutKey}</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Digite para buscar páginas..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          
          <CommandGroup heading="Páginas Principais">
            <CommandItem onSelect={() => navigate("/")}>
              <Home />
              <span>Início</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/blog")}>
              <Newspaper />
              <span>Blog</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/projetos")}>
              <Code />
              <span>Projetos</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/services")}>
              <Briefcase />
              <span>Serviços</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading="Sobre">
            <CommandItem onSelect={() => navigate("/about")}>
              <User />
              <span>Sobre Mim</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/cv")}>
              <FileText />
              <span>Currículo</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/about/timeline")}>
              <Clock />
              <span>Linha do Tempo</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/about/coverLetter")}>
              <Mail />
              <span>Carta de Apresentação</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading="Interação">
            <CommandItem onSelect={() => navigate("/contato")}>
              <Mail />
              <span>Contato</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/agendar")}>
              <Calendar />
              <span>Agendar</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/feedbacks")}>
              <MessageSquare />
              <span>Feedbacks</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/newsletter")}>
              <Newspaper />
              <span>Newsletter</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading="Outros">
            <CommandItem onSelect={() => navigate("/contratos")}>
              <FileText />
              <span>Contratos</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/sponsors")}>
              <Gift />
              <span>Apoiadores</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/setup")}>
              <Settings />
              <span>Setup</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading="Tema">
            <CommandItem onSelect={toggleTheme}>
              <Moon />
              <span>Alternar Tema</span>
              <CommandShortcut>{shortcutKey}T</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
