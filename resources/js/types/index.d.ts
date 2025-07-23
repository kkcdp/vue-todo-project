import type { LucideIcon } from 'lucide-vue-next';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
    isActive?: boolean;
}

export interface Task {
  id: number;
  name: string;
  is_completed: boolean;
  due_date?: string;
  mediaFile?: MediaFile;
  task_categories: TaskCategory[];
  created_at: string;
  updated_at: string;
}

export interface TaskCategory {
    id: number;
    name: string;
    tasks_count: number | null;
    tasks: Task[] | null;
    created_at: string;
    updated_at: string;
}

export type AppPageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
};

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface PaginatedResponse<T = Task | Taskcategory | null> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string | url;
    //url ielikts
    links: {
        url: any;
        //bija string un null? un url?
        label: string;
        active: boolean;
    }[];
    next_page_url: string | url |null;
    //url ielikts
    path: string;
    per_page: number;
    prev_page_url: string | url | null;
    //url ielikts
    to: number;
    total: number;
}





export type BreadcrumbItemType = BreadcrumbItem;
