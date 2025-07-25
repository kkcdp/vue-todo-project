<script setup lang="ts">
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button, buttonVariants } from '@/components/ui/button';
// import { TablePagination } from '@/components/table-pagination';
import { DateFormatter } from '@internationalized/date';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, router, Link } from '@inertiajs/vue3';
import { type BreadcrumbItem, type PaginatedResponse, type Task } from '@/types';
import { toast } from 'vue-sonner';
import Pagination from "@/components/Pagination.vue";

interface Props {
    tasks: PaginatedResponse<Task>;
}

// defineProps<Props>();
defineProps({
    "tasks": {
        type: Object,
        required: true
    }
})

const deleteTask = (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
        router.delete(route('tasks.destroy', { id }), {
            onSuccess: () => toast.success('Task deleted successfully'),
            onError: () => toast.error('Failed to delete task'),
        });
    }
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
];

const df = new DateFormatter('en-US', {
    dateStyle: 'long',
});

</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">

        <div class=""></div>

        <Head title="Tasks List" />
        <div class="mt-4 flex gap-4">
            <Link :class="buttonVariants({ variant: 'outline' })" href="/tasks/create"> Create Task</Link>
            <Link :class="buttonVariants({ variant: 'outline' })" href="/task-categories"> Manage Task Categories</Link>
        </div>
        <Table class="mt-4">
            <TableHeader>
                <TableRow>
                    <TableHead >Task</TableHead>
                    <TableHead class="w-[200px]">Categories</TableHead>
                    <TableHead class="w-[200px]">Status</TableHead>
                    <TableHead class="w-[200px]">Due Date</TableHead>
                    <TableHead class="w-[100px] text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
               <TableRow v-for="task in tasks.data" :key="task.id">
                    <TableCell>{{ task.name }}</TableCell>
                    <TableCell>
                        <span
                            v-for="category in task.task_categories"
                            :key="category.id"
                            class="mr-2 rounded-full bg-gray-200 px-2 py-1 text-gray-800"
                            >
                            {{ category.name }}
                        </span>
                    </TableCell>

                    <TableCell :class="{ 'text-green-600': task.is_completed, 'text-red-700': !task.is_completed }">
                        {{ task.is_completed ? 'Completed' : 'In Progress' }}
                    </TableCell>
                    <TableCell>{{ task.due_date ? df.format(new Date(task.due_date)) : '' }}</TableCell>
                    <TableCell class="flex gap-x-2 text-right">
                        <Link :class="buttonVariants({ variant: 'default' })" :href="`/tasks/${task.id}/edit`">Edit </Link>
                        <Button variant="destructive" @click="deleteTask(task.id)" class="mr-2">Delete</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

        <!-- <Pagination :resource="taskCategories" /> -->

        <div class="flex mr-4 justify-end">
            <Pagination :links="tasks.links" />
        </div>

    </AppLayout>
</template>
