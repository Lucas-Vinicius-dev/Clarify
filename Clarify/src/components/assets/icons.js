import {
    createIcons,
    ArrowRight,
    Bell,
    Calendar,
    ChevronRight,
    ClipboardList,
    Clock,
    Filter,
    HelpCircle,
    History,
    Hourglass,
    LogOut,
    Menu,
    Plus,
    PlusCircle,
    Search,
    Settings,
    X,
    Check
} from 'lucide';

export const iconesUsados = {
    ArrowRight,
    Bell,
    Calendar,
    ChevronRight,
    ClipboardList,
    Clock,
    Filter,
    HelpCircle,
    History,
    Hourglass,
    LogOut,
    Menu,
    Plus,
    PlusCircle,
    Search,
    Settings,
    X,
    Check
}

export function processarIcones() {
    createIcons({ icons: iconesUsados, attrs: { 'stroke-width': 1.75 } });
}
